import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import PostService from '../../src/services/post.service';
import { set } from 'mongoose';
import { useContext } from 'react';
import { PostContext } from '../../src/context/Post.context';

const PostCard = ({ post }) => {
    const navigate = useNavigate();
    const {setPosts} = useContext(PostContext)
    const handleClick = () => {
        navigate(`/post/${post._id}`);
    }
    const handleModify = () => {
        navigate(`/update-post/${post._id}`);
    }
    const handleDelete = () => {
        PostService.delete(post._id, setPosts)
    }
    return (
        <Card sx={{ maxWidth: 345 }}>
            {post.uploadFiles[0] &&
            <CardMedia
                sx={{ height: 140 }}
                image={post.uploadFiles[0].Location}
            />
            }
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {post.content}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" variant='contained' onClick={handleClick}>Voir l'annonce</Button>
                <Button size="small" variant='contained' onClick={handleModify}>Modifier l'annonce</Button>
            </CardActions>
            <CardActions>
                <Button size="large" variant='contained' color='error' onClick={handleDelete} sx={{width: "100%"}}>Supprimer l'annonce</Button>
            </CardActions>
        </Card>
    );
}

export default PostCard;