import { Box, Button, Card, Container, Grid, Paper, Typography } from "@mui/material"
import Logo from "../assets/logoipsum-288.svg"
import { useNavigate } from "react-router-dom";

function NotFound() {

    const navigate = useNavigate();

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
                            <Typography variant="h1" fontSize={32} fontWeight={600} textAlign={"center"} >Not Found Page</Typography>
                        </Paper>
                    </Card>

                    <Button variant="outlined" sx={{ borderRadius: 2}} onClick={() => navigate("/")}>Back to Home</Button>

                </Grid>
            </Container>
        </Box>
    )
}

export default NotFound