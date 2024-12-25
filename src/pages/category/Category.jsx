import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import SingleBook from "../../components/SingleBook";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/LoadingSpinner";

const Category = () => {
  const { category } = useParams();
  // const [booksOfCategory, setBooksOfCategory] = useState([]);
  const {data:booksOfCategory,isLoading,isError} = useQuery({ queryKey: ['Category'], queryFn: async ()=>{
    try {
      const { data } = await axiosSecure.get(`/books/categories/${category}`);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  } })
  // useEffect(() => {
  //   const fetchCategory = async () => {
  //     try {
  //       const { data } = await axiosSecure.get(`/books/categories/${category}`);
  //       setBooksOfCategory(data);
  //     } catch (error) {
      
  //       console.error("Error fetching books:", error.message);
  //     }
  //   };
  //   fetchCategory();
  // }, [category]);


  if (isLoading) return <LoadingSpinner/>;

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {booksOfCategory.length > 0 &&
          booksOfCategory.map((book) => (
            <SingleBook key={book?._id} book={book} />
          ))}
      </div>
    </div>
  );
};

export default Category;
