import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UpdatePostForm from "../components/UpdatePostForm";

const UpdatePostPage = () => {
    const [post, setPost] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    const fetchPost = async () => {
        fetch(`${process.env.REACT_APP_API_URL}/posts/${id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setPost(data)
            })
            .catch((error) => {console.log(error)})
    }

    useEffect(() => {
        fetchPost();
    }, []) 
    useEffect(() => {
        if(post !== null){
            console.log("post => ", post);
        }
    }, [post])
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
            <Typography variant="h1">UpdatePostPage</Typography>
            {
                post !== null
                ? <UpdatePostForm post={post}/>
                : <p>Chargement...</p>
            }
        </Box>
     );
}
 
export default UpdatePostPage;