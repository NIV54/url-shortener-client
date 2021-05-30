import { toast } from "react-toastify";

import * as routes from "../../common/routes";
import { ServerError } from "../types/ServerError.type";

import * as serverErrorCodes from "./server-error-codes";

export const authRedirect = <T extends (...args: any[]) => Promise<Response>>(serverCall: T) =>
  (async (...args: Parameters<T>) => {
    const response = await serverCall(...args);

    if (response.ok) {
      return response;
    }

    const clone = response.clone();
    const result: ServerError = await clone.json();
    if (result.code === serverErrorCodes.GENERAL_AUTH_ERROR) {
      toast.error("Authentication error. Please login"); // FIXME: this does not show on screen
      window.location.replace(routes.LOGIN);
    } else {
      return response;
    }
  }) as any as (...args: Parameters<T>) => Promise<Response>;
