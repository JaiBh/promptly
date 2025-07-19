import ProjectView from "@/modules/projects/ui/views/ProjectView";
import { getQueryClient, trpc } from "@/trpc/Server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";

interface Props {
  params: Promise<{ projectId: string }>;
}

async function ProjectPage({ params }: Props) {
  const { projectId } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.messages.getMany.queryOptions({
      projectId,
    })
  );
  void queryClient.prefetchQuery(
    trpc.projects.getOne.queryOptions({
      id: projectId,
    })
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ErrorBoundary fallback={<p>Error!</p>}>
        <Suspense fallback={<p>Loading...</p>}>
          <ProjectView projectId={projectId}></ProjectView>
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
export default ProjectPage;
