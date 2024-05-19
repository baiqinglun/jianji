export type NotionType = {
  id: string;
  content: string;
  tag: string;
  create_time: number;
  update_time: number;
};

export type NotionListType = NotionType[];

export type TagType = {
  id: string;
  name: string;
  father: string;
  create_time: number;
  update_time: number;
};

export type TagListType = NotionType[];

export type CartItemType = "show" | "edit";

export type UserType = {
  name: string;
  password: string;
  image: string;
  create_time: number;
};
