import { ShortURLInput } from "../types/ShortURL.type";

import { authRedirect } from "./auth-redirect";
import { headers } from "./headers";

const backend = process.env.REACT_APP_BACKEND_URL;
const endpoint = "api/url";
const backendUrl = backend + endpoint;

export const queryKeys = {
  OWNED_SHORT_URLS: "OWNED_SHORT_URLS"
};

export const addUrl = authRedirect(({ url, alias }: ShortURLInput) =>
  fetch(backendUrl, {
    method: "POST",
    credentials: "include",
    headers,
    body: JSON.stringify({
      url,
      alias: alias || undefined
    })
  })
);

export const getAllUrls = authRedirect(() =>
  fetch(backendUrl, { credentials: "include", headers })
);

export const editUrl = authRedirect(({ url, alias }: ShortURLInput) =>
  fetch(backendUrl, {
    method: "PATCH",
    credentials: "include",
    headers,
    body: JSON.stringify({
      url,
      alias
    })
  })
);

export const deleteUrl = authRedirect((id: number) =>
  fetch(backendUrl + `/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers
  })
);
