import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";

const PostPageForm = () => {
  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: "",
    content: "",
  });
  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (post.title !== "" && post.content !== "") {
      fetch("http://localhost:8000/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      })
        .then((res) => res.json())

        .then((data) => console.log(data));
    }
  };

  return (
    <Box>
      <Button
        variant="outlined"
        sx={{
          mb: 4,
        }}
        onClick={(e) => {
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
