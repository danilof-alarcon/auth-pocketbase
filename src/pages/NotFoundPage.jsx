import { Box, Button, Container, Grid, Typography } from "@mui/material"
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
                    <Typography variant="h1" fontSize={32} fontWeight={600} textAlign={"center"} >Not Found Page</Typography>
                    <Button size="small" variant="outlined" sx={{ borderRadius: 2, marginTop: 3 }} onClick={() => navigate("/")}>Back to Home</Button>

                </Grid>
            </Container>
        </Box>
    )
}

export default NotFound