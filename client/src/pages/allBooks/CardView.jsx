/* eslint-disable react/prop-types */
import { Rating } from "@smastrom/react-rating";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";

const CardView = ({ containerVariants, filteredBooks, itemVariants }) => {
  const { user } = useAuth();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {filteredBooks?.map((book) => (
        <motion.div
          key={book?._id}
          variants={itemVariants}
          className="card relative bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          {/* Image Section */}
          <figure className="h-48 bg-primary/20 relative overflow-hidden flex items-center justify-center">
            <img
              src={book?.imageUrl}
              alt={book?.bookName}
              className="w-28 h-44 object-cover rounded-md"
            />
            {/* Category Badge */}
            <div className="absolute top-4 right-2 badge badge-sm font-medium border-none">
              {book?.bookCategory}
            </div>
          </figure>

          {/* Book Details */}
          <div className="card-body p-4 flex flex-col">
            <h2 className="card-title font-bold text-lg">{book?.bookName}</h2>
            <p className="text-sm">
              By: <span className="font-medium">{book?.authorName}</span>
            </p>

            {/* Rating and Quantity */}
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-2">
                <Rating
                  className="max-w-20"
                  readOnly
                  value={book?.bookRating}
                />
                <span className="text-sm">({book?.bookRating})</span>
              </div>
              <div
                className={`badge badge-sm font-medium ${
                  book?.quantity > 0
                    ? "bg-primary text-white"
                    : "text-error bg-gray-200"
                }`}
              >
                {book?.quantity > 0
                  ? `${book?.quantity} Available`
                  : "Borrowed"}
              </div>
            </div>

            {/* Update Button */}
            <Link
              to={`/updateBook/${book?._id}`}
              className={`btn w-full mt-4 rounded-full font-semibold transition-colors duration-300 ${
                user?.email === book?.publisherEmail
                  ? "hover:bg-primary hover:text-white"
                  : "btn-disabled"
              }`}
            >
              Update
            </Link>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CardView;
