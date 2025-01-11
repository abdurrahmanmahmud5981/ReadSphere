import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet";

const AddBook = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const categories = [
    "Fiction",
    "Non-Fiction",
    "Philosophical",
    "Children's Books",
  ];
  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // Add book to database
      const formData = {
        imageUrl: data.image,
        bookName: data.name,
        authorName: data.author,
        bookCategory: data.category,
        quantity: parseInt(data.quantity),
        bookRating: parseFloat(data.rating),
        pages: parseInt(data.pages),
        publisher: user?.displayName,
        publisherEmail: user?.email,
        bookContent: data.aboutBook,

        shortDescription: data.description,
      };
      await axiosSecure.post("/books/add", formData);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Book added successfully!",
      });
      reset();
      navigate("/allBooks");
    } catch (error) {
      console.error("Error adding book:", error);

      Swal.fire({
        title: "Opps!",
        text: "Failed to add book. Please try again.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Add Book - ReadSphere</title>
        <meta name="description" content="Add new book to the ReadSphere." />
        <meta property="og:title" content="Add Book - ReadSphere" />
        <meta
          property="og:description"
          content="Add new book to the ReadSphere."
        />
      </Helmet>
      <div className="max-w-2xl mx-auto bg-white rounded-xl  p-8 bg-gradient-to-br from-purple-200/60 via-white/30 to-purple-400/40 shadow-xl hover:shadow-2xl transition-shadow">
        <h1 className="text-3xl font-bold text-center mb-8 ">Add New Book</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Image Upload */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">
                Book Cover Image <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="url"
              placeholder="Valid Cover Image URL "
              {...register("image", {
                required: "Book cover image is required",
              })}
              className="input  input-bordered   w-full"
            />
            {errors.image && (
              <span className="text-error text-sm mt-1">
                {errors.image.message}
              </span>
            )}
          </div>

          {/* Book Title */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">
                Book Title <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter book title"
              className="input input-bordered"
              {...register("name", {
                required: "Book title is required",
                minLength: {
                  value: 2,
                  message: "Title must be at least 2 characters long",
                },
              })}
            />
            {errors.name && (
              <span className="text-error text-sm mt-1">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Quantity */}
          <div className="grid grid-cols-2 gap-3">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Quantity <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="number"
                className="input input-bordered"
                placeholder="Enter quantity"
                {...register("quantity", {
                  required: "Quantity is required",
                  min: {
                    value: 1,
                    message: "Quantity must be at least 1",
                  },
                })}
              />
              {errors.quantity && (
                <span className="text-error text-sm mt-1">
                  {errors.quantity.message}
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Pages <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="number"
                className="input input-bordered"
                placeholder="Enter total page number"
                {...register("pages", {
                  required: "Pages is required",
                  min: {
                    value: 1,
                    message: "Pages must be at least 1",
                  },
                })}
              />
              {errors.pages && (
                <span className="text-error text-sm mt-1">
                  {errors.pages.message}
                </span>
              )}
            </div>
          </div>

          {/* Author Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">
                Author Name <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              placeholder="Enter author name"
              {...register("author", {
                required: "Author name is required",
                minLength: {
                  value: 2,
                  message: "Author name must be at least 2 characters long",
                },
              })}
            />
            {errors.author && (
              <span className="text-error text-sm mt-1">
                {errors.author.message}
              </span>
            )}
          </div>

          {/* Category */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">
                Category <span className="text-red-500">*</span>
              </span>
            </label>
            <select
              className="select select-bordered"
              {...register("category", {
                required: "Please select a category",
              })}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <span className="text-error text-sm mt-1">
                {errors.category.message}
              </span>
            )}
          </div>

          {/* Short Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">
                Short Description <span className="text-red-500">*</span>
              </span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24 resize-none"
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 20,
                  message: "Description must be at least 20 characters long",
                },
              })}
            />
            {errors.description && (
              <span className="text-error text-sm mt-1">
                {errors.description.message}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">
                Rating (1-5) <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="number"
              className="input input-bordered"
              min="1"
              max="5"
              step="0.1"
              {...register("rating", {
                required: "Rating is required",
                min: {
                  value: 1,
                  message: "Rating must be at least 1",
                },
                max: {
                  value: 5,
                  message: "Rating cannot exceed 5",
                },
              })}
            />
            {errors.rating && (
              <span className="text-error text-sm mt-1">
                {errors.rating.message}
              </span>
            )}
          </div>

          {/* Book Content */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">
                About Book <span className="text-red-500">*</span>
              </span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24 resize-none"
              {...register("aboutBook", {
                required: "About Book is required",
                minLength: {
                  value: 20,
                  message: "About Book must be at least 20 characters long",
                },
              })}
            />
            {errors.aboutBook && (
              <span className="text-error text-sm mt-1">
                {errors.aboutBook.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`btn btn-neutral w-full `}
            disabled={loading}
          >
            {loading ? "Adding Book..." : "Add Book"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddBook;
