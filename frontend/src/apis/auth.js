import axios from "axios";

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