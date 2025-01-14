import { useNavigate, useParams } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import LoadingSpinner from "../../components/LoadingSpinner";
import GoBack from "../../components/GoBack";
import axios from "axios";

const BookDetails = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: user?.displayName,
      email: user?.email,
      borrowDate: new Date().toISOString().split("T")[0],
      returnDate: "",
    },
  });
  // Fetch book data using react-query
  const fetchBookDetails = async (id) => {
    const { data } = await axiosSecure.get(`/books/book/${id}`);
    return data;
  };
  // Calculate min and max return dates (3-14 days from today)
  const today = new Date();
  const minReturnDate = new Date(today);
  minReturnDate.setDate(today.getDate() + 3);
  const maxReturnDate = new Date(today);
  maxReturnDate.setDate(today.getDate() + 14);

  // Fetch book details with React Query
  const {
    data: book,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["bookDetails", id],
    queryFn: () => fetchBookDetails(id),
  });

  const onSubmit = async (data) => {
    try {
      const borrowedBook = {
        userEmail: data.email,
        bookId: book._id,
        imageUrl: book.imageUrl,
        bookTitle: book.bookName,
        bookCategory: book.bookCategory,
        borrowDate: data.borrowDate,
        returnDate: data.returnDate,
      };
      await axios.post(`https://b10a11-server-side-abdurrahmanmahmud5981.vercel.app/books/borrow`, borrowedBook,{withCredentials:true});
      navigate("/borrowedBooks");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Book Borrowed successfully!",
      });
    } catch (error) {
      console.error("Error borrowing book:", error);
      Swal.fire({
        title: "Oops!",
        text: `${error?.response?.data?.message}`,
        icon: "error",
      });
    } finally {
      closeModal();
    }
  };

  // Close the modal
  const closeModal = () => {
    document.getElementById("my_modal_5").close();
    setValue("returnDate", "");
  };

  // If data is loading or error occurs
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <>
      <Helmet>
        <title>{`${book?.bookName}`}- ReadSphere</title>
        <meta
          name="description"
          content={`Check out ${book?.bookName} by ${book?.authorName} on ReadSphere.`}
        />
        <meta property="og:title" content={`${book?.bookName} - ReadSphere`} />
        <meta
          property="og:description"
          content={`Check out ${book?.bookName} by ${book?.authorName} on ReadSphere.`}
        />
      </Helmet>

      <div className="relative">
        {/* Book Details Card */}
        <GoBack />
        <div className="card md:card-side bg-base-100 shadow-xl max-w-screen-lg mx-auto my-8">
          <figure className="md:w-1/2 p-6 bg-purple-100">
            <img
              src={book?.imageUrl}
              alt={book?.bookName}
              className="rounded-xl h-44 md:h-[500px] object-fill"
            />
          </figure>

          <div className="card-body self-start md:w-2/3  items-start">
            <h2 className="card-title text-3xl font-bold">{book?.bookName}</h2>
            <p className="text-xl ">by {book.authorName}</p>

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

            <div className="my-4">
              <h3 className="font-bold text-lg">Description</h3>
              <p>
                {book?.bookContent} {book?.shortDescription}
              </p>
            </div>

            <div className="grid grid-cols-2  gap-4 my-4">
              <div>
                <span className="font-semibold">Pages:</span>
                <p>{book.pages}</p>
              </div>

              <div>
                <span className="font-semibold">Publisher:</span>
                <p>{book.publisher}</p>
              </div>
            </div>

            <div className="card-actions justify-end mt-6">
              <button
                className={`btn py-3 px-6 text-center w-full border rounded-full font-semibold hover:bg-primary hover:text-white transition-colors duration-300 ${
                  book.quantity === 0 || user?.email === book?.publisherEmail
                    ? "btn-disabled"
                    : ""
                }`}
                onClick={() =>
                  document.getElementById("my_modal_5").showModal()
                }
              >
                {book.quantity > 0 ? "Borrow Now" : "Book Unavailable"}
              </button>
            </div>
          </div>
        </div>

        {/* Borrow Modal with React Hook Form */}
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Borrow Book</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  disabled
                  {...register("name")}
                  className="input input-bordered"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  disabled
                  {...register("email")}
                  className="input input-bordered"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Borrow Date</span>
                </label>
                <input
                  type="date"
                  disabled
                  {...register("borrowDate")}
                  className="input input-bordered"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Return Date</span>
                </label>
                <input
                  type="date"
                  {...register("returnDate", {
                    required: "Return date is required",
                    validate: (value) => {
                      const date = new Date(value);
                      if (date < minReturnDate) {
                        return "Return date must be at least 3 days from today";
                      }
                      if (date > maxReturnDate) {
                        return "Return date must be within 14 days from today";
                      }
                      return true;
                    },
                  })}
                  min={minReturnDate.toISOString().split("T")[0]}
                  max={maxReturnDate.toISOString().split("T")[0]}
                  className={`input input-bordered ${
                    errors.returnDate ? "input-error" : ""
                  }`}
                />
                {errors.returnDate && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.returnDate.message}
                    </span>
                  </label>
                )}
                <label className="label">
                  <span className="label-text-alt">
                    Return period: 3-14 days
                  </span>
                </label>
              </div>

              <div className="modal-action">
                <button type="submit" className="btn btn-neutral">
                  Confirm Borrow
                </button>
                <button type="button" className="btn" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default BookDetails;
