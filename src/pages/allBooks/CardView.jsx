import { Rating } from "@smastrom/react-rating";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const CardView = ({containerVariants , filteredBooks, itemVariants}) => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {filteredBooks.map((book) => (
        <motion.div
        key={book?._id}
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          className="card relative  bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 "
        >
          {/* Image Section */}
          <figure className=" h-48 bg-primary/20 relative overflow-hidden">
            <img
              src={book?.imageUrl}
              alt={book?.bookName}
              className="w-28 h-44  object-cover rounded-md"
            />
            {/* Quantity Badge */}
            <div className="absolute top-4  border-none badge-sm font-medium right-2 badge ">
              {/* {quantity} available */}
              {book?.bookCategory}
            </div>
          </figure>

          <div className="card-body p-4  ">
            {/* Book Details */}

            <h2 className="card-title font-bold text-lg">{book?.bookName}</h2>

            <div className="space-y-2 flex-grow">
              <p className="text-sm">
                By: <span className="font-medium">{book?.authorName}</span>
              </p>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Rating
                    className="max-w-20"
                    readOnly
                    value={book?.bookRating}
                  />
                  <span className="text-sm">({book?.bookRating})</span>
                </div>

                {/* Quantity Badge */}
                <div
                  className={`h-full whitespace-nowrap   badge border-none badge-sm font-medium ${
                    book?.quantity > 0 ? "bg-primary text-white" : "text-error"
                  }`}
                >
                  {book?.quantity > 0
                    ? `${book?.quantity} Available`
                    : "Borrowed"}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="card-actions  mt-4">
              <Link
                to={`/updateBook/${book?._id}`}
                className="py-3 px-6 text-center w-full border rounded-full font-semibold hover:bg-primary hover:text-white transition-colors duration-300"
              >
                Update
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );

export default CardView;