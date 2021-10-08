export type Channel = {
  id: string;
  name: string;
};

export type User = {
  id: string;
  name: string;
  connected: boolean;
};

export type UserStatus = {
  id: string;
  connected: boolean;
};

export type Message = {
  id: string;
  date: Number;
  content: string;
  creator: User;
  channel: Channel;
  type: "created" | "deleted" | "updated";
};
