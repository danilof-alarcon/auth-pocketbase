import { useData } from "../context/DataContextProvider"
import { useEffect, useState } from "react";
import { Box, Button, Card, CircularProgress, Container, Grid, Paper, Typography } from "@mui/material";
import Logo from "../assets/logoipsum-288.svg"


function Dashboard() {

    const { logOutRequest, userDataRequest, userData } = useData()

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async() => {
            await userDataRequest();
            setIsLoading(false);
        }

        fetchData();
    }, [])

    async function handleLogOut() {
        await logOutRequest()
        window.location.reload()
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
                        {isLoading ? <CircularProgress size={60} /> : (
                        <>
                            <img src={Logo} width="250" alt="Logo" className="logo" />
                            <Card sx={{ 
                                width: {md: 500, xs: "100%"},
                                boxShadow: "none",
                                borderRadius: 4,
                                marginY: 5
                            }} >
                                <Paper sx={{ padding: {md: 5, xs: 4} }}>
                                    <Typography variant="h1" fontSize={24} fontWeight={600} textAlign={"center"} >Hello {userData?.name}</Typography>
                                </Paper>
                            </Card>

                            <Button onClick={handleLogOut} size="small">Log Out</Button>
                        </>
                        )}
                    </Grid>
                </Container>
        </Box>
    )
}

export default Dashboard
