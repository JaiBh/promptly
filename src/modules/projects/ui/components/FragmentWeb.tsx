import Hint from "@/components/Hint";
import { Button } from "@/components/ui/button";
import { Fragment } from "@/generated/prisma";
import { ExternalLink, RefreshCcwIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  data: Fragment;
}

function FragmentWeb({ data }: Props) {
  const [copied, setCopied] = useState(false);
  const [fragmentKey, setFragmentKey] = useState(0);

  const onRefresh = () => {
    setFragmentKey((prev) => prev + 1);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(data.sandboxUrl);
    setCopied(true);
    toast.success("URL copied!");
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <div className="flex flex-col w-full h-full">
      <div className="p-2 border-b bg-sidebar flex items-center gap-x-2">
        <Hint text="Refresh" side="bottom" align="start">
          <Button variant={"outline"} size={"sm"} onClick={onRefresh}>
            <RefreshCcwIcon></RefreshCcwIcon>
          </Button>
        </Hint>
        <Hint text="Click to copy" side="bottom">
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={handleCopy}
            className="flex-1 justify-start text-start font-normal"
            disabled={!data.sandboxUrl || copied}
          >
            <span className="truncate">{data.sandboxUrl}</span>
          </Button>
        </Hint>
        <Hint text="Open in new tab" side="bottom" align="start">
          <Button
            size={"sm"}
            disabled={!data.sandboxUrl}
            variant={"outline"}
            onClick={() => {
              if (!data.sandboxUrl) return;
              window.open(data.sandboxUrl, "_blank");
            }}
          >
            <ExternalLink></ExternalLink>
          </Button>
        </Hint>
      </div>
      <iframe
        key={fragmentKey}
        className="h-full w-full"
        sandbox="allow-forms allow-scripts allow-same-origin"
        loading="lazy"
        src={data.sandboxUrl}
      ></iframe>
    </div>
  );
}
export default FragmentWeb;
