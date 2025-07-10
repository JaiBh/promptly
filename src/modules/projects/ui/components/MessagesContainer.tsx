import { useTRPC } from "@/trpc/Client";
import { useSuspenseQuery } from "@tanstack/react-query";
import MessageCard from "./MessageCard";
import MessageForm from "./MessageForm";
import { useEffect, useRef } from "react";
import { Fragment } from "@/generated/prisma";
import MessageLoading from "./MessageLoading";

interface Props {
  projectId: string;
  activeFragment: Fragment | null;
  setActiveFragment: (fragment: Fragment | null) => void;
}

function MessagesContainer({
  projectId,
  activeFragment,
  setActiveFragment,
}: Props) {
  const trpc = useTRPC();
  const bottomRef = useRef<HTMLDivElement>(null);

  const { data: messages } = useSuspenseQuery(
    trpc.messages.getMany.queryOptions(
      {
        projectId: projectId,
      },
      {
        // TODO: temp live message update
        refetchInterval: 5000,
      }
    )
  );

  useEffect(() => {
    const lastAssistantMessageWithFragment = messages.findLast(
      (message) => message.role === "ASSISTANT" && !!message.fragment
    );

    if (lastAssistantMessageWithFragment) {
      setActiveFragment(lastAssistantMessageWithFragment.fragment);
    }
  }, [messages, setActiveFragment]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [messages.length]);

  const lastMessage = messages[messages.length - 1];
  const isLastMessageUser = lastMessage.role === "USER";

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
                isActiveFragment={activeFragment?.id === msg.fragment?.id}
                onFragmentClick={() => setActiveFragment(msg.fragment)}
                createdAt={msg.createdAt}
                type={msg.type}
              ></MessageCard>
            );
          })}
          {isLastMessageUser && <MessageLoading></MessageLoading>}
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
