// BookDetails.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import { axiosSecure } from "../../hooks/useAxiosSecure";

const BookDetails = () => {
  const { id } = useParams();

  const [showModal, setShowModal] = useState(false);

  const [book, setBook] = useState({});

  // Fetch book details from API
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data } = await axiosSecure.get(`/books/book/${id}`);
        console.log(data);
        setBook(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, [id]);

  return (
    <div className="relative">
      {/* Book Details Card */}
      <div className="card md:card-side bg-base-100 shadow-xl max-w-screen-lg mx-auto my-8">
        {/* Book Image */}
        <figure className="md:w-1/2 p-6 bg-purple-100">
          <img
            src={book?.imageUrl}
            alt={book?.bookName}
            className="rounded-xl h-44 md:h-[500px] object-fill"
          />
        </figure>

        {/* Book Information */}
        <div className="card-body md:w-2/3">
          <h2 className="card-title text-3xl font-bold">{book?.bookName}</h2>
          <p className="text-xl">by {book.authorName}</p>

          {/* Rating and Category */}
          <div className="flex flex-wrap gap-4 items-center my-4">
            <div className="flex items-center gap-2">
              <Rating className="max-w-20" readOnly value={book.bookRating} />
              <span>({book.bookRating})</span>
            </div>
            <div className="badge p-3 font-medium border-primary text-primary">
              {book?.bookCategory}
            </div>
            <div
              className={`badge ${
                book.quantity > 0
                  ? "font-medium p-3 text-white bg-primary"
                  : "badge-error"
              }`}
            >
              {book.quantity} copies available
            </div>
          </div>

          {/* Book Description */}
          <div className="my-4">
            <h3 className="font-bold text-lg">Description</h3>
            <p>
              {book?.bookContent} {book?.shortDescription}
            </p>
          </div>

          {/* Book Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-4">
            <div>
              <span className="font-semibold">Pages:</span>
              <p>{book.pages}</p>
            </div>

            <div>
              <span className="font-semibold">Language:</span>
              <p>{book.language}</p>
            </div>
            <div>
              <span className="font-semibold">Publisher:</span>
              <p>{book.publisher}</p>
            </div>
          </div>

          {/* Borrow Button */}
          <div className="card-actions justify-end mt-6">
            <button
              className={`btn py-3 px-6 text-center w-full border rounded-full font-semibold hover:bg-primary hover:text-white transition-colors duration-300 ${
                book.quantity === 0 ? "btn-disabled" : ""
              }`}
              onClick={() => document.getElementById("my_modal_5").showModal()}
              // onClick={() => setShowModal(true)}
              disabled={book.quantity === 0}
            >
              {book.quantity > 0 ? "Borrow Now" : "Book Unavailable"}
            </button>
          </div>
        </div>
      </div>

     

      {/* Borrow Modal */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle ">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Borrow Book</h3>
          <form className="space-y-4">
            {/* Name Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" disabled className="input input-bordered" />
            </div>

            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" disabled className="input input-bordered" />
            </div>

            {/* Borrow Date Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Borrow Date</span>
              </label>
              <input type="date" disabled className="input input-bordered" />
            </div>

            {/* Return Date Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Return Date</span>
              </label>
              <input
                type="date"
                required
                // min={minReturnDate.toISOString().split("T")[0]}
                // max={maxReturnDate.toISOString().split("T")[0]}
                // value={borrowForm.returnDate}
                // onChange={(e) =>
                //   setBorrowForm({ ...borrowForm, returnDate: e.target.value })
                // }
                className="input input-bordered"
              />
              <label className="label">
                <span className="label-text-alt">Return period: 3-14 days</span>
              </label>
            </div>

            {/* Modal Actions */}
            <div className="modal-action">
              <button type="submit" className="btn btn-neutral">
                Confirm Borrow
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => document.getElementById("my_modal_5").close()}
              >
                Cancel
              </button>
            </div>
          </form>
         
        </div>
      </dialog>
    </div>
  );
};

export default BookDetails;
