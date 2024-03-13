import { createAppContext } from "./createContext";
import { PlatformType } from "./types";

export const [usePlatform, PlatformProvider] =
  createAppContext<PlatformType>("PlatformContext");
