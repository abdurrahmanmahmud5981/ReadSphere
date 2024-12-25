import { useParams } from "react-router-dom";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import SingleBook from "../../components/SingleBook";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/LoadingSpinner";
import GoBack from "../../components/GoBack";

const Category = () => {
  const { category } = useParams();

  // Fetch books of the category using react-query
  const {
    data: booksOfCategory = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["Category", category],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/books/categories/${category}`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  if (isError || booksOfCategory.length === 0)
    return (
      <div className="text-center text-gray-600 py-8">
        <h2 className="text-xl font-semibold">
          No books found in this category.
        </h2>
      </div>
    );

  return (
    <>
    <GoBack/>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {booksOfCategory?.map((book) => (
        <SingleBook key={book?._id} book={book} />
      ))}
    </div>
    </>
  );
};

export default Category;
