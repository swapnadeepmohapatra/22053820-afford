import { Button, Container, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../utils/keys";
import { Post } from "../../types";
import PostCard from "../../components/PostCard";

function TrendingPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(`${BACKEND_URL}/posts?type=popular`);
        const result = await response.json();

        if (result.success) {
          setPosts(result.body);
        } else {
          setError(result.error);
        }

        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch posts");
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
        Trending Posts
      </Typography>
      <Stack>
        {loading && <Typography>Loading...</Typography>}
        {error && <Typography color="error">{error}</Typography>}
        {!loading && !error && (
          <Stack gap={2}>
            {posts.map((post) => (
              <PostCard post={post} key={post.id} />
            ))}
          </Stack>
        )}
      </Stack>
    </Container>
  );
}

export default TrendingPosts;
