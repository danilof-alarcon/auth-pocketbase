import { useContext, useState } from "react";
import { DataContex } from "./DataContext";
import { pb } from "../lib/pocketbase.api";

export const useData = () => {
    const context = useContext(DataContex)
    if (!context) {
        throw new Error("useTasks must be used within a TaskContextProvider");
    }
    return context;
}

export const DataContextProvider = ({children}) => {

    // Auth Functions

    const auth = pb.authStore.isValid
    const [userData, setUserData] = useState([])

    const logInRequest = async(email, password) => {
        const authData = await pb.collection('users').authWithPassword(`${email}`, `${password}`);
        return authData
    }

    const registerRequest = async(name, email, password) => {
        const data = {
            "username": "",
            "email": email,
            "emailVisibility": true,
            "password": password,
            "passwordConfirm": password,
            "name": name
        };
    
        const createUser = await pb.collection('users').create(data);
        const logUser = await logInRequest(email, password)
        return (createUser, logUser);
    }

    const LogOutRequest = async() => {
        pb.authStore.clear();
    }

    // App Functions

    const UserDataRequest = async() => {
        pb.autoCancellation(false);

        const userData = await pb.collection('users').getOne(`${pb.authStore.model.id}`);
        setUserData(userData)
    }

    return (
        <DataContex.Provider value={{ auth, userData, logInRequest, registerRequest, UserDataRequest, LogOutRequest }}>
            {children}
        </DataContex.Provider>
    )
}