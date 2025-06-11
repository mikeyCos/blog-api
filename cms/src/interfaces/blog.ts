export interface Blog {
  id: string;
  authorId?: string;
  posts: Post[];
}

export interface Post {
  id: string;
  authorId: string;
  blogId: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  // comments: Comment[];
}

export interface CreatedAt {
  createdAt: Date;
}
