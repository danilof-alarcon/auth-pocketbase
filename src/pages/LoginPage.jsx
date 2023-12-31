import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataContextProvider"
import { useState } from "react"
import { Alert, Box, Button, ButtonGroup, Card, Container, FormControl, Grid, Paper, TextField, Typography } from "@mui/material"
import { Formik, Form, Field } from 'formik'
import Logo from "../assets/logoipsum-288.svg"
import LoadingButton from '@mui/lab/LoadingButton';


function Login() {

    const { logInRequest } = useData()
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const initialValues = {
        email: '',
        password: '',
    };

    const handleSubmit = async(values) => {
        setIsSubmitting(true)
        const { email, password } = values
        try {
            await logInRequest(email, password)
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
                            <Typography variant="h1" fontSize={24} fontWeight={600} textAlign={"center"} >Login</Typography>
                            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                                <Form>

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
                                    <span>Login</span>
                                    </LoadingButton>

                                    {showAlert && 
                                        <Alert variant="outlined" severity="error" sx={{ marginTop: 2 }}>
                                            Incorrect email or password
                                        </Alert>
                                    }
                                    
                                </Form>
                            </Formik>
                        </Paper>
                    </Card>

                    <ButtonGroup
                    disableElevation
                    variant="text"
                    orientation="vertical"
                    aria-label="Disabled elevation buttons"
                    size="small"
                    >
                        <Button onClick={() => navigate("/register")}>Register</Button>
                        <Button onClick={() => navigate("/forgot-password")}>Forgot Password</Button>
                    </ButtonGroup>

                </Grid>
            </Container>
        </Box>
    )
}

export default Login