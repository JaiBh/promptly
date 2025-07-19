"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/Client";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";

function ProjectsList() {
  const trpc = useTRPC();
  const { user } = useUser();

  const { data: projects } = useQuery(trpc.projects.getMany.queryOptions());

  if (!user) return null;

  return (
    <div className="p-8 border rounded-xl flex flex-col gap-y-6 w-full bg-white dark:bg-sidebar">
      <h2 className="text-2xl font-semibold">{user?.firstName}&apos;s Vibes</h2>
      <div className="grid grid-cols-1 sml:grid-cols-3 gap-6">
        {projects?.length === 0 && (
          <div className="col-span-full text-center">
            <p className="text-sm text-muted-foreground">No projects found</p>
          </div>
        )}
        {projects?.map((project) => {
          return (
            <Button
              key={project.id}
              variant={"outline"}
              asChild
              className="font-normal h-auto justify-start w-full text-start p-4"
            >
              <Link href={`/projects/${project.id}`}>
                <div className="flex items-center gap-x-4">
                  <Image
                    src={"/logo.svg"}
                    alt="Vibe"
                    width={32}
                    height={32}
                    className="object-contain"
                  ></Image>
                  <div className="flex flex-col">
                    <h3 className="truncate font-medium">{project.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {formatDistanceToNow(project.updatedAt, {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              </Link>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
export default ProjectsList;
