"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useState } from "react";
import { Fragment } from "@/generated/prisma";
import MessagesPanel from "../components/MessagesPanel";
import ProjectPanel from "../components/ProjectPanel";

interface Props {
  projectId: string;
}

function ProjectView({ projectId }: Props) {
  const [activeFragment, setActiveFragment] = useState<Fragment | null>(null);

  return (
    <div className="h-screen">
      {/* desktop */}
      <ResizablePanelGroup direction="horizontal" className="hidden! lg:flex!">
        <ResizablePanel
          defaultSize={35}
          minSize={20}
          className="flex flex-col min-h-0"
        >
          <MessagesPanel
            projectId={projectId}
            activeFragment={activeFragment}
            setActiveFragment={setActiveFragment}
          ></MessagesPanel>
        </ResizablePanel>
        <ResizableHandle withHandle></ResizableHandle>
        <ResizablePanel defaultSize={65} minSize={50}>
          <ProjectPanel activeFragment={activeFragment}></ProjectPanel>
        </ResizablePanel>
      </ResizablePanelGroup>

      {/* mobile/tablet */}
      <ResizablePanelGroup direction="vertical" className="lg:hidden!">
        <ResizablePanel defaultSize={55} minSize={15}>
          <ProjectPanel activeFragment={activeFragment}></ProjectPanel>
        </ResizablePanel>
        <ResizableHandle withHandle></ResizableHandle>
        <ResizablePanel
          defaultSize={45}
          minSize={15}
          className="flex flex-col min-h-0"
        >
          <MessagesPanel
            projectId={projectId}
            activeFragment={activeFragment}
            setActiveFragment={setActiveFragment}
          ></MessagesPanel>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
export default ProjectView;
