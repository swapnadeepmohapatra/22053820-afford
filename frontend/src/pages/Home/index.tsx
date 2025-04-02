import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{ mb: 2 }}
          textAlign={"center"}
          fontWeight={"bold"}
        >
          Social Media Analytics
        </Typography>
        <Stack gap={2} mt={4}>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/top-users", {
                relative: "path",
              });
            }}
          >
            Top Users
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/trending-posts", {
                relative: "path",
              });
            }}
          >
            Trending Posts
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/feed", {
                relative: "path",
              });
            }}
          >
            Feed
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}

export default Home;
