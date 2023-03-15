import { Box, Button, TextField } from "@mui/material";
import { useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import AutoCompleteInput from "./AutoCompleteInput";
import Dropzone from "./DropZone";


const PostForm = () => {
  const [credentials, setCredentials] = useState({
    title: "",
    content: "",
    location: "",
  })
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate();

  const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };
  
  const focusedStyle = {
    borderColor: '#2196f3'
  };
  
  const acceptStyle = {
    borderColor: '#00e676'
  };
  
  const rejectStyle = {
    borderColor: '#ff1744'
  };
  
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    acceptedFiles
  } = useDropzone({accept: {'image/*': []}});

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path}
    </li>
  ));

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
    console.log("acceptedFiles: ", acceptedFiles);
    if (credentials.title !== "" && credentials.content !== "" && credentials.location !== "" && acceptedFiles.length !== 0) {
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
      acceptedFiles.forEach((file, index) => {
        formData.append('files', acceptedFiles[index]);
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
      <TextField variant="outlined" label="title" name="title" onInput={handleChange}/>
      <TextField
        variant="outlined"
        label="content"
        name="content"
        multiline
        rows={4}
        onInput={handleChange}
      />
      <AutoCompleteInput setCredentials={setCredentials} />

      {/* <div className="container" style={{marginBottom: "10px"}}>
        <div {...getRootProps({style})}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        {files.length > 0 &&
          <aside>
            <h4>Files</h4>
            <ul>{files}</ul>
          </aside>
        }
      </div> */}
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
