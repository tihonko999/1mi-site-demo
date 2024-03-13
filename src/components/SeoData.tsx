import { WithMetaType } from "@/helpers/types";
import Head from "next/head";
import { FunctionComponent } from "react";

export type SeoItemType = {
  title: string;
  description?: string;
} & WithMetaType;

const SeoData: FunctionComponent<{ item: SeoItemType }> = ({ item }) => {
  const meta = item.meta_information_attributes;
  const title = meta?.title || item.title;
  const description = meta?.description || item.description;

  return (
    <Head>
      <title key="title">{title}</title>
      <meta key="og:title" property="og:title" content={title} />

      {description && (
        <>
          <meta
            key="og:description"
            property="og:description"
            content={description}
          />
          <meta key="description" name="description" content={description} />
        </>
      )}
    </Head>
  );
};

export default SeoData;
