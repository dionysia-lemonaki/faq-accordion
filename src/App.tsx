import Accordion from "./components/Accordion";
import iconStar from "./assets/images/icon-star.svg";
import data from "./data";

const App = () => {
  return (
    <main>
      <div>
        <div>
          <img src={iconStar} alt="" width="40" height="40" />
          <h2>FAQs</h2>
        </div>
        <Accordion data={data} />
      </div>
    </main>
  );
};

export default App;
