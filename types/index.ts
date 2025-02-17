export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
  role: "user" | "admin";
  is_active: boolean;
  refresh_token: string | null;
};

export type Post = {
  id: number;
  title: string;
  content: string;
  author_id: number; // Foreign key to User
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type Comment = {
  id: number;
  content: string;
  post_id: number; // Foreign key to Post
  user_id: number; // Foreign key to User
  created_at: string;
};

export type Tag = {
  id: number;
  name: string;
};

export type PostTag = {
  post_id: number; // Foreign key to Post
  tag_id: number; // Foreign key to Tag
};
