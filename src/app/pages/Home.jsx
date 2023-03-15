import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PostList from "../components/PostList";

const PostPage = ({ posts }) => {
  const navigate = useNavigate();
  return (
    <Box>
      <Button
        variant="contained"
        sx={{
          mb: 4,
        }}
        onClick={() => {
          navigate("/create-post");
        }}
      >
        Create new post
      </Button>
      <Typography
        variant="h2"
        sx={{
          mb: 2,
        }}
      >
        Liste des posts
      </Typography>
      <PostList posts={posts} />
    </Box>
  );
};

export default PostPage;
