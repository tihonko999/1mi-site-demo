export type WithMetaType = {
  meta_information_attributes?: {
    title: string;
    description: string;
    keywords: string;
  };
};

export type ContentHeaderType = { type: "h2" | "h3" | "h4"; text: string };

export type MatterType = {
  id: number;
  title: string;
  yandex_news_title: string;
  highlighted_title: string;
  lead: string;
  path: string;
  text: string;
  kind: "article" | "tilda";
  kind_path: string;
  rubric_title: string;
  rubric_name: string;
  rubric_path: string;
  type: string;
  content_headers: ContentHeaderType[];
} & WithMetaType;

export type PlatformType = {
  id: number;
  title: string;
  color: string;
  domain: string;
  hostname: string;
  favicon_url: string;
  logo_url: string;
  yandex_news_url: string;
  google_news_url: string;
  analytics: {
    yandex_metrika_id: string;
    google_analytics_id: string;
    liveinternet_counter_id: string;
    yandex_verification: string;
    google_verification: string;
    onthe_io_id: string;
  };
};
