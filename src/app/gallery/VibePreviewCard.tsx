import Link from "next/link";

interface Props {
  data: { name: string; url: string };
}

function VibePreviewCard({ data }: Props) {
  return (
    <li className="space-y-4 ">
      <div className=" px-3 flex items-enter justify-between">
        <h3 className="text-xl font-semibold text-secondary-foreground">
          {data.name}
        </h3>
        <Link
          href={data.url}
          className="text-muted-foreground hover:text-primary"
        >
          Live Demo
        </Link>
      </div>
      <div className="aspect-[9_/_14] max-h-[80vh] mx-auto border-primary border-[4px] rounded-xl overflow-hidden">
        <iframe
          className="h-full w-full"
          sandbox="allow-forms allow-scripts allow-same-origin"
          loading="lazy"
          src={data.url}
        ></iframe>
      </div>
    </li>
  );
}
export default VibePreviewCard;
