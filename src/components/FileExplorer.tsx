import { Fragment, useCallback, useMemo, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import Hint from "./Hint";
import { Button } from "./ui/button";
import { CopyCheckIcon, CopyIcon } from "lucide-react";
import { CodeView } from "./codeView";
import { convertFilesToTreeItems } from "@/lib/utils";
import TreeView from "./TreeView";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { ScrollArea } from "./ui/scroll-area";

type FileCollection = { [path: string]: string };

function getLanguageFromExtension(fileName: string): string {
  const extension = fileName.split(".").pop()?.toLowerCase();
  return extension || "text";
}

interface FileBreadcrumbProps {
  filePath: string;
}

const FileBreadcrumb = ({ filePath }: FileBreadcrumbProps) => {
  const pathSegments = filePath.split("/");
  const maxSegments = 3;

  const renderBreadCrumbItems = () => {
    if (pathSegments.length <= maxSegments) {
      // Show all segments if 3 or less
      return pathSegments.map((segment, index) => {
        const isLast = index === pathSegments.length - 1;
        return (
          <Fragment key={index}>
            <BreadcrumbItem>
              {isLast ? (
                <BreadcrumbPage className="font-medium">
                  {segment}
                </BreadcrumbPage>
              ) : (
                <span className="text-muted-foreground">{segment}</span>
              )}
            </BreadcrumbItem>
            {!isLast && <BreadcrumbSeparator></BreadcrumbSeparator>}
          </Fragment>
        );
      });
    } else {
      const firstSegment = pathSegments[0];
      const lastSegment = pathSegments.length - 1;
      return (
        <>
          <BreadcrumbItem>
            <span className="text-muted-foreground">{firstSegment}</span>
            <BreadcrumbSeparator></BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbEllipsis></BreadcrumbEllipsis>
            </BreadcrumbItem>
            <BreadcrumbSeparator></BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium">
                {lastSegment}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbItem>
        </>
      );
    }
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>{renderBreadCrumbItems()}</BreadcrumbList>
    </Breadcrumb>
  );
};

interface FileExplorerProps {
  files: FileCollection;
}
export const FileExplorer = ({ files }: FileExplorerProps) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(() => {
    const filesKeys = Object.keys(files);
    return filesKeys.length > 0 ? filesKeys[0] : null;
  });
  const treeData = useMemo(() => {
    return convertFilesToTreeItems(files);
  }, [files]);
  console.log(treeData);

  const handleFileSelect = useCallback(
    (filePath: string) => {
      if (files[filePath]) {
        setSelectedFile(filePath);
      }
    },
    [files]
  );

  return (
    <div className="h-full">
      {/* desktop */}
      <ResizablePanelGroup direction="horizontal" className="max-lg:hidden!">
        <ResizablePanel
          defaultSize={30}
          minSize={30}
          className="bg-sidebar flex"
        >
          <div className="flex w-full">
            <div className="w-full overflow-y-auto">
              <TreeView
                data={treeData}
                value={selectedFile}
                onSelect={handleFileSelect}
              ></TreeView>
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle className="hover:bg-primary transition-colors"></ResizableHandle>
        <ResizablePanel defaultSize={70} minSize={50}>
          <SelectedFile
            files={files}
            selectedFile={selectedFile}
          ></SelectedFile>
        </ResizablePanel>
      </ResizablePanelGroup>

      {/* mobile/tablet */}
      <ResizablePanelGroup direction="vertical" className="lg:hidden!">
        <ResizablePanel
          defaultSize={30}
          minSize={30}
          className="bg-sidebar flex"
        >
          <div className="flex w-full">
            <div className="w-full overflow-y-auto">
              <TreeView
                data={treeData}
                value={selectedFile}
                onSelect={handleFileSelect}
              ></TreeView>
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle className="hover:bg-primary transition-colors"></ResizableHandle>
        <ResizablePanel defaultSize={70} minSize={50}>
          <SelectedFile
            files={files}
            selectedFile={selectedFile}
          ></SelectedFile>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

interface SelectedFileProps {
  selectedFile: string | null;
  files: FileCollection;
}

const SelectedFile = ({ selectedFile, files }: SelectedFileProps) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(() => {
    if (selectedFile) {
      navigator.clipboard.writeText(files[selectedFile]);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [selectedFile, files]);

  return (
    <>
      {selectedFile && files[selectedFile] ? (
        <div className="h-full flex w-full flex-col">
          <div className="border-b bg-sidebar px-4 py-2 flex justify-between items-center gap-x-2">
            <FileBreadcrumb filePath={selectedFile}></FileBreadcrumb>
            <Hint text="Copy to clipboard" side="bottom">
              <Button
                variant={"outline"}
                size={"icon"}
                className="ml-auto"
                onClick={handleCopy}
                disabled={copied}
              >
                {copied ? (
                  <CopyCheckIcon></CopyCheckIcon>
                ) : (
                  <CopyIcon></CopyIcon>
                )}
              </Button>
            </Hint>
          </div>

          <div className="flex-1 overflow-auto">
            <CodeView
              code={files[selectedFile]}
              lang={getLanguageFromExtension(selectedFile)}
            ></CodeView>
          </div>
        </div>
      ) : (
        <div className="flex h-full items-center justify-center text-muted">
          Select a file to view it&apos;s content
        </div>
      )}
    </>
  );
};
