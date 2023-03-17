import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { PostProvider } from "./src/context/Post.context";
import Header from "./app/layout/Header";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <PostProvider>
      <Header />
      <App />
    </PostProvider>    
);