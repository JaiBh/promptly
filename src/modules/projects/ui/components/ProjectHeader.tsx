import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirm } from "@/hooks/useConfirm";
import { useTRPC } from "@/trpc/Client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { ChevronDown, ChevronLeft, SunMoonIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  projectId: string;
}

function ProjectHeader({ projectId }: Props) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const [ConfirmDialog, confirm] = useConfirm(
    "delete project?",
    "Are you sure you want to delete this project? This action cannot be reversed, and all the data inside will be removed forever."
  );
  const { data: project } = useSuspenseQuery(
    trpc.projects.getOne.queryOptions({ id: projectId })
  );

  const deleteProject = useMutation(
    trpc.projects.delete.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(
          trpc.messages.getMany.queryOptions({
            projectId,
          })
        );
        queryClient.invalidateQueries(
          trpc.projects.getOne.queryOptions({
            id: projectId,
          })
        );

        queryClient.invalidateQueries(trpc.projects.getMany.queryOptions());
        router.push("/");
        toast.success("Project deleted!");
      },
    })
  );

  const handleDelete = async () => {
    const ok = await confirm();

    if (!ok) return;

    try {
      await deleteProject.mutateAsync({
        id: projectId,
      });
    } catch {
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <ConfirmDialog></ConfirmDialog>

      <header className="p-2 flex justify-between items-center border-b">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} size={"sm"} className="pl-2!">
              <Image
                src={"/logo.png"}
                alt="Promptly"
                height={18}
                width={18}
              ></Image>
              <span className="text-sm font-medium">{project.name}</span>
              <ChevronDown></ChevronDown>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="start">
            <DropdownMenuItem asChild>
              <Link href={"/"}>
                <ChevronLeft></ChevronLeft>
                <span>Go to Dashboard</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator></DropdownMenuSeparator>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="gap-2">
                <SunMoonIcon className="size-4 text-muted-foreground"></SunMoonIcon>
                <span>Appearance</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup
                    value={theme}
                    onValueChange={setTheme}
                  >
                    <DropdownMenuRadioItem value="light">
                      <span>Light</span>
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="dark">
                      <span>Dark</span>
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="system">
                      <span>System</span>
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSeparator></DropdownMenuSeparator>
            <DropdownMenuItem
              className="bg-destructive text-destructive-foreground justify-center hover:bg-destructive/70! hover:text-destructive-foreground!"
              onClick={handleDelete}
            >
              Delete Project
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
    </>
  );
}
export default ProjectHeader;
