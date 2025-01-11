
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { FaPassport, FaGlobe,  FaUserTie } from 'react-icons/fa';

const AboutUs = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const statistics = [
    { value: "50K+", label: "Successful Applications" },
    { value: "100+", label: "Countries Covered" },
    { value: "98%", label: "Success Rate" },
    { value: "24/7", label: "Support Available" }
  ];

  const features = [
    {
      icon: <FaPassport className="w-12 h-12 text-primary" />,
      title: "Expert Visa Processing",
      description: "Streamlined application handling with real-time tracking and professional guidance throughout your journey."
    },
    {
      icon: <FaGlobe className="w-12 h-12 text-primary" />,
      title: "Global Network",
      description: "Extensive partnerships with embassies and consulates worldwide, ensuring smooth processing across borders."
    },
    {
      icon: <FaUserTie className="w-12 h-12 text-primary" />,
      title: "Dedicated Support",
      description: "Personal visa consultants available to guide you through requirements and documentation."
    }
  ];



  return (
    <div className="min-h-screen bg-base-100">
      <Helmet>
        <title>About Visa Navigator - Your Trusted Visa Processing Partner</title>
        <meta name="description" content="Learn about Visa Navigator's professional visa processing services, global network, and commitment to excellence in international travel documentation." />
      </Helmet>

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-primary/5 py-20"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            {...fadeInUp}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">
              Simplifying Global Mobility
            </h1>
            <p className="text-xl md:text-2xl text-base-content/80 mb-8">
              Your premiere destination for seamless visa processing and expert travel documentation services.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Statistics Section */}
      <motion.div 
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="container mx-auto px-4 py-16"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statistics.map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="text-center"
            >
              <h3 className="text-4xl font-bold text-primary mb-2">{stat.value}</h3>
              <p className="text-base-content/70">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div 
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="bg-base-200 py-20"
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            Why Choose Visa Navigator?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-base-100 rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-base-content/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

   

      {/* Mission Statement */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="bg-primary/5 py-20"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Mission</h2>
            <p className="text-lg md:text-xl text-base-content/80 leading-relaxed">
              To revolutionize the visa application process through innovative technology and 
              exceptional service. We're committed to making international travel documentation 
              accessible, efficient, and stress-free for individuals and businesses worldwide.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutUs;