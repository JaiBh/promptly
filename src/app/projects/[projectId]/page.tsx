interface Props {
  params: Promise<{ projectId: string }>;
}

async function ProjectPage({ params }: Props) {
  const { projectId } = await params;
  return <div>Project Id</div>;
}
export default ProjectPage;
