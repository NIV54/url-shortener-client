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
