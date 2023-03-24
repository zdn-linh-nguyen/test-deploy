import { IUserMatch } from "@/types/interface";

declare interface IMessageItem {
  type: "text" | "image" | "audio";
  value: string | [];
  createdAt?: string;
  updatedAt?: string;
}
declare interface IMessage {
  messages: IMessageItem[];
  senderId: IUserMatch;
  receiverId: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}
