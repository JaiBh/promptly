import FragmentWeb from "../components/FragmentWeb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeIcon, CrownIcon, EyeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileExplorer } from "@/components/FileExplorer";
import UserControl from "@/components/UserControl";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Fragment } from "@/generated/prisma";

interface Props {
  activeFragment: Fragment | null;
}

function ProjectPanel({ activeFragment }: Props) {
  const { has } = useAuth();
  const hasProAccess = has?.({ plan: "pro" });
  const [tabState, setTabState] = useState<"preview" | "code">("preview");
  return (
    <Tabs
      className="h-full gap-y-0"
      defaultValue="preview"
      value={tabState}
      onValueChange={(value) => setTabState(value as "preview" | "code")}
    >
      <div className="flex w-full items-center p-2 border-b gap-x-2">
        <TabsList className="h-8 border p-0 rounded-md">
          <TabsTrigger value="preview" className="rounded-md">
            <EyeIcon></EyeIcon>
            <span>Demo</span>
          </TabsTrigger>
          <TabsTrigger value="code" className="rounded-md">
            <CodeIcon></CodeIcon>
            <span>Code</span>
          </TabsTrigger>
        </TabsList>

        <div className="ml-auto flex items-center gap-x-2">
          {!!hasProAccess && (
            <>
              <Button
                asChild
                size="icon"
                variant={"tertiary"}
                className="sm:hidden"
              >
                <Link href={"/pricing"}>
                  <CrownIcon></CrownIcon>
                </Link>
              </Button>

              <Button
                asChild
                size="sm"
                variant={"tertiary"}
                className="max-sm:hidden"
              >
                <Link href={"/pricing"}>
                  <CrownIcon></CrownIcon> Upgrade
                </Link>
              </Button>
            </>
          )}
          <UserControl></UserControl>
        </div>
      </div>
      <TabsContent value="preview">
        {" "}
        {!!activeFragment && <FragmentWeb data={activeFragment}></FragmentWeb>}
      </TabsContent>
      <TabsContent value="code" className="min-h-0">
        {!!activeFragment?.files && (
          <FileExplorer
            files={activeFragment.files as { [path: string]: string }}
          ></FileExplorer>
        )}
      </TabsContent>
    </Tabs>
  );
}
export default ProjectPanel;
