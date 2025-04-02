import { Button, Container, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../utils/keys";
import { User } from "../../types";
import UserCard from "./components/UserCard";

function TopUsers() {
  const [topUsers, setTopUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(`${BACKEND_URL}/users`);
        const result = await response.json();

        if (result.success) {
          setTopUsers(result.body);
        } else {
          setError(result.error);
        }

        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch users");
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <Container maxWidth="md">
      <Button
        sx={{
          position: "absolute",
          zIndex: 1000,
        }}
        variant="outlined"
        onClick={() => {
          window.history.back();
        }}
      >
        <ArrowBackIcon />
      </Button>
      <Typography
        variant="h4"
        component="h1"
        my={2}
        textAlign={"center"}
        fontWeight={"bold"}
      >
        Top Users
      </Typography>
      <Stack>
        {loading && <Typography>Loading...</Typography>}
        {error && <Typography color="error">{error}</Typography>}
        {!loading && !error && (
          <Stack gap={2}>
            {topUsers.map((user) => (
              <UserCard user={user} key={user.id} />
            ))}
          </Stack>
        )}
      </Stack>
    </Container>
  );
}

export default TopUsers;
