import { Box, Button, Step, StepLabel, Stepper, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../../src/context/Post.context";
import PostService from "../../src/services/post.service";
import AutoCompleteInput from "./AutoCompleteInput";
import Dropzone from "./DropZone";

const UpdatePostForm = ({post}) => {
    const navigate = useNavigate();
    const {setPosts} = useContext(PostContext)
    const [credentials, setCredentials] = useState({
        title: "",
        content: "",
        location: "",
        uploadFiles: []
    })
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
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
    const handleDrop = (acceptedFiles) => {
        setCredentials({
            ...credentials,
            uploadFiles: acceptedFiles
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("tm credentials :", credentials)
        const formData = new FormData()
        if(credentials.title !== ""){
            formData.append("title", credentials.title)
        }
        if(credentials.content !== ""){
            formData.append("content", credentials.content)
        }
        if(credentials.location.number_address !== ""){
            formData.append('number_address', credentials.location.number_address);
        }
        if(credentials.location.route !== ""){
            formData.append('route', credentials.location.route);
        }
        if(credentials.location.postal_code !== ""){
            formData.append('postal_code', credentials.location.postal_code);
        }
        if(credentials.location.city !== ""){
            formData.append('city', credentials.location.city);
        }
        if(credentials.location.country !== ""){
            formData.append('country', credentials.location.country);
        }
        if(credentials.location.administrative_area_level_1 !== ""){
            formData.append('administrative_area_level_1', credentials.location.administrative_area_level_1);
        }
        if(credentials.location.administrative_area_level_2 !== ""){
            formData.append('administrative_area_level_2', credentials.location.administrative_area_level_2);
        }
        if(credentials.location.lat !== ""){
            formData.append('lat', credentials.location.lat);
        }
        if(credentials.location.lng !== ""){
            formData.append('lng', credentials.location.lng);
        }
        if(credentials.location.address !== ""){
            formData.append('address', credentials.location.address);
        }
        credentials.uploadFiles.forEach(file => {
            formData.append("uploadFiles", file)
        })
        PostService.update(post.id, formData, setPosts, handleNext, setError)
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
                  defaultValue={post.title}
                />
                <TextField
                  variant="outlined"
                  label="Contenu de l'annonce"
                  name="content"
                  multiline
                  rows={4}
                  onInput={handleChange}
                  defaultValue={post.content}
                />
                <AutoCompleteInput credentials={post} setCredentials={setCredentials} isPostForm={true}/>
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
                  defaultValue={post.title}
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
                <AutoCompleteInput credentials={post} setCredentials={setCredentials} isPostForm={true}/>
              </>
            );
        }
      }

    useEffect(() => {
        if(post !== null){
            setCredentials({
                ...credentials,
                title: post.title,
                content: post.content,
                location: post.location
            })
        }
    }, [post])

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
                Votre Annonce a bien été modifié !
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
}
 
export default UpdatePostForm;