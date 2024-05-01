export type MessageType = "message" | "join" | "leave";

export type Message = {
  id: string;
  username: string;
  content: string;
  type: MessageType;
};
