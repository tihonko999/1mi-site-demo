import { createAppContext } from "./createContext";

import { DeviceType } from "./deviceDetector";

export const [useDevice, DeviceProvider] =
  createAppContext<DeviceType>("DeviceContext");
