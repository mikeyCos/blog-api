import prisma from "../config/prisma";
import { PostNotFoundError } from "../errors/customErrors";

interface PostContent {
  blogId: string;
  authorId: string;
  title: string;
  titleSlug: string;
  content: string;
}

interface CreateComment {
  postId: string;
  authorId: string;
  content: string;
}

interface UpdatePost {
  authorId: string;
  prevTitleSlug: string;
  titleSlug: string;
  title: string;
  content: string;
}

interface FilterOptions {
  postId?: string;
  authorId?: string;
  titleSlug?: string;
}

export const createPost = async ({
  blogId,
  authorId,
  title,
  titleSlug,
  content,
}: PostContent) => {
  const post = prisma.post.create({
    data: {
      blog: {
        connect: {
          id: blogId,
        },
      },
      author: {
        connect: {
          id: authorId,
        },
      },
      title: title,
      titleSlug: titleSlug,
      content: content,
    },
  });

  return post;
};

export const createComment = async ({
  postId,
  authorId,
  content,
}: CreateComment) => {
  const newComment = prisma.comment.create({
    data: {
      post: {
        connect: {
          id: postId,
        },
      },
      author: {
        connect: {
          id: authorId,
        },
      },
      content: content,
    },
  });

  return newComment;
};

export const getPost = async (titleSlug: string, author: string) => {
  console.group("getPost running...");
  console.log("titleSlug:", titleSlug);
  console.log("author:", author);
  console.groupEnd();
  const post = await prisma.post
    .findFirstOrThrow({
      where: {
        titleSlug: titleSlug,
        author: {
          username: author,
        },
      },
    })
    .catch(() => {
      throw new PostNotFoundError(titleSlug);
    });

  return post;
};

export const getPosts = async (blogId: string) => {
  const posts = await prisma.post.findMany({
    where: {
      blogId: blogId,
    },
  });

  return posts;
};

export const getPostComment = async ({
  postId,
  commentId,
}: {
  postId: string;
  commentId: string;
}) => {
  const postComment = await prisma.comment.findFirst({
    where: {
      postId: postId,
      AND: {
        id: commentId,
      },
    },
  });

  return postComment;
};

export const getPostComments = async (postId: string) => {
  const postComments = await prisma.post.findMany({
    where: {
      id: postId,
    },
  });

  return postComments;
};

export const updatePost = async ({
  authorId,
  prevTitleSlug,
  titleSlug,
  title,
  content,
}: UpdatePost) => {
  // Need to throw custom error

  const updatedPost = await prisma.post.update({
    where: {
      postId: {
        authorId: authorId,
        titleSlug: prevTitleSlug,
      },
    },
    data: {
      title: title,
      titleSlug: titleSlug,
      content: content,
    },
  });

  return updatedPost;
};
