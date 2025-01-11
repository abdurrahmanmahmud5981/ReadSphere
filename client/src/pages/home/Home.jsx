import { Helmet } from "react-helmet";
import Categories from "../../components/Categories";
import Features from "../../components/Features";
import Slider from "../../components/Slider";
import Statistics from "../../components/Statistics";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/LoadingSpinner";
import { FaChartLine, FaClock, FaHandshake } from "react-icons/fa";
import { motion } from "framer-motion";

const Home = () => {
  const { loader } = useAuth();
  if (loader) return <LoadingSpinner />;

  const values = [
    {
      icon: <FaHandshake className="w-8 h-8 text-primary" />,
      title: "Trust",
      description:
        "Building lasting relationships through transparency and reliability.",
    },
    {
      icon: <FaChartLine className="w-8 h-8 text-primary" />,
      title: "Excellence",
      description:
        "Maintaining the highest standards in visa processing services.",
    },
    {
      icon: <FaClock className="w-8 h-8 text-primary" />,
      title: "Efficiency",
      description: "Optimizing processes to save your valuable time.",
    },
  ];
  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };
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

      {/* Values Section */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="container mx-auto px-4 py-20"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          Our Core Values
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div key={index} variants={fadeInUp} className="text-center bg-base-100 p-3 rounded-xl border">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{value.title}</h3>
              <p className="text-base-content/70">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default Home;
