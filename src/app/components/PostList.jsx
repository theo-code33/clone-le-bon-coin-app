import { Box } from "@mui/material";
import PostCard from "./PostCard";

const PostList = ({posts}) => {
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
