import { GetServerSideProps } from "next";
import { MatterType } from "@/helpers/types";
import { getMatter } from "@/helpers/getInstance";

export const getServerSideProps: GetServerSideProps<{
  matter: MatterType;
}> = async ({ resolvedUrl, req }) => {
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
