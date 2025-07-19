"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import MessagesContainer from "../components/MessagesContainer";
import { Suspense, useState } from "react";
import { Fragment } from "@/generated/prisma";
import ProjectHeader from "../components/ProjectHeader";
import FragmentWeb from "../components/FragmentWeb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeIcon, CrownIcon, EyeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileExplorer } from "@/components/FileExplorer";
import UserControl from "@/components/UserControl";
import { useAuth } from "@clerk/nextjs";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  projectId: string;
}

function ProjectView({ projectId }: Props) {
  const { has } = useAuth();
  const hasProAccess = has?.({ plan: "pro" });
  const [activeFragment, setActiveFragment] = useState<Fragment | null>(null);
  const [tabState, setTabState] = useState<"preview" | "code">("preview");

  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={35}
          minSize={20}
          className="flex flex-col min-h-0"
        >
          <ErrorBoundary fallback={<p>Product header error</p>}>
            <Suspense fallback={<p>Loading project...</p>}>
              <ProjectHeader projectId={projectId}></ProjectHeader>
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary fallback={<p>Messages container error</p>}>
            <Suspense fallback={<p>Loading messages...</p>}>
              <MessagesContainer
                projectId={projectId}
                activeFragment={activeFragment}
                setActiveFragment={setActiveFragment}
              ></MessagesContainer>
            </Suspense>
          </ErrorBoundary>
        </ResizablePanel>
        <ResizableHandle withHandle></ResizableHandle>
        <ResizablePanel defaultSize={65} minSize={50}>
          <Tabs
            className="h-full gap-y-0"
            defaultValue="preview"
            value={tabState}
            onValueChange={(value) => setTabState(value as "preview" | "code")}
          >
            <div className="flex w-full items-center p-2 border-b gap-x-2">
              <TabsList className="h-8 border p-0 rounded-md">
                <TabsTrigger value="preview" className="rounded-md">
                  <EyeIcon></EyeIcon>
                  <span>Demo</span>
                </TabsTrigger>
                <TabsTrigger value="code" className="rounded-md">
                  <CodeIcon></CodeIcon>
                  <span>Code</span>
                </TabsTrigger>
              </TabsList>

              <div className="ml-auto flex items-center gap-x-2">
                {!hasProAccess && (
                  <Button asChild size="sm" variant={"tertiary"}>
                    <Link href={"/pricing"}>
                      <CrownIcon></CrownIcon> Upgrade
                    </Link>
                  </Button>
                )}
                <UserControl></UserControl>
              </div>
            </div>
            <TabsContent value="preview">
              {" "}
              {!!activeFragment && (
                <FragmentWeb data={activeFragment}></FragmentWeb>
              )}
            </TabsContent>
            <TabsContent value="code" className="min-h-0">
              {!!activeFragment?.files && (
                <FileExplorer
                  files={activeFragment.files as { [path: string]: string }}
                ></FileExplorer>
              )}
            </TabsContent>
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
export default ProjectView;
