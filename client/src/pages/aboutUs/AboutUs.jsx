
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import {
  FaPassport,
  FaGlobe,

  FaUserTie,

} from "react-icons/fa";

const AboutUs = () => {


  const fadeInUp = {
    initial: { opacity: 0, y: 80 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const statistics = [
    { value: "50K+", label: "Successful Applications" },
    { value: "100+", label: "Countries Covered" },
    { value: "98%", label: "Success Rate" },
    { value: "24/7", label: "Support Available" },
  ];

  const features = [
    {
      icon: <FaPassport className="w-12 h-12 text-primary" />,
      title: "Expert Visa Processing",
      description:
        "Streamlined application handling with real-time tracking and professional guidance.",
    },
    {
      icon: <FaGlobe className="w-12 h-12 text-primary" />,
      title: "Global Network",
      description:
        "Extensive partnerships with embassies and consulates worldwide.",
    },
    {
      icon: <FaUserTie className="w-12 h-12 text-primary" />,
      title: "Dedicated Support",
      description: "Personal visa consultants available 24/7 to guide you.",
    },
  ];

  return (
    <div className="min-h-screen ">
      <Helmet>
        <title>
          About Visa Navigator - Your Premium Visa Processing Partner
        </title>
      </Helmet>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-r from-primary/5 to-primary/10"
      >
        <div className="container mx-auto px-4 relative z-10">
          <motion.div {...fadeInUp} className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-6xl font-bold mb-6 text-primary">
              Transforming Visa Processing
            </h1>
            <p className="text-xl md:text-3xl  mb-8">
              Where Innovation Meets Excellence in Travel Documentation
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Statistics Section */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="container mx-auto px-4 py-20"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statistics.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-xl  border border-primary/20 hover:border-primary shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="mb-4">
                <span className="text-2xl font-bold text-primary">
                  {stat.value}
                </span>
              </div>
              <p className="">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Features */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="container mx-auto px-4 py-20"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-4xl font-bold text-center mb-16 text-primary"
        >
          Our Services
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className='rounded-xl p-8 shadow hover:shadow-2xl transition-all duration-300 border border-neutral-content/20 bg-base-100'
            >
              <motion.div transition={{ duration: 0.5 }} className="mb-6">
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-bold mb-4 text-primary">
                {feature.title}
              </h3>
              <p className="">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AboutUs;
