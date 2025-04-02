import express from "express";
import { PORT } from "./utils/keys.js";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";

const app = express();

app.use(express.json());

app.use("/users", userRouter);
app.use("/posts", postRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
