import { FunctionComponent } from "react";
import { MatterType } from "@/helpers/types";
import ContentHeaders from "./ContentHeaders";

type PropsType = {
  matter: MatterType;
};

const SingleMatter: FunctionComponent<PropsType> = ({ matter }) => {
  return (
    <>
      <div className="desktop-cols-3">
        <div>
          {matter.yandex_news_title && (
            <h2 className="mb-4 leading-tight font-bold text-lg lg:text-xl">
              {matter.yandex_news_title}
            </h2>
          )}
          <ContentHeaders items={matter.content_headers} />
          <h2 className="text-lg leading-[1.39] font-medium mb-8 lg:font-serif lg:text-[30px] lg:leading-tight lg:mb-[16px]">
            {matter.lead}
          </h2>
        </div>
      </div>
    </>
  );
};

export default SingleMatter;
