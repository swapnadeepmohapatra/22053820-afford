import { getAuthToken } from "../utils/auth.js";
import { API_URL } from "../utils/keys.js";
import { getCommentsByPostId } from "./comments.service.js";
import { getAllUsers } from "./user.service.js";

export const getPostsByUserId = async (userId) => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const response = await fetch(`${API_URL}/users/${userId}/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getAuthToken()}`,
      },
    });
    const data = await response.json();

    return data.posts;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching posts");
  }
};

export const getTopPostsWithMostComments = async () => {
  try {
    const users = await getAllUsers();

    const posts = await Promise.all(
      users.map(async (user) => {
        const userPosts = await getPostsByUserId(user.id);
        const postsWithComments = await Promise.all(
          userPosts.map(async (post) => {
            const comments = await getCommentsByPostId(post.id);
            return { ...post, comments };
          })
        );
        return postsWithComments;
      })
    );

    const allPosts = posts.flat();
    const postCommentCounts = allPosts.map((post) => ({
      ...post,
      commentCount: post?.comments?.length ?? 0,
    }));

    postCommentCounts.sort((a, b) => b.commentCount - a.commentCount);

    const maxCommentCount = Math.max(
      ...postCommentCounts.map((post) => post.commentCount)
    );
    const topPosts = postCommentCounts.filter(
      (post) => post.commentCount === maxCommentCount
    );
    topPosts.sort((a, b) => b.id - a.id);

    const result = topPosts.map((post, id) => ({
      id: post.id,
      userId: post.userid,
      content: post.content,
      commentCount: post.commentCount,
      comments: post.comments,
      rank: id + 1,
    }));

    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching top posts");
  }
};

export const getLatestTop5Posts = async () => {
  try {
    const users = await getAllUsers();

    const posts = await Promise.all(
      users.map(async (user) => {
        const userPosts = await getPostsByUserId(user.id);
        const postsWithComments = await Promise.all(
          userPosts.map(async (post) => {
            const comments = await getCommentsByPostId(post.id);
            return { ...post, comments };
          })
        );
        return postsWithComments;
      })
    );

    const allPosts = posts.flat();
    const allComments = allPosts.reduce((acc, post) => {
      const postComments =
        post?.comments?.map((comment) => ({
          ...comment,
        })) ?? [];
      return acc.concat(postComments);
    }, []);

    console.log("ALL", allComments);

    const latest5Comments = allComments.sort((a, b) => b.id - a.id).slice(0, 5);

    const latest5Posts = latest5Comments.map((comment) => {
      const post = allPosts.find((post) => post.id === comment.postid);
      return {
        id: post.id,
        userId: post.userid,
        content: post.content,
        comments: post.comments,
      };
    });

    return latest5Posts;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching top posts");
  }
};
