import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataContextProvider"
import { useState } from "react"
import { Alert, Box, Button, Card, Container, FormControl, Grid, Paper, TextField, Typography } from "@mui/material"
import { Formik, Form, Field } from 'formik'
import Logo from "../assets/logoipsum-288.svg"
import LoadingButton from '@mui/lab/LoadingButton';


function Register() {

    const { registerRequest } = useData()
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const initialValues = {
        name: '',
        email: '',
        password: '',
    };

    const handleSubmit = async(values) => {
        setIsSubmitting(true)
        const { name, email, password } = values
        try {
            await registerRequest(name, email, password)
            window.location.reload()
        } catch (error) {
            setShowAlert(true)
            setIsSubmitting(false)  
        }
    }

    return(
        <Box sx={{ backgroundColor: "#dfe4ea" }} >
            <Container fixed >
                <Grid 
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                paddingY={5}
                minHeight="100vh" >
                    <img src={Logo} width="250" alt="Logo" className="logo" />
                    <Card sx={{ 
                        width: {md: 500, xs: "100%"},
                        boxShadow: "none",
                        borderRadius: 4,
                        marginY: 5
                    }} >
                        <Paper sx={{ padding: {md: 5, xs: 4} }}>
                            <Typography variant="h1" fontSize={24} fontWeight={600} textAlign={"center"} >Register</Typography>
                            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                                <Form>

                                    <FormControl fullWidth margin="normal" variant="standard">
                                        <Field as={TextField} type="input" name="name" label="Name" variant="standard" autoComplete="on" fullWidth required />
                                    </FormControl>

                                    <FormControl fullWidth margin="normal" variant="standard">
                                        <Field as={TextField} type="email" name="email" label="Email" variant="standard" autoComplete="on" fullWidth required />
                                    </FormControl>

                                    <FormControl fullWidth margin="normal" variant="standard">
                                        <Field as={TextField} type="password" name="password" label="Password" variant="standard" autoComplete="on" fullWidth required />
                                    </FormControl>

                                    <LoadingButton
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    color="primary"
                                    loading={isSubmitting}
                                    disabled={isSubmitting}
                                    sx={{
                                        boxShadow: "none",
                                        fontWeight: 800,
                                        paddingY: 2,
                                        borderRadius: 2,
                                        marginTop: 2,
                                    }}
                                    >
                                        <span>Register</span>
                                    </LoadingButton>

                                    {showAlert && 
                                        <Alert variant="outlined" severity="error" sx={{ marginTop: 2 }}>
                                            User already exists
                                        </Alert>
                                    }
                                    
                                </Form>
                            </Formik>
                        </Paper>
                    </Card>

                    <Button variant="text" size="small" sx={{ borderRadius: 2}} onClick={() => navigate("/")}>Login</Button>

                </Grid>
            </Container>
        </Box>
    )
}

export default Register