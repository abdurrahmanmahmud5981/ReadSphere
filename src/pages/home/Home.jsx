import { Helmet } from "react-helmet";
import Categories from "../../components/Categories";
import Features from "../../components/Features";
import Slider from "../../components/Slider";
import Statistics from "../../components/Statistics";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home - ReadSphere</title>
        <meta name="description" content="Home page of ReadSphere." />
        <meta property="og:title" content="Home - ReadSphere" />
      </Helmet>
      {/* Banner Section */}
      <Slider />

      {/* Categories Section */}
      <Categories />
      {/* - Reading Statistics */}
      <Statistics />

      {/* - Features */}
      <Features />
    </>
  );
};

export default Home;
