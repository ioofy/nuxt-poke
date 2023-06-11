import { encode } from "qss";

interface FetchOptions {
  body: FormData;
  json: object;
  mode: string;
  params: object;
  headers: object;
  isPrivate: boolean;
  local: boolean;
  manualUrl: boolean;
  version: number;
  isUsingException: boolean;
}

export class CoreAPI {
  setToken = ({ token }: { token: string }) => {
    // save credentials in cookie
  };

  private getToken = () => {};

  private intercept500Error = async (err: AnyType) => {
    if (err?.status === 500) {
      const customErr = {
        ...err,
        message: "Something went wrong on the server. Please try again later",
      };
      await Promise.reject(customErr);
    }
  };

  private intercept401Error = async (err: AnyType) => {
    if (err?.status !== 401) return;
  };

  private getUrl = (
    params: object | undefined,
    path: string,
    manualUrl: boolean,
    version = 2
  ) => {
    const search = params ? encode(params, "?") : "";

    // DEFAULT VERSION 1
    const API_VERSION = `/v${version}`;

    const url = manualUrl
      ? path
      : `https://pokeapi.co/api${API_VERSION}${path}${search}`;

    return url;
  };

  fetch = async <TResult = AnyType>(
    path = "/",
    method: "GET" | "POST" | "DELETE" | "PUT" | "PATCH" = "GET",
    {
      body,
      json,
      params,
      headers,
      isPrivate = false,
      manualUrl = false,
      version = 1,
    }: Partial<FetchOptions> = {}
  ): Promise<TResult> => {
    const url = this.getUrl(params, path, manualUrl, version);

    try {
      const resp = await fetch(url, {
        method,
        headers: {
          ...(json && { "content-type": "application/json" }),
          Accept: "application/json",
          ...headers,
        },
        body: body ?? (json ? JSON.stringify(json) : null),
        // credentials: 'include', // disabled
      });

      if (resp?.statusText === "No Content") {
        // bypass when it is csrf-cookie request
        return await Promise.resolve({} as TResult);
      }

      const jsonBody = await resp?.json();

      let responseBody = { ...jsonBody };

      if (method !== "GET") {
        if (!resp?.ok) return await Promise.reject(jsonBody);
      }

      if (Array.isArray(jsonBody)) {
        responseBody = [...jsonBody];
      }

      return await Promise.resolve(responseBody);
    } catch (err: AnyType) {
      // deal with ntwork error / CORS error
      if (err.name === "TypeError" && err.message === "Failed to fetch") {
        console.error("failed to get proper response from api server", err);
      }

      this.intercept500Error(err);
      this.intercept401Error(err);

      // get response
      if (typeof err.json === "function") {
        const data = await err.json();
        err.response = { data };
      }

      if (typeof err?.response?.json === "function") {
        const data = await err.response.json();
        err.response = { data };
      }

      return await Promise.reject(err);
    }
  };
}
