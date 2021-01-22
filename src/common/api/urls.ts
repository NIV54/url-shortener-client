import { ShortURL } from "../types/ShortURL.type";

import { headers } from "./headers";

const backend = process.env.REACT_APP_BACKEND_URL;
const endpoint = "api/url";
const backendUrl = backend + endpoint;

export const addUrl = ({ url, alias }: ShortURL) =>
  fetch(backendUrl, {
    method: "POST",
    credentials: "include",
    headers,
    body: JSON.stringify({
      url,
      alias: alias || undefined
    })
  });

export const getAllUrls = () => fetch(backendUrl, { credentials: "include", headers });

export const editUrl = ({ url, alias }: ShortURL) =>
  fetch(backendUrl, {
    method: "PATCH",
    credentials: "include",
    headers,
    body: JSON.stringify({
      url,
      alias
    })
  });

export const deleteUrl = (id: number) =>
  fetch(backendUrl + `/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers
  });
