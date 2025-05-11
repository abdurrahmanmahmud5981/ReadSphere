import { Helmet } from "react-helmet";
import Categories from "../../components/Categories";
import Features from "../../components/Features";
import Slider from "../../components/Slider";
import Statistics from "../../components/Statistics";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/LoadingSpinner";
import {
  FaChartLine,
  FaClock,
  FaEnvelope,
  FaHandshake,
  FaMapMarkerAlt,
  FaMedal,
  FaPhoneAlt,
  FaUsers,
} from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
const Home = () => {
  const { loader } = useAuth();
  const [activeTab, setActiveTab] = useState("vision");
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
    transition: { duration: 0.6 },
  };

  const tabContent = {
    vision: {
      title: "Our Vision",
      content:
        "To become the world's most trusted visa processing platform, making international travel accessible to everyone through innovation and excellence.",
      icon: <FaChartLine className="w-8 h-8 text-primary" />,
    },
    mission: {
      title: "Our Mission",
      content:
        "To simplify the visa application process through cutting-edge technology and unparalleled customer service, ensuring a smooth journey for every traveler.",
      icon: <FaUsers className="w-8 h-8 text-secondary" />,
    },
    values: {
      title: "Our Values",
      content:
        "Integrity, Innovation, and Customer-First approach guide every decision we make and service we provide.",
      icon: <FaMedal className="w-8 h-8 text-success" />,
    },
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
            <motion.div
              key={index}
              variants={fadeInUp}
              className="text-center bg-base-100 p-3 rounded-xl border"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{value.title}</h3>
              <p className="text-base-content/70">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Interactive Tabs */}
      <motion.div className=" py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-12">
            {Object.keys(tabContent).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 mx-2 rounded-full transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-primary text-white shadow-lg"
                    : "bg-base-200  hover:bg-primary/10"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto text-center flex flex-col justify-center items-center border p-4 rounded-xl"
            >
              <div className="mb-6 ">{tabContent[activeTab].icon}</div>
              <h2 className="text-3xl font-bold mb-6 ">
                {tabContent[activeTab].title}
              </h2>
              <p className="text-xl text-base-content/70">
                {tabContent[activeTab].content}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Contact Section */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="bg-primary/5 py-20"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeInUp}
            className="text-4xl font-bold text-center mb-16 text-primary"
          >
            Get in Touch
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: <FaPhoneAlt />,
                content: "+1 (234) 567-890",
                href: "tel:+1234567890",
              },
              {
                icon: <FaEnvelope />,
                content: "contact@visanavigator.com",
                href: "mailto:contact@visanavigator.com",
              },
              {
                icon: <FaMapMarkerAlt />,
                content: "123 Business Ave, Suite 100",
              },
            ].map((item, index) => (
              <motion.a
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                href={item.href}
                className="flex flex-col items-center p-6  rounded-xl border shadow hover:shadow-xl transition-all cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-primary">{item.icon}</span>
                </div>
                <span className="">{item.content}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Home;
