"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/Client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

function page() {
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
      <Button
        disabled={invoke.isPending}
        onClick={() => invoke.mutate({ text: "Jai" })}
      >
        Invoke background job
      </Button>
    </div>
  );
}
export default page;
