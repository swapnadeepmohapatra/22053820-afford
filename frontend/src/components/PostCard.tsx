import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Badge,
  Box,
} from "@mui/material";
import { Post } from "../types";

interface PostProps {
  post: Post;
}

const PostCard: React.FC<PostProps> = ({
  post: { userId, content, commentCount, comments },
}) => {
  return (
    <Card sx={{ width: "100%", maxWidth: "lg", my: 4 }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <Avatar>U{userId}</Avatar>
          <Box sx={{ ml: 3 }}>
            <Typography variant="subtitle1">User {userId}</Typography>
          </Box>
        </Box>

        <Typography variant="body1" sx={{ mb: 3 }}>
          {content}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Badge badgeContent={commentCount ?? comments.length} color="primary">
            <Typography variant="body2">Comments</Typography>
          </Badge>
        </Box>

        {comments.map((comment) => (
          <Box
            key={comment.id}
            sx={{ ml: 4, mt: 2, p: 2, bgcolor: "grey.800", borderRadius: 1 }}
          >
            <Typography variant="body2">{comment.content}</Typography>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default PostCard;
