
import { FaAccessibleIcon, FaRocket, FaLock } from "react-icons/fa";

const Features = () => {
    const features = [
        {
          title: "Easy Access",
          description: "Browse and borrow books with just a few clicks.",
          icon: <FaAccessibleIcon className="text-white text-4xl" />,
        },
        {
          title: "Quick Service",
          description: "Fast processing of borrowing requests.",
          icon: <FaRocket className="text-white text-4xl" />,
        },
        {
          title: "Secure System",
          description: "Safe and secure book management.",
          icon: <FaLock className="text-white text-4xl" />,
        },
      ]
  return (
    <section className="py-16">
      <div className="">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-12">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features?.map((item, index) => (
            <div
              key={index}
              className="card   bg-gradient-to-br from-purple-200/60 via-white/20 to-purple-400/40 shadow-lg hover:shadow-2xl transition duration-300 rounded-xl"
            >
              <div className="card-body items-center text-center space-y-4">
                <div className="rounded-full bg-primary p-5 shadow-lg">
                  {item.icon}
                </div>
                <h3 className="card-title text-xl font-bold text-gray-700">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
