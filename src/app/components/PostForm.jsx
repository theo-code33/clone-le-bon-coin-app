import { Box, Button, Step, StepLabel, Stepper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
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
  const steps = ["Titre, contenu et localisation", "Images"]
  const [activeStep, setActiveStep] = useState(0);
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
    setSuccess(false)
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    console.log(credentials);
  }, [credentials])

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
            <AutoCompleteInput setCredentials={setCredentials} />
          </>
        );
      case 1:
        return (
          <>
            <Dropzone setCredentials={setCredentials} />
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
            <AutoCompleteInput setCredentials={setCredentials} />
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
      formData.append('lng', credentials.location.lng);
      formData.append('address', credentials.location.address);
      credentials.uploadFiles.forEach((file, index) => {
        formData.append('files', credentials.uploadFiles[index]);
      })
      
      fetch('http://localhost:8000/api/posts', {
        method: 'POST',
        body: formData
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setSuccess(true)
        handleNext()
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

      {/* <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button> */}
      {/* {error && <span style={{color: "red"}}>Veuillez remplir tous les champs</span>}
      {success && <span style={{color: "green"}}>Post créer avec succés</span>} */}
    </Box>
  );
};

export default PostForm;
