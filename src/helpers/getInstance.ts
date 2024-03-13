import { serverApi } from "@/helpers/api";
import { IncomingMessage } from "http";
import { MatterType, PlatformType } from "./types";
import getFromMemcached from "@/helpers/getFromMemcached";

type NotFoundType = { notFound: true };

type MatterReturnType =
  | { data: MatterType }
  | { redirectPath: string }
  | NotFoundType;

type MatterPropsType = {
  resolvedUrl: string;
  req: IncomingMessage;
};

export async function getMatter({
  resolvedUrl,
  req,
}: MatterPropsType): Promise<MatterReturnType> {
  let matter: MatterType;
  const matterStr = await getFromMemcached(
    `matter:${resolvedUrl}:platform:${req.headers.host}`
  );
  if (matterStr) {
    matter = JSON.parse(matterStr) as MatterType;
  } else {
    const response = await serverApi<MatterType | { redirect_path: string }>(
      `matters${resolvedUrl}`,
      {
        req,
      }
    );
    if ("notFound" in response) return response;
    if ("redirect_path" in response.data)
      return { redirectPath: response.data.redirect_path };
    matter = response.data;
  }
  return { data: matter };
}

type PlatformReturnType = { platform: PlatformType } | NotFoundType;

export async function getPlatform(
  req: IncomingMessage
): Promise<PlatformReturnType> {
  let platform: PlatformType;
  const platformStr = await getFromMemcached(`platform:${req.headers.host}`);
  if (platformStr) {
    platform = JSON.parse(platformStr) as PlatformType;
  } else {
    const response = await serverApi<PlatformType>("platform", { req });
    if ("notFound" in response) return response;
    platform = response.data;
  }
  return { platform };
}
