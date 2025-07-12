import { TreeItem } from "@/types";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarProvider,
  SidebarRail,
} from "./ui/sidebar";
import { ChevronRightIcon, FileIcon, FolderIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

interface Props {
  data: TreeItem[];
  value?: string | null;
  onSelect: (value: string) => void;
}

function TreeView({ data, value, onSelect }: Props) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="none" className="w-full">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {data.map((item, index) => {
                  return (
                    <Tree
                      key={index}
                      item={item}
                      selectedValue={value}
                      onSelect={onSelect}
                      parentPath=""
                    ></Tree>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail></SidebarRail>
      </Sidebar>
    </SidebarProvider>
  );
}
export default TreeView;

interface TreeProps {
  item: TreeItem;
  selectedValue?: string | null;
  onSelect?: (value: string) => void;
  parentPath: string;
}
const Tree = ({ item, selectedValue, onSelect, parentPath }: TreeProps) => {
  const [name, ...items] = Array.isArray(item) ? item : [item];
  const currentPath = parentPath ? `${parentPath}/${name}` : name;
  if (!items.length) {
    // It's a file
    const isSelected = selectedValue === currentPath;
    return (
      <SidebarMenuButton
        isActive={isSelected}
        className="data-[active=true]:bg-transparent"
        onClick={() => onSelect?.(currentPath)}
      >
        <FileIcon></FileIcon>
        <span className="truncate">{name}</span>
      </SidebarMenuButton>
    );
  }
  //   It's a folder
  return (
    <SidebarMenuItem>
      <Collapsible
        className="group.collapsible [$[data-state=open]>button>svg:first-child]:rotate-90"
        defaultOpen
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <ChevronRightIcon className="transition-transform"></ChevronRightIcon>
            <FolderIcon></FolderIcon>
            <span className="truncate">{name}</span>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {items.map((subItem, index) => {
              return (
                <Tree
                  key={index}
                  item={subItem}
                  selectedValue={selectedValue}
                  onSelect={onSelect}
                  parentPath={currentPath}
                ></Tree>
              );
            })}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
};
