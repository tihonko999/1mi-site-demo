import { getSelectorsByUserAgent } from "react-device-detect";

export type DeviceType = {
  isMobile: boolean;
  isDesktop: boolean;
};

export default function deviceDetector(ua: string): DeviceType {
  const { isMobileOnly: isMobile } = getSelectorsByUserAgent(ua) as {
    isMobileOnly: boolean;
  };
  return {
    isMobile,
    isDesktop: !isMobile,
  };
}
