import { Box } from "@mui/material";
import { useContext } from "react";
import { PostContext } from "../../../src/context/Post.context";
import PostCard from "./PostCard";

const PostList = () => {
  const {posts} = useContext(PostContext);
  return (
    <Box sx={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "flex-start",
      gap: 2,
      alignItems: "stretch",
    }}>
      {posts.map((post) => {
        return <PostCard key={post._id} post={post} />;
      })}
    </Box>
  );
};

export default PostList;
