import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PostList from "../components/postsListing/PostList";
import SearchForm from "../components/SearchForm";

const PostPage = () => {
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
      <SearchForm />
      <Typography
        variant="h2"
        sx={{
          mb: 2,
        }}
      >
        Liste des posts
      </Typography>
      <PostList/>
    </Box>
  );
};

export default PostPage;
