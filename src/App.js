import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PostPageForm from "./app/pages/PostPageForm";
import Home from "./app/pages/Home";
import { Container } from "@mui/material";
import PostPage from "./app/pages/PostPage";
import UpdatePostPage from "./app/pages/UpdatePostPage";

function App() {
  return (
    <Container
      sx={{
        pt: 5,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/create-post" element={<PostPageForm />} />
          <Route path="/update-post/:id" element={<UpdatePostPage />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
