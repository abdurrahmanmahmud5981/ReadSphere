import Categories from "../../components/Categories";
import Features from "../../components/Features";
import Slider from "../../components/Slider";
import Statistics from "../../components/Statistics";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Banner Section */}
      <Slider />

      {/* Categories Section */}
      <Categories />
      {/* - Reading Statistics */}
      <Statistics />

      {/* - Features */}
     <Features/>
    </div>
  );
};

export default Home;
