import prisma from "../config/prisma";
import { PostNotFoundError, UserNotFoundError } from "../errors/customErrors";
import { Prisma } from "../prisma/generated/prisma";

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
  username: string;
  postPublicId: string;
  titleSlug: string;
  title: string;
  content: string;
}

interface DeletePost {
  postPublicId: string;
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

// export const getPost = async (titleSlug: string, author: string) => {
export const getPost = async (publicId: number, username: string) => {
  console.group("getPost running...");
  console.log("publicId:", publicId);
  console.log("username:", username);
  console.groupEnd();

  const post = await prisma.post
    .findUniqueOrThrow({
      where: {
        publicId: publicId,
        author: {
          username: username,
        },
      },
    })
    .catch(() => {
      throw new PostNotFoundError(`${publicId}`);
    });

  return post;
};

// Should I use prisma.$transaction to get the user, then the user's posts?
// https://www.prisma.io/docs/orm/prisma-client/queries/transactions#interactive-transactions-1
export const getPosts = async (username: string) => {
  return await prisma.$transaction(async (tx) => {
    const user = await tx.user
      .findUniqueOrThrow({
        where: {
          username: username,
        },
        omit: {
          password: true,
        },
        include: {
          blog: true,
        },
      })
      .catch(() => {
        throw new UserNotFoundError(username!, false);
      });

    const posts = await tx.post.findMany({
      where: {
        blogId: user.blog?.id,
      },
    });

    return posts;
  });
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
  username,
  postPublicId,
  title,
  titleSlug,
  content,
}: UpdatePost) => {
  const updatedPost = await prisma.post.update({
    where: {
      publicId: +postPublicId,
      author: {
        username: username,
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

export const deletePost = async (postId: string) => {
  const deletedPost = await prisma.post.delete({
    where: {
      id: postId,
    },
  });

  return deletedPost;
};
