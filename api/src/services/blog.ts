import prisma from "../config/prisma";

interface PostContent {
  blogId: string;
  authorId: string;
  title: string;
  content: string;
}

interface CreateComment {
  postId: string;
  authorId: string;
  content: string;
}

export const createPost = async ({
  blogId,
  authorId,
  title,
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

export const getPost = async (postId: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
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
