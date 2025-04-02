import {
  getLatestTop5Posts,
  getTopPostsWithMostComments,
} from "../services/post.service.js";

export const getTopPosts = async (req, res) => {
  try {
    const { type } = req.query;

    if (!type || type.trim() === "") {
      return res
        .status(400)
        .json({ success: false, error: "Type is required" });
    }

    if (type.trim() !== "latest" && type.trim() !== "popular") {
      return res.status(400).json({
        success: false,
        error: "Type must be either 'latest' or 'popular'",
      });
    }

    if (type.trim() === "latest") {
      const data = await getLatestTop5Posts();
      return res.status(200).json({ success: true, body: data });
    }

    if (type.trim() === "popular") {
      const data = await getTopPostsWithMostComments();
      return res.status(200).json({ success: true, body: data });
    }

    res.status(200).json({ success: true, body: "top posts" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error: error.message });
  }
};
