import { useTRPC } from "@/trpc/Client";
import { useSuspenseQuery } from "@tanstack/react-query";
import MessageCard from "./MessageCard";
import MessageForm from "./MessageForm";
import { useEffect, useRef } from "react";
interface Props {
  projectId: string;
}

function MessagesContainer({ projectId }: Props) {
  const trpc = useTRPC();
  const bottomRef = useRef<HTMLDivElement>(null);

  const { data: messages } = useSuspenseQuery(
    trpc.messages.getMany.queryOptions({
      projectId: projectId,
    })
  );

  useEffect(() => {
    const lastAssistantMessage = messages.findLast(
      (message) => message.role === "ASSISTANT"
    );

    if (lastAssistantMessage) {
      // TODO: set active fragment
    }
  }, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [messages.length]);
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="pt-2 pr-1">
          {messages.map((msg) => {
            return (
              <MessageCard
                key={msg.id}
                content={msg.content}
                role={msg.role}
                fragment={msg.fragment}
                isActiveFragment={false}
                onFragmentClick={() => {}}
                createdAt={msg.createdAt}
                type={msg.type}
              ></MessageCard>
            );
          })}
          <div ref={bottomRef} />
        </div>
      </div>
      <div className="relative p-3 pt-1">
        <div className="absolute -top-6 left-0 right-0 h-6 bg-gradient-to-b from-transparent to-background/70 pointer-events-none" />
        <MessageForm projectId={projectId}></MessageForm>
      </div>
    </div>
  );
}
export default MessagesContainer;
