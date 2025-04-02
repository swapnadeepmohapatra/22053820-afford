import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";
import { User } from "../../../types";

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <Stack
      key={user.id}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      padding={2}
      borderRadius={2}
      boxShadow={1}
      bgcolor="grey.900"
    >
      <Box display={"flex"} alignItems="center" gap={2}>
        <Avatar>U{user.id}</Avatar>
        <Typography>{user.name}</Typography>
      </Box>
      <Typography>{user.postCount} posts</Typography>
    </Stack>
  );
};

export default UserCard;
