"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/Client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

function Page() {
  const [value, setValue] = useState("");
  const trpc = useTRPC();
  const invoke = useMutation(
    trpc.invoke.mutationOptions({
      onSuccess: () => {
        toast.success("Background job started");
      },
    })
  );
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Input value={value} onChange={(e) => setValue(e.target.value)}></Input>
      <Button
        disabled={invoke.isPending}
        onClick={() => invoke.mutate({ value: value })}
      >
        Invoke background job
      </Button>
    </div>
  );
}
export default Page;
