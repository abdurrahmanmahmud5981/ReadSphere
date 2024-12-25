/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";

const SingleBook = ({
  book: {
    _id,
    imageUrl,
    bookName,
    authorName,
    quantity,
    bookRating,
    bookCategory,
  },
}) => {
  const isAvailable = quantity > 0;

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 relative">
      {/* Image Section */}
      <figure className="h-48 bg-primary/20 relative overflow-hidden flex items-center justify-center">
        <img
          src={imageUrl}
          alt={bookName || "Book Cover"}
          className="w-28 h-44 object-cover rounded-md"
        />
        <div className="badge badge-sm font-medium absolute top-4 right-2 border-none">
          {bookCategory}
        </div>
      </figure>

      {/* Card Body */}
      <div className="card-body p-4">
        <h2 className="card-title font-bold text-lg">{bookName}</h2>

        <div className="space-y-2">
          <p className="text-sm">
            By: <span className="font-medium">{authorName}</span>
          </p>

          {/* Rating and Quantity */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Rating className="max-w-20" readOnly value={bookRating} />
              <span className="text-sm">({bookRating})</span>
            </div>
            <div
              className={`badge badge-sm font-medium ${
                isAvailable ? "bg-primary text-white" : "text-error"
              }`}
            >
              {isAvailable ? `${quantity} Available` : "Borrowed"}
            </div>
          </div>
        </div>

        {/* Details Button */}
        <div className="card-actions mt-4">
          <Link
            to={`/bookDetails/${_id}`}
            className="btn  w-full py-2 px-6 rounded-full font-semibold hover:bg-primary hover:text-white transition-all duration-300"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
