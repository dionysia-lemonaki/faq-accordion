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
    <div>
      <h3>
        <button
          type="button"
          aria-expanded={showMore}
          aria-controls={panelId}
          id={buttonId}
          onClick={handleToggle}
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
      <div id={panelId} role="region" aria-labelledby={buttonId}>
        {showMore && <p>{answer}</p>}
      </div>
    </div>
  );
};

export default AccordionItem;
