import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AutoCompleteInput from "./AutoCompleteInput";
import Dropzone from "./DropZone";


const PostForm = () => {
  const [credentials, setCredentials] = useState({
    title: "",
    content: "",
    location: "",
    uploadFiles: []
  })
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate();

  const handleChange = (e) => {
    setError(false)
    setSuccess(false)
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (credentials.title !== "" && credentials.content !== "" && credentials.location !== "" && credentials.uploadFiles.length !== 0) {
      formData.append('title', credentials.title);
      formData.append('content', credentials.content);
      formData.append('number_address', credentials.location.number_address);
      formData.append('route', credentials.location.route);
      formData.append('postal_code', credentials.location.postal_code);
      formData.append('city', credentials.location.city);
      formData.append('country', credentials.location.country);
      formData.append('administrative_area_level_1', credentials.location.administrative_area_level_1);
      formData.append('administrative_area_level_2', credentials.location.administrative_area_level_2);
      formData.append('lat', credentials.location.lat);
      formData.append('lng', credentials.location.lng);
      formData.append('address', credentials.location.address);
      credentials.uploadFiles.forEach((file, index) => {
        formData.append('files', setCredentials.uploadFiles[index]);
      })
      
      fetch('http://localhost:8000/api/posts', {
        method: 'POST',
        body: formData
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setSuccess(true)
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        setError(true)
        console.log(err)
      })
    }else{
      setError(true)
    }
  }

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        ".MuiInputBase-root, .MuiButton-root": {
          mb: 2,
        },
      }}
      onSubmit={(e) => {e.preventDefault()}}
    >
      <TextField variant="outlined" label="Titre de l'annonce" name="title" onInput={handleChange}/>
      <TextField
        variant="outlined"
        label="Contenu de l'annonce"
        name="content"
        multiline
        rows={4}
        onInput={handleChange}
      />
      <AutoCompleteInput setCredentials={setCredentials} />
      <Dropzone setCredentials={setCredentials} />

      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
      {error && <span style={{color: "red"}}>Veuillez remplir tous les champs</span>}
      {success && <span style={{color: "green"}}>Post créer avec succés</span>}
    </Box>
  );
};

export default PostForm;
