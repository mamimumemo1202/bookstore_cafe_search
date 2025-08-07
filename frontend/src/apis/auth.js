import axios from "axios";
import { getAuthInfo } from "./index";

export const signUp = async({email, password, passwordConfirmation}) =>{
    return axios.post("/api/v1/auth", {
        email,
        password,
        password_confirmation: passwordConfirmation
    })
}

export const signIp = async({email, password}) =>{
    return axios.post("/api/v1/auth/sign_in", {
        email,
        password
    })
}

export const validateToken = async() =>{
    const authInfo = getAuthInfo();

    const res = await axios.get("/api/v1/auth/validate_token",{
        headers:{
        "access-token": authInfo["access-token"],
        "client": authInfo["client"],
        "uid": authInfo["uid"]}
    });

    return res
    
}