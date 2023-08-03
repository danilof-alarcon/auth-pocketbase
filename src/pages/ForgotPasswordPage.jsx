import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataContextProvider"
import { useEffect } from "react";


function ForgotPassword() {

    // Auth

    const { auth } = useData()
    const navigate = useNavigate();

    useEffect(() => {
        if (auth) {
            navigate("/dashboard");
        }
    }, [auth, navigate]);

    if (auth) {
        return null;
    }

    // Code

    return(
        <h1>ForgotPassword</h1>
    )
}

export default ForgotPassword