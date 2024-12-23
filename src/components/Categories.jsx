import { Link } from "react-router-dom";
import categor1 from "../assets/categories/category_1.jpeg";
import categor2 from "../assets/categories/category_2.jpeg";
import categor3 from "../assets/categories/category_3.jpeg";
import categor4 from "../assets/categories/category_4.jpeg";
const Categories = () => {
  // Categories data
  const categories = [
    {
      title: "Fiction",
      image: categor1,
      description: "Explore imaginary worlds",
    },
    {
      title: "Non-Fiction",
      image: categor2,
      description: "Discover real-world knowledge",
    },
    {
      title: "Philosophical",
      image: categor3,
      description: "Support your studies",
    },
    {
      title: "Children's Books",
      image: categor4,
      description: "Perfect for young readers",
    },
  ];

  return (
    <div>
      <section className=" mx-auto py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Book Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="card rounded-xl   bg-gradient-to-br from-purple-200/60 via-white/30 to-purple-400/40 shadow-xl hover:shadow-2xl transition-shadow"
            >
              <figure>
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="card-body p-4">
                <h3 className="card-title">{category.title}</h3>
                <p>{category.description}</p>
                <div className="card-actions mt-2 ">
                  <Link className="w-full" to={`/categories/${category.title}`}>
                  <button className="btn btn-neutral w-full rounded-full ">Explore</button></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Categories;
