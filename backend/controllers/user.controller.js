import { getTop5UsersWithMostPosts } from "../services/user.service.js";

export const getTop5Users = async (req, res) => {
  try {
    const users = await getTop5UsersWithMostPosts();

    res.status(200).json({ success: true, body: users });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error: error.message });
  }
};
