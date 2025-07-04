import { trpc, getQueryClient } from "@/trpc/Server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Client } from "./Client";
import { Suspense } from "react";

async function page() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.createAI.queryOptions({ text: "JAI" }));
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<p>Loading...</p>}>
        <Client></Client>
      </Suspense>
    </HydrationBoundary>
  );
}
export default page;
