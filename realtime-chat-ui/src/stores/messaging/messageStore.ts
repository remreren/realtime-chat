import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Message, Message2 } from "@/stores/messaging/types.ts";

interface MessagesState {
  messages: Message[];
}

interface MessagesActions {
  addMessage: (message: Message2) => void;
}

type MessagesStore = MessagesState & MessagesActions;

export const useMessagesStore = create<MessagesStore>()(
  immer((set) => ({
    messages: [],
    addMessage: (message: Message2) => {
      set((state) => {
        state.messages.unshift({
          id: `${state.messages.length + 1}`,
          username: "remreren",
          ...message,
        });
      });
    }
  }))
);