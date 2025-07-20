import { Fragment } from "@/generated/prisma";
import { cn } from "@/lib/utils";
import { ChevronRight, Code2Icon } from "lucide-react";

interface Props {
  fragment: Fragment;
  onFragmentClick: (fragment: Fragment) => void;
  isActiveFragment: boolean;
}

function FragmentCard({ fragment, onFragmentClick, isActiveFragment }: Props) {
  return (
    <button
      className={cn(
        "flex items-start text-start gap-2 border rounded-lg bg-muted w-fit p-3 hover:bg-secondary transition-colors",
        isActiveFragment &&
          "bg-primary text-primary-foreground border-primary hover:bg-primary"
      )}
      onClick={() => onFragmentClick(fragment)}
    >
      <Code2Icon className="size-4 mt-0.5"></Code2Icon>
      <div className="flex flex-col flex-1">
        <span className="text-sm font-medium line-clamp-1">
          {fragment.title}
        </span>
        <span className="text-sm max-lg:hidden">Preview</span>
      </div>
      <div className="flex items-center justify-center mt-0.5">
        <ChevronRight className="size-4"></ChevronRight>
      </div>
    </button>
  );
}
export default FragmentCard;
