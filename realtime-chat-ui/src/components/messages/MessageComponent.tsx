import { Message } from "@/stores/messaging/types.ts";
import { Avatar, AvatarFallback } from "@/components/ui/avatar.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { useMessagesStore } from "@/stores/messaging/messageStore.ts";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form.tsx";

type MessageEntryProps = {
  message: Message;
};

const MessageForm = z.object({
  message: z.string().min(1, {
    message: "Username must be at least 1 characters."
  })
});

export function MessageInput() {
  const addMessage = useMessagesStore((state) => state.addMessage);

  const form = useForm<z.infer<typeof MessageForm>>({
    resolver: zodResolver(MessageForm),
    defaultValues: {
      message: ""
    }
  });

  const onSubmitForm = (data: z.infer<typeof MessageForm>) => {
    addMessage({ content: data.message, type: "message" });
    form.reset({
      message: ""
    });
  };

  return (
    <div className={"w-full"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitForm)} className={"flex w-full flex-row gap-4"} autoComplete={"off"}>
          <FormField
            control={form.control}
            name={"message"}
            render={({ field }) => (
              <FormItem className={"flex-1"}>
                <FormControl>
                  <Input placeholder={"Enter your message..."}
                         {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}>
          </FormField>
          <Button variant={"outline"} className={"p-2"} type={"submit"}>
            <ChevronRightIcon className={"w-6 h-6"} />
          </Button>
        </form>
      </Form>
    </div>
  );
}

export function MessageList() {
  const messages = useMessagesStore((state) => state.messages);

  return (
    <>
      {messages.map((message, idx) => (
        <>
          <MessageEntry key={idx} message={message} />
          {idx !== messages.length - 1 && <Separator className={"my-1"} />}
        </>
      ))}
    </>
  );
}

export function MessageEntry({ message }: MessageEntryProps) {
  return (
    <div className={"flex flex-row py-2"}>
      <div>
        <Avatar>
          <AvatarFallback>{message.username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      </div>
      <div className={"flex-grow items-center px-4"}>
        <h4 className={"font-bold"}>{message.username}</h4>
        <div>{message.content}</div>
      </div>
    </div>
  );
}