import { Box, Button, Step, StepLabel, Stepper, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../../src/context/Post.context";
import PostService from "../../src/services/post.service";
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
  const [activeStep, setActiveStep] = useState(0);
  
  const navigate = useNavigate();
  const {setPosts} = useContext(PostContext)
  
  const steps = ["Titre, contenu et localisation", "Images"]

  const isStepFailed = (step) => {
    return step === 1 && error;
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (e) => {
    setError(false)
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const formStep = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <TextField 
              variant="outlined"
              label="Titre de l'annonce"
              name="title"
              onInput={handleChange}
              defaultValue={credentials.title}
            />
            <TextField
              variant="outlined"
              label="Contenu de l'annonce"
              name="content"
              multiline
              rows={4}
              onInput={handleChange}
              defaultValue={credentials.content}
            />
            <AutoCompleteInput credentials={credentials} setCredentials={setCredentials} isPostForm={true}/>
          </>
        );
      case 1:
        return (
          <>
            <Dropzone setCredentials={setCredentials} credentials={credentials}/>
          </>
        );
      default:
        return (
          <>
            <TextField 
              variant="outlined"
              label="Titre de l'annonce"
              name="title"
              onInput={handleChange}
              defaultValue={credentials.title}
            />
            <TextField
              variant="outlined"
              label="Contenu de l'annonce"
              name="content"
              multiline
              rows={4}
              onInput={handleChange}
              defaultValue={credentials.content}
            />
            <AutoCompleteInput setCredentials={setCredentials} isPostForm={true}/>
          </>
        );
    }
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
      console.log("tm credentials :", credentials)
      formData.append('lng', credentials.location.lng);
      formData.append('address', credentials.location.address);
      credentials.uploadFiles.forEach((file) => {
        formData.append('files', file);
      })
      PostService.create(formData, setPosts, handleNext, setError)
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
      <Stepper activeStep={activeStep} sx={{mb: 4}}>
        {steps.map((label, index) => {
          const labelProps = {};
          if (isStepFailed(index)) {
            labelProps.optional = (
              <Typography variant="caption" color="error">
                Une erreur est survenue
              </Typography>
            );
            labelProps.error = true;
          }
          return (
            <Step key={label}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            Votre Annonce a bien été ajoutée !
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={() => {navigate('/')}}>Page D'accueil</Button>
          </Box>
        </>
      ) : (
        <>
          {formStep(activeStep)}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />

            <Button onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}>
              {activeStep === steps.length - 1 ? 'Ajouter' : 'Suivant'}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default PostForm;
