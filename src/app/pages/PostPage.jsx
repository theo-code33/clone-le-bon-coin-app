import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ModalPhoto from "../components/ModalPhoto";

const PostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    const fetchPost = async () => {
        fetch(`http://localhost:8000/api/posts/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setPost(data)
                console.log(data);
            })
            .catch((error) => {console.log(error)})
    }

    useEffect(() => {
        fetchPost();
    }, [])
    return (
        <>
            {post &&
                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={post.uploadFiles.length > 1 ? 8 : 12}>
                            <img src={post.uploadFiles[0].Location} alt="" style={{ width: "100%", height: "100%", objectFit: "cover"}}/>
                        </Grid>
                        {post.uploadFiles.length > 1 &&
                            <Grid item xs={4}>
                                {post.uploadFiles.map((file, index) => {
                                    if(index !== 0 && index < 3){
                                        return <img src={file.Location} alt="" style={{ width: "100%", objectFit: "cover"}}/> 
                                    }
                                })}
                            </Grid>
                        }
                    </Grid>
                    <ModalPhoto files={post.uploadFiles}/>
                    <Typography variant="h2" sx={{ mb: 2 }}>
                        {post.title}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        {post.content}
                    </Typography>
                </Box>
            }
        </>
     );
}
 
export default PostPage;