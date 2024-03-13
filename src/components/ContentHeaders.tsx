import { FunctionComponent } from "react";
import { ContentHeaderType } from "@/helpers/types";

const ContentHeaders: FunctionComponent<{ items: ContentHeaderType[] }> = ({
  items,
}) => {
  function scrollToElement(el: ContentHeaderType) {
    for (const element of document.querySelectorAll(el.type)) {
      if (element.innerHTML === el.text) {
        window.scroll({
          top: element.getBoundingClientRect().top + window.scrollY - 70,
          behavior: "smooth",
        });
        break;
      }
    }
  }

  return (
    <div className="mb-[32px] lg:mb-[16px]">
      {items
        .filter((el) => ["h2", "h3"].includes(el.type))
        .map((el, i) => (
          <div key={i} className="mb-4">
            <button
              className="text-lg hover:opacity-70 border-b border-dashed border-[#A09FAD] lg:text-base"
              onClick={() => scrollToElement(el)}
            >
              {el.text}
            </button>
          </div>
        ))}
    </div>
  );
};

export default ContentHeaders;
