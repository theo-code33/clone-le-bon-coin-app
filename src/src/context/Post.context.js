import { createContext, useEffect, useState } from "react";
import PostService from "../services/post.service";

const PostContext = createContext();

const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        PostService.getAll(setPosts);
    }, []);
    
    return (
        <PostContext.Provider value={{ posts, setPosts }}>
            {children}
        </PostContext.Provider>
    );
}

export {
    PostProvider,
    PostContext
};