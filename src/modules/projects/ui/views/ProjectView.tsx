"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useTRPC } from "@/trpc/Client";
import { useSuspenseQuery } from "@tanstack/react-query";
import MessagesContainer from "../components/MessagesContainer";

interface Props {
  projectId: string;
}

function ProjectView({ projectId }: Props) {
  const trpc = useTRPC();
  const { data: project } = useSuspenseQuery(
    trpc.projects.getOne.queryOptions({
      id: projectId,
    })
  );
  const { data: messages } = useSuspenseQuery(
    trpc.messages.getMany.queryOptions({
      projectId,
    })
  );
  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={35}
          minSize={20}
          className="flex flex-col min-h-0"
        >
          <MessagesContainer projectId={projectId}></MessagesContainer>
        </ResizablePanel>
        <ResizableHandle withHandle></ResizableHandle>
        <ResizablePanel
          defaultSize={65}
          minSize={50}
          className=""
        ></ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
export default ProjectView;
