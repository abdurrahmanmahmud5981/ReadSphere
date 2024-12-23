import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import SingleBook from "../../components/SingleBook";

const Category = () => {
  const { category } = useParams();
  const [booksOfCategory, setBooksOfCategory] = useState([]);
  console.log(category);
  useEffect(() => {
    fetchCategory();
  }, [category]);
  const fetchCategory = async () => {
    try {
      const { data } = await axiosSecure.get(`/books/categories/${category}`);
      console.log(data);
      setBooksOfCategory(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {
        booksOfCategory.length > 0 && (
          booksOfCategory.map(book => <SingleBook key={book?._id} book={book}  />)
        )
      }
    </div>
  );
};

export default Category;
