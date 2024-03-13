import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { IncomingMessage } from "http";

type ConfigType = AxiosRequestConfig & {
  req?: IncomingMessage;
};

function getApiSettings(req?: IncomingMessage): {
  domain: string;
  apiHost: string;
} {
  let domain: string;
  if (req) {
    domain = req.headers.host as string;
  } else {
    domain = location.host;
  }
  if (domain.includes("localhost") || process.env.NEXT_PUBLIC_SITE_DOMAIN) {
    domain =
      process.env.NEXT_PUBLIC_SITE_DOMAIN ?? "sandbox-ufa-bashinform.devmi.ru";
  }
  const apiHost = process.env.NEXT_PUBLIC_API_HOST ?? `https://${domain}/api`;
  return { domain, apiHost };
}

function send<T>(
  url: string,
  data: unknown = null,
  config: ConfigType = {},
  method: "get" | "post" = "get"
): Promise<AxiosResponse<T>> {
  const req = config.req;
  // axios doesnt need that
  delete config.req;
  const { domain, apiHost } = getApiSettings(req);
  url = url.startsWith("http") ? url : `${apiHost}/site/${url}`;

  const configWithHeades = { ...config, headers: { domain } };
  return method === "get"
    ? axios.get<T>(url, configWithHeades)
    : axios.post<T>(url, data, configWithHeades);
}

const api = {
  get: <T>(url: string, config?: ConfigType): Promise<AxiosResponse<T>> =>
    send<T>(url, null, config, "get"),
  post: <T>(
    url: string,
    data: unknown,
    config?: ConfigType
  ): Promise<AxiosResponse<T>> => send<T>(url, data, config, "post"),
  getApiSettings,
};

export default api;

export async function serverApi<T = unknown>(
  url: string,
  config: ConfigType
): Promise<{ data: T } | { notFound: true }> {
  try {
    const { data } = await api.get<T>(url, config);
    return { data };
  } catch (e) {
    // 404
    if (axios.isAxiosError(e) && e.response?.status === 404) {
      return { notFound: true };
    }
    // axios error or basic error
    if (axios.isAxiosError(e) || e instanceof Error) {
      console.error(e.message);
      throw new Error(e.message);
    }
    console.error(e);
    throw new Error("Неизвестная ошибка");
  }
}
