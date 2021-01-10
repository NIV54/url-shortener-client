import { Login } from "../types/Login.type";
import { Register } from "../types/Register.type";
import { headers } from "./headers";

const backend = process.env.REACT_APP_BACKEND_URL;
const endpoint = "user";
const backendUrl = backend + endpoint;

export const registerUser = (registrationData: Register) =>
  fetch(backendUrl + "/register", {
    method: "POST",
    headers,
    body: JSON.stringify(registrationData)
  });

export const loginUser = (loginData: Login) =>
  fetch(backendUrl + "/login", {
    method: "POST",
    credentials: "include",
    headers,
    body: JSON.stringify(loginData)
  });
