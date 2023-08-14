import { useParams } from "react-router-dom";
import { useData } from "../context/DataContextProvider"
import { Alert, Box, Button, Card, Container, FormControl, Grid, Paper, TextField, Typography } from "@mui/material"
import { Formik, Form, Field } from 'formik'
import Logo from "../assets/logoipsum-288.svg"


function ResetPassword() {

    const { changePasswordRequest } = useData()
    const token = useParams().token

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showAlert, setShowAlert] = useState({
        value: false,
        severity: "",
        message: ""
    });

    const initialValues = {
        password: '',
        confirmPassword: ''
    };

    const handleSubmit = async(values) => {
        setIsSubmitting(true)
        const { password, confirmPassword } = values

        if (password === confirmPassword) {
            try {
                await changePasswordRequest(token, password, confirmPassword)
                setShowAlert({
                    value: true,
                    severity: "success",
                    message: "Password recovered - try to log in again"
                })
            } catch (error) {
                setIsSubmitting(false)
                setShowAlert({
                    value: true,
                    severity: "error",
                    message: "Error in password recovery"
                })
            }
        } else {
            setIsSubmitting(false)
            setShowAlert({
                value: true,
                severity: "error",
                message: "Passwords do not match"
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
                            <Typography variant="h1" fontSize={24} fontWeight={600} textAlign={"center"} >Reset Password</Typography>
                            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                                <Form>

                                    <FormControl fullWidth margin="normal" variant="standard">
                                        <Field as={TextField} type="password" name="password" label="Password" variant="standard" autoComplete="on" fullWidth required />
                                    </FormControl>
                                    
                                    <FormControl fullWidth margin="normal" variant="standard">
                                        <Field as={TextField} type="password" name="confirmPassword" label="Confirm Password" variant="standard" autoComplete="on" fullWidth required />
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
                                    Change Password
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
                </Grid>
            </Container>
        </Box>
    )
}

export default ResetPassword