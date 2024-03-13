import { NextPage, GetServerSideProps } from "next";
import SingleMatter from "@/components/SingleMatter";
import { getMatter } from "@/helpers/getInstance";
import { MatterType } from "@/helpers/types";
import SeoData from "@/components/SeoData";
import { usePlatform } from "@/helpers/platformContext";
import matterTagSeoData from "@/helpers/matterTagSeoData";
import Head from "next/head";

type PropsType = { matter: MatterType };

const MatterPage: NextPage<PropsType> = ({ matter }) => {
  const platform = usePlatform();

  return (
    <>
      <SeoData item={matterTagSeoData(matter, platform)} />
      <Head>
        <link rel="amphtml" href={`${platform.hostname}${matter.path}?amp=1`} />
      </Head>
      <SingleMatter matter={matter} />
    </>
  );
};

export default MatterPage;

export const getServerSideProps: GetServerSideProps<PropsType> = async ({
  resolvedUrl,
  req,
}) => {
  const result = await getMatter({ resolvedUrl, req });

  // not found
  if ("notFound" in result) return result;

  // redirect
  if ("redirectPath" in result) {
    return {
      redirect: {
        permanent: true,
        destination: result.redirectPath,
      },
    };
  }

  // matter
  return {
    props: {
      matter: result.data,
    },
  };
};
