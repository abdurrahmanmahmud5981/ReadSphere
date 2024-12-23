import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosSecure } from "../../hooks/useAxiosSecure";

const Category = () => {
  const { category } = useParams();
  const [booksOfCategory, setBooksOfCategory] = useState([]);
  console.log(category);
  useEffect(() => {
    fetchCategory();
  }, [category]);
  const fetchCategory = async () => {
    try {
      const { data } = await axiosSecure.get(
        `/books/categories/${category}`
      );
      console.log(data);
      // setBooksOfCategory(data);
    } catch (error) {
      console.log(error);
    }
  };
  return <div>Category</div>;
};

export default Category;
