/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
const SingleBook = ({ book }) => {
  const {
    _id,
    imageUrl,
    bookName,
    authorName,
    quantity,
    bookRating,
    bookCategory,
  } = book;

  return (
    <div className="card relative  bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 ">
      {/* Image Section */}
      <figure className=" h-48 bg-primary/20 relative overflow-hidden">
        <img
          src={imageUrl}
          alt={bookName}
          className="w-28 h-44  object-cover rounded-md"
        />
        {/* Quantity Badge */}
        <div className="absolute top-4  border-none badge-sm font-medium right-2 badge ">
          {/* {quantity} available */}
          {bookCategory}
        </div>
      </figure>

      <div className="card-body p-4 ">
        {/* Book Details */}

        <h2 className="card-title font-bold text-lg">{bookName}</h2>

        <div className="space-y-2">
          <p className="text-sm">
            By: <span className="font-medium">{authorName}</span>
          </p>

          {/* Rating */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Rating className="max-w-20" readOnly value={bookRating} />
              <span className="text-sm">({bookRating})</span>
            </div>

            {/* Quantity Badge */}
            <div
              className={`   badge border-none badge-sm font-medium ${
                quantity > 0 ? "bg-primary text-white" : "text-error"
              }`}
            >
              {quantity > 0 ? `${quantity} Available` : "Borrowed"}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="card-actions  mt-4">
          <Link
            to={`/book/${_id}`}
            className="py-3 px-6 text-center w-full border rounded-full font-semibold hover:bg-primary hover:text-white transition-colors duration-300"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
