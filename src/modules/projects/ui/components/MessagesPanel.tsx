import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ProjectHeader from "./ProjectHeader";
import MessagesContainer from "./MessagesContainer";
import { Fragment } from "@/generated/prisma";

interface Props {
  projectId: string;
  activeFragment: Fragment | null;
  setActiveFragment: (value: Fragment | null) => void;
}

function MessagesPanel({
  projectId,
  activeFragment,
  setActiveFragment,
}: Props) {
  return (
    <>
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
    </>
  );
}
export default MessagesPanel;
