import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextareaAutosize from "react-textarea-autosize";
import z from "zod";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Form, FormField } from "@/components/ui/form";
import { ArrowUpIcon, Loader2Icon } from "lucide-react";
import { useTRPC } from "@/trpc/Client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import Usage from "./Usage";
import { useRouter } from "next/navigation";

interface Props {
  projectId: string;
}

const formSchema = z.object({
  value: z
    .string()
    .min(1, { message: "Value is required" })
    .max(10000, { message: "Value is too long" }),
});

function MessageForm({ projectId }: Props) {
  const router = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { data: usage } = useQuery(trpc.usage.status.queryOptions());

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "",
    },
  });

  const createMessage = useMutation(
    trpc.messages.create.mutationOptions({
      onSuccess: () => {
        form.reset();
        queryClient.invalidateQueries(
          trpc.messages.getMany.queryOptions({ projectId })
        );
        queryClient.invalidateQueries(trpc.usage.status.queryOptions());
      },
      onError: (error) => {
        if (error?.data?.code === "TOO_MANY_REQUESTS") {
          router.push("/pricing");
        }
        toast.error(error.message);
      },
    })
  );

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await createMessage.mutateAsync({
      value: values.value,
      projectId,
    });
  };
  const [isFocused, setIsFocused] = useState(false);
  const isPending = createMessage.isPending;
  const isButtonDisabled = isPending || !form.formState.isValid;
  const showUsage = !!usage;

  return (
    <Form {...form}>
      {showUsage && (
        <Usage
          points={usage.remainingPoints}
          msBeforeNext={usage.msBeforeNext}
        ></Usage>
      )}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "relative border p-4 pt-1 rounded-xl bg-sidebar dark:bg-sidebar transition-all",
          isFocused && "shadow-xs",
          showUsage && "rounded-t-none"
        )}
      >
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <TextareaAutosize
              {...field}
              disabled={isPending}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              minRows={1}
              maxRows={8}
              className="pt-4 resize-none border-none w-full outline-none bg-transparent max-lg:text-sm"
              placeholder="What would you like to build?"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  form.handleSubmit(onSubmit)(e);
                }
              }}
            ></TextareaAutosize>
          )}
        />
        <button
          className={cn(
            "absolute bottom-3 right-2 size-8 rounded-full flex items-center justify-center bg-card border ",
            isButtonDisabled && "opacity-50 cursor-not-allowed",
            !isButtonDisabled &&
              "hover:text-primary hover:border-primary transition"
          )}
          disabled={isButtonDisabled}
        >
          {isPending ? (
            <Loader2Icon className="size-4 animate-spin max-lg:size-3"></Loader2Icon>
          ) : (
            <ArrowUpIcon></ArrowUpIcon>
          )}
        </button>
      </form>
    </Form>
  );
}
export default MessageForm;
