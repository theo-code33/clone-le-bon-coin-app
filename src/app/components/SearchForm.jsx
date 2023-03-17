import { Box, Button } from "@mui/material";
import { useContext, useState } from "react";
import { PostContext } from "../../src/context/Post.context";
import PostService from "../../src/services/post.service";
import AutoCompleteInput from "./AutoCompleteInput";

const SearchForm = () => {
    const [credentials, setCredentials] = useState({
        location: "",
    })
    const { setPosts } = useContext(PostContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        PostService.getByLocation(credentials.location.lat, credentials.location.lng, setPosts)
    }
    const handleGetAll = (e) => {
        e.preventDefault();
        PostService.getAll(setPosts)
    }
    return ( 
        <Box component="form" onSubmit={(e) => e.preventDefault()} sx={{display: 'flex', alignItems: "center"}}>
            <AutoCompleteInput setCredentials={setCredentials} credentials={credentials}/>
            <Button variant="contained" onClick={handleSubmit} sx={{ml: 2}}>Rechercher</Button>
            <Button variant="contained" onClick={handleGetAll} sx={{ml: 2}}>Voir Tout</Button>
        </Box>
     );
}
 
export default SearchForm;