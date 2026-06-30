import { useState, useId } from "react";
import type { QuestionAndAnswer } from "../types";
import iconMinus from "../assets/images/icon-minus.svg";
import iconPlus from "../assets/images/icon-plus.svg";

type AccordionItemProps = Omit<QuestionAndAnswer, "id">;

const AccordionItem = ({ question, answer }: AccordionItemProps) => {
  const [showMore, setShowMore] = useState(false);

  const baseId = useId();
  const buttonId = `${baseId}-button`;
  const panelId = `${baseId}-panel`;

  const handleToggle = (): void => setShowMore(!showMore);

  return (
    <div className="py-6 first:pt-0 last:pb-0 border-b border-(--purple-100) last:border-0">
      <h3>
        <button
          type="button"
          aria-expanded={showMore}
          aria-controls={panelId}
          id={buttonId}
          onClick={handleToggle}
          className="w-full flex justify-between items-start text-left text-base md:text-lg font-semibold text-(--purple-950) hover:text-(--violet-600) focus-visible:text-(--violet-600) focus-visible:outline-4 outline-offset-4 focus-visible:outline-dotted focus-visible:outline-(--violet-600)"
        >
          <span>{question}</span>
          <img
            src={showMore ? iconMinus : iconPlus}
            alt=""
            width="30"
            height="31"
          />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="text-sm md:text-base md:leading-relaxed font-normal text-(--purple-600)"
      >
        {showMore && <p className="pt-7 ">{answer}</p>}
      </div>
    </div>
  );
};

export default AccordionItem;
