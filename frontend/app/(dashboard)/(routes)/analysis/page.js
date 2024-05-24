import AnalysisClient from "./components/main-client";
import Statistics from "./components/Statistics";

const Homepage = () => {
  return (
    <div className="flex-col m-4">
      <div className="flex-1 space-y-4 pt">
        <AnalysisClient />
      </div>
      <div>
        <Statistics />
      </div>
    </div>
  );
};

export default Homepage;
