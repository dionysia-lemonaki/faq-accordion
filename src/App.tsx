import Accordion from "./components/Accordion";
import iconStar from "./assets/images/icon-star.svg";
import data from "./data";

const App = () => {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center p-6">
      <div className="bg-white max-w-[37.5rem] flex flex-col gap-6 md:gap-8 p-6 md:p-10 rounded-2xl">
        <div className="flex gap-6 items-center">
          <img src={iconStar} alt="" width="40" height="40" />
          <h2 className="text-[2rem] md:text-[3.5rem] md:leading-[1.178] font-bold text-(--purple-950)">
            FAQs
          </h2>
        </div>
        <Accordion data={data} />
      </div>
    </main>
  );
};

export default App;
