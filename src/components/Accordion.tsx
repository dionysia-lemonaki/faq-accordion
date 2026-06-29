import type { QuestionAndAnswer } from "../types";
import AccordionItem from "./AccordionItem";

interface AccordionProps {
  data: QuestionAndAnswer[];
}

const Accordion = ({ data }: AccordionProps) => {
  return (
    <div>
      {data.map((item) => (
        <AccordionItem
          key={item.id}
          question={item.question}
          answer={item.answer}
        />
      ))}
    </div>
  );
};

export default Accordion;
