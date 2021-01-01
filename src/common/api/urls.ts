import { ShortURL } from "../types/ShortURL.type";
import { headers } from "./headers";

const backend = process.env.REACT_APP_BACKEND_URL;
const endpoint = "url";
const backendUrl = backend + endpoint;

export const addUrl = ({ url, alias }: ShortURL) =>
  fetch(backendUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({
      url,
      alias: alias || undefined
    })
  });

export const getAllUrls = () => fetch(backendUrl, { headers });

export const editUrl = ({ url, alias }: ShortURL) =>
  fetch(backendUrl, {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      url,
      alias
    })
  });

export const deleteUrl = (id: number) =>
  fetch(backendUrl + `/${id}`, {
    method: "DELETE",
    headers
  });
