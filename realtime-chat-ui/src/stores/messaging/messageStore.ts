import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Message } from "@/stores/messaging/types.ts";

interface MessagesState {
  messages: Message[];
}

interface MessagesActions {
  addMessage: (message: Message) => void;
}

type MessagesStore = MessagesState & MessagesActions;

export const useMessagesStore = create<MessagesStore>()(
  immer((set) => ({
    messages: [],
    addMessage: (message: Message) => {
      set((state) => {
        state.messages.push(message);
      });
    }
  }))
);