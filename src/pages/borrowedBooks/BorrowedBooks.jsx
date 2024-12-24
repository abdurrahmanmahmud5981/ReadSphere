import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
const BorrowedBooks = () => {
  const { user } = useAuth();
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  console.log(new Date().toLocaleDateString());
  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        // Fetch borrowed books for the logged in user
        const { data } = await axiosSecure.get(`/borrowed-books/${user.email}`);
        setBorrowedBooks(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBorrowedBooks();
  }, [user]);


  // handle return book
  const handleReturnBook = async (id) => {
    try {
      await axiosSecure.delete(`/borrowed-books/${id}`);
      setBorrowedBooks((prevBooks) =>
        prevBooks.filter((book) => book._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-8">My Borrowed Books</h1>

      {borrowedBooks.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium">No books borrowed</h3>
          <p className="mt-1 text-gray-500">
            Start exploring our library to borrow books!
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {borrowedBooks.map((book) => (
            <motion.div
              key={book?._id}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="card relative  bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 "
            >
              {/* Image Section */}
              <figure className=" h-48 bg-primary/20 relative overflow-hidden">
                <img
                  src={book?.imageUrl}
                  alt={book?.bookName}
                  className="w-28 h-44  object-cover rounded-md"
                />

                <div className="absolute top-4  border-none badge-sm font-medium right-2 badge ">
                  {book?.bookCategory}
                </div>
              </figure>

              <div className="card-body p-4  ">
                <h2 className="card-title font-bold text-lg">
                  {book?.bookTitle}
                </h2>
                <h3>
                  Borrowed on:{" "}
                  <span className="font-medium">
                    {new Date(book.borrowDate).toLocaleDateString()}
                  </span>
                </h3>
                <h3>
                  Return Date:{" "}
                  <span className="font-medium">
                    {new Date(book.returnDate).toLocaleDateString()}
                  </span>
                </h3>
                {/* Action Buttons */}
                <div className="card-actions  mt-4">
                  <button onClick={()=> handleReturnBook(book?._id)} className="btn btn-neutral">Return Book</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
};

export default BorrowedBooks;
