import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/postsForm/PostForm";

const PostPageForm = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Button
        variant="outlined"
        sx={{
          mb: 4,
        }}
        onClick={() => {
          navigate("/");
        }}
      >
        Retour
      </Button>
      <Typography variant="h2" sx={{mb: 5}}>Créer une nouvelle annonce</Typography>
      <PostForm />
    </Box>
  );
};

export default PostPageForm;
