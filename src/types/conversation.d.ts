declare interface IConversationUser {
  id: string;
  name: IUserName;
  avatar: string;
  lastLogin: string;
}
declare interface IConversation {
  id: string;
  users: IConversationUser[];
  messages: IMessage[];
  updatedAt: string;
}
