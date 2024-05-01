import { Message } from "@/stores/messaging/types.ts";
import { Avatar, AvatarFallback } from "@/components/ui/avatar.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ChevronRightIcon } from "@radix-ui/react-icons";

type MessageListProps = {
  messages: Message[];
};

type MessageEntryProps = {
  message: Message;
};

export function MessageInput() {
  return (
    <div className={"flex flex-row gap-4"}>
      <Input className={"flex-1"} placeholder={"Enter your message..."} />
      <Button variant={"outline"} className={"p-2"}>
        <ChevronRightIcon className={"w-6 h-6"} />
      </Button>
    </div>
  );
}

export function MessageList({ messages }: MessageListProps) {
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