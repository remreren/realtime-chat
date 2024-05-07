export type MessageType = "message" | "join" | "leave";

export type Message = {
  id: string;
  sender: string;
  content: string;
  type: MessageType;
};

export type Message2 = {
  content: string;
  type: MessageType;
};
