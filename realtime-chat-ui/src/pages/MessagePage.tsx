import { AuthenticatorComponent } from "@/pages/AuthenticatorComponent.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { MessageInput, MessageList } from "@/components/messages/MessageComponent.tsx";

export function MessagePage() {
  return (
    <div className={"container flex h-dvh py-4"}>
      <AuthenticatorComponent>
        <Card className={"flex flex-row flex-1"}>
          <CardContent className={"flex flex-1 flex-col"}>
            <div className={"pt-4"}>
              <MessageInput />
            </div>
            <div className={"flex-row-reverse flex-1 overflow-scroll overscroll-auto py-4"}>
              <MessageList />
            </div>
          </CardContent>
        </Card>
      </AuthenticatorComponent>
    </div>
  );
}