import { Message } from "@/stores/messaging/messageStore.interface.ts";
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
import { useCallback, useEffect } from "react";
import { LoaderIcon } from "lucide-react";
import { useParams } from "react-router-dom";
import { useLoginStore } from "@/stores/loginStore.ts";
import { useWSClientStore } from "@/stores/wsclient/wsclient.ts";
import { ConnectionStatus } from "@/stores/wsclient/wsclient.interface.ts";

type MessageEntryProps = {
  message: Message;
};

const MessageForm = z.object({
  message: z.string().min(1, { message: "" })
});

export function MessageInput() {
  const params = useParams();
  const [username] = useLoginStore((state) => [state.username]);
  const addMessage = useMessagesStore((state) => state.addMessage);

  const [client, connect, disconnect, connectionStatus] = useWSClientStore((state) => [state.client, state.connect, state.disconnect, state.connectionStatus]);

  type sendMessageType = (message: string) => void;

  const sendMessage = useCallback<sendMessageType>((message) => {
    if (!client) return;

    client.publish({
      destination: `/app/chat.send/${params.id}`,
      body: JSON.stringify({
        sender: username,
        content: message,
        type: "CHAT"
      }),
      headers: {
        username: username,
        passcode: "pass"
      }
    });
  }, [client, params.id, username]);

  useEffect(() => {
    if (!client || connectionStatus !== ConnectionStatus.CONNECTED) return;

    client.subscribe(`/topic/${params.id}`, (message) => {
      addMessage(JSON.parse(message.body));
    });
  }, [client, connectionStatus]);

  useEffect(() => {
    connect();

    return () => {
      if (client) {
        setTimeout(disconnect, 100);
      }
    };
  }, []);

  const form = useForm<z.infer<typeof MessageForm>>({
    resolver: zodResolver(MessageForm),
    defaultValues: {
      message: ""
    }
  });

  const onSubmitForm = (data: z.infer<typeof MessageForm>) => {
    sendMessage(data.message);
    form.reset({
      message: ""
    });
  };

  return (connectionStatus === ConnectionStatus.CONNECTED) ?
    ((<div className={"w-full"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitForm)} className={"flex w-full flex-row gap-4"}
              autoComplete={"off"}>
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
    </div>)) : (
      (connectionStatus === ConnectionStatus.CONNECTING ?
        (<div className={"w-full flex justify-center items-center"}>
          <LoaderIcon className="animate-spin mx-2" />Connecting...
        </div>) :
        (<div className={"w-full flex justify-center items-center"}>
          Failed to connect.
        </div>)));
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
          <AvatarFallback>{message.sender?.slice(0, 2).toUpperCase() ?? "UN"}</AvatarFallback>
        </Avatar>
      </div>
      <div className={"flex-grow items-center px-4"}>
        <h4 className={"font-bold"}>{message.sender}</h4>
        <div>{message.content}</div>
      </div>
    </div>
  );
}