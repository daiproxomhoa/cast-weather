import { some } from "./utils";

export const fetchData = async (
  url: string,
  method: "get" | "post" | "delete" | "put" = "get",
  body?: string | FormData,
  auth = true,
  fallbackResponse?: some, // if given, will not retry at all and return this
  getBlob = false // if given, response will return blob type instead of json data
) => {
  const controller = new AbortController();
  const { signal } = controller;

  setTimeout(() => {
    controller.abort();
  }, 30000);

  let res;
  try {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    res = await fetch(url, {
      method,
      body,
      headers,
      signal,
      cache: "no-store",
    });
  } catch (_) {}
  if (res !== undefined) {
    if (res.status === 200 && res.ok) {
      return !getBlob ? await res.json() : await res.blob();
    }
    return fallbackResponse;
  }
  if (fallbackResponse) {
    return fallbackResponse;
  }
};
