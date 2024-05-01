import { Message } from "@/stores/messaging/types.ts";
import { AuthenticatorComponent } from "@/pages/AuthenticatorComponent.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { MessageEntry, MessageInput } from "@/components/messages/MessageComponent.tsx";
import { useVirtualizer } from "@tanstack/react-virtual";
import React from "react";

export function MessagePage() {
  const messages: Message[] = Array.from({ length: 1000 }, (_, idx) => ({
    id: `${idx + 1}`,
    username: "Emre",
    content: `Content ${idx + 1} dfvsmdlfvmsdfmvdkslmfvlksdmvkldsmfvklklmsdlkfvmsdlkfvsmdlfkvmsdfklvmsdlk fbglmdfgbkfdlbm bdlgbdfmkgbmdf fglbkdmfgklbmdfgklbdfmb fgbkfgmbdlkgmbdf`,
    type: "message"
  }));

  const scrollableRef = React.useRef(null);

  const virtualizer = useVirtualizer({
    count: messages.length,
    getScrollElement: () => scrollableRef.current,
    estimateSize: () => 50
  });

  const items = virtualizer.getVirtualItems();

  return (
    <div className={"container flex h-dvh py-4"}>
      <AuthenticatorComponent>
        <Card className={"flex flex-row flex-1"}>
          <CardContent className={"flex flex-1 flex-col"}>
            <div ref={scrollableRef} className={"flex-1 overflow-scroll overscroll-auto py-4"}>
              <div className={"relative w-full"} style={{ height: virtualizer.getTotalSize() }}>
                <div className={"absolute top-0 left-0 w-full"}
                     style={{ transform: `translateY(${items[0]?.start ?? 0}px)` }}>
                  {items.map((it) => (
                      <div
                        key={it.key}
                        data-index={it.index}
                        ref={virtualizer.measureElement}>
                        <MessageEntry message={messages[it.index]} />
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div>
              <MessageInput />
            </div>
          </CardContent>
        </Card>
      </AuthenticatorComponent>
    </div>
  );
}