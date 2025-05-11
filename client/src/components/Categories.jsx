import { Link } from "react-router-dom";
import category1 from "../assets/categories/category_1.jpg";
import category2 from "../assets/categories/category_2.jpg";
import category3 from "../assets/categories/category_3.jpg";
import category4 from "../assets/categories/category_4.jpg";

const Categories = () => {
  // Categories data
  const categories = [
    {
      title: "Fiction",
      image: category1,
      description: "Explore imaginary worlds",
    },
    {
      title: "Non-Fiction",
      image: category2,
      description: "Discover real-world knowledge",
    },
    {
      title: "Philosophical",
      image: category3,
      description: "Support your studies",
    },
    {
      title: "Children's Books",
      image: category4,
      description: "Perfect for young readers",
    },
  ];

  return (
    <section className="mx-auto py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Book Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-4 gap-6">
        {categories.map(({ title, image, description }) => (
          <div
            key={title}
            className="card border border-neutral-content/50 rounded-xl shadow hover:shadow-xl transition-shadow"
          >
            <figure>
              <img
                src={image}
                alt={title}
                className="w-full h-48 object-cover"
              />
            </figure>
            <div className="card-body p-4">
              <h3 className="card-title text-lg font-semibold">{title}</h3>
              <p className="text-sm ">{description}</p>
              <div className="card-actions mt-2">
                <Link className="w-full" to={`/categories/${title}`}>
                  <button className="btn btn-neutral w-full rounded-full">
                    Explore
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
