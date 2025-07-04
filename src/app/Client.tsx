"use client";

import { useTRPC } from "@/trpc/Client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Client = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.createAI.queryOptions({ text: "JAI" })
  );
  return <div>{JSON.stringify(data)}</div>;
};
