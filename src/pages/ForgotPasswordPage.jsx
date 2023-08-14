import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataContextProvider"
import { useState } from "react"
import { Alert, Box, Button, Card, Container, FormControl, Grid, Paper, TextField, Typography } from "@mui/material"
import { Formik, Form, Field } from 'formik'
import Logo from "../assets/logoipsum-288.svg"


function ForgotPassword() {

    const { resetPasswordRequest } = useData()
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showAlert, setShowAlert] = useState({
        value: false,
        severity: "",
        message: ""
    });

    const initialValues = {
        email: '',
    };

    const handleSubmit = async(values) => {
        setIsSubmitting(true)
        const { email } = values
        try {
            await resetPasswordRequest(email)
            setShowAlert({
                value: true,
                severity: "success",
                message: "Recovery link sended to your email"
            })
        } catch (error) {
            setShowAlert({
                value: true,
                severity: "error",
                message: "Error on sending email, try again later"
            })
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
                            <Typography variant="h1" fontSize={24} fontWeight={600} textAlign={"center"} >Forgot Password</Typography>
                            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                                <Form>

                                    <FormControl fullWidth margin="normal" variant="standard">
                                        <Field as={TextField} type="email" name="email" label="Email" variant="standard" autoComplete="on" fullWidth required />
                                    </FormControl>

                                    <Button
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    color="primary"
                                    disabled={isSubmitting}
                                    sx={{
                                        boxShadow: "none",
                                        fontWeight: 800,
                                        paddingY: 2,
                                        borderRadius: 2,
                                        marginTop: 2,
                                    }}
                                    >
                                    {isSubmitting ? "Sended" : "Send"}
                                    </Button>

                                    {showAlert.value && 
                                        <Alert variant="outlined" severity={showAlert.severity} sx={{ marginTop: 2 }}>
                                            {showAlert.message}
                                        </Alert>
                                    }
                                    
                                </Form>
                            </Formik>
                        </Paper>
                    </Card>

                    <Button size="small" variant="text" sx={{ borderRadius: 2}} onClick={() => navigate("/")}>Back to Login</Button>

                </Grid>
            </Container>
        </Box>
    )
}

export default ForgotPassword