import { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { axiosSecure } from "../../hooks/useAxiosSecure";

import CardView from "./CardView";
import TableView from "./TableView";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/LoadingSpinner";
const AllBooks = () => {
 
  const [viewMode, setViewMode] = useState("card");
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const {data:books,isLoading,isError} = useQuery({ queryKey: ['all-books'], queryFn: async ()=>{
    try {
      const { data } = await axiosSecure.get(`/books`);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  } })


  const filteredBooks = showOnlyAvailable
    ? books.filter((book) => book.quantity > 0)
    : books;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: -10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  if (isLoading) return <LoadingSpinner/>

  return (
    <>
      <Helmet>
        <title>All Books - ReadSphere</title>
        <meta name="description" content="All books in the ReadSphere." />
        <meta property="og:title" content="All Books - ReadSphere" />
      </Helmet>
      <div className=" mx-auto  py-8">
        <motion.div
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className=" "
        >
          <h1 className="text-3xl font-bold text-center mb-10">All Books</h1>

          <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
            <button
              className={`btn ${
                showOnlyAvailable ? "btn-primary" : "btn-outline"
              }`}
              onClick={() => setShowOnlyAvailable(!showOnlyAvailable)}
            >
              {showOnlyAvailable ? "Show All Books" : "Show Available Books"}
            </button>
            {/* change view  */}
            <select
              className="select select-bordered w-full max-w-xs"
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value)}
            >
              <option value="card">Card View</option>
              <option value="table">Table View</option>
            </select>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            // key={viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {viewMode === "card" ? (
              <CardView
                containerVariants={containerVariants}
                filteredBooks={filteredBooks}
                itemVariants={itemVariants}
              />
            ) : (
              <TableView
                containerVariants={containerVariants}
                filteredBooks={filteredBooks}
                itemVariants={itemVariants}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default AllBooks;
