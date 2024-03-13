import { SeoItemType } from "@/components/SeoData";
import { MatterType, PlatformType } from "./types";

export default function matterTagSeoData(
  item: MatterType,
  platform: PlatformType
): SeoItemType {
  const title = `${item.title} - ${platform.title}`;
  return {
    title,
    description: `${item.lead} Подробнее на сайте издания ${platform.title}`,
    meta_information_attributes: item.meta_information_attributes,
  };
}
