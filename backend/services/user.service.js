import fetch from "node-fetch";
import { transformUserData } from "../utils/utils.js";
import { API_URL } from "../utils/keys.js";
import { getPostsByUserId } from "./post.service.js";
import { getAuthToken } from "../utils/auth.js";

export const getAllUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getAuthToken()}`,
      },
    });

    const data = await response.json();

    const transformedData = transformUserData(data.users);
    return transformedData;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching users");
  }
};

export const getTop5UsersWithMostPosts = async () => {
  try {
    const users = await getAllUsers();

    const userPostCounts = [];

    await Promise.all(
      users.map(async (user) => {
        const { id, name } = user;

        const posts = await getPostsByUserId(id);
        const postCount = posts.length;

        userPostCounts.push({ id, name, postCount });
      })
    );

    userPostCounts.sort((a, b) => b.postCount - a.postCount);

    const top5Users = userPostCounts.slice(0, 5);

    const result = top5Users.map((user, id) => ({
      id: user.id,
      name: user.name,
      postCount: user.postCount,
      rank: id,
    }));

    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching top users");
  }
};
