import { getAuthToken } from "../utils/auth.js";
import { API_URL } from "../utils/keys.js";

export const getCommentsByPostId = async (postId) => {
  try {
    const response = await fetch(`${API_URL}/posts/${postId}/comments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getAuthToken()}`,
      },
    });
    const data = await response.json();

    return data.comments;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching comments");
  }
};
