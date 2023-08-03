import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataContextProvider"
import { useEffect } from "react";


function Dashboard() {

    // Auth

    const { auth } = useData()
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth) {
            navigate("/");
        }
    }, [auth, navigate]);

    if (!auth) {
        return null;
    }

    // Code

    return(
        <h1>Dashboard</h1>
    )
}

export default Dashboard