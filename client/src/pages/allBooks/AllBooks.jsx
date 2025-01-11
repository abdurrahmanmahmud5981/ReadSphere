import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import CardView from "./CardView";
import TableView from "./TableView";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/LoadingSpinner";

const AllBooks = () => {
  const axiosSecure = useAxiosSecure()
  const [viewMode, setViewMode] = useState("card");
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);

  const { data: books = [], isLoading } = useQuery({
    queryKey: ["all-books"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/books`);
      return data;
    },
  });

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

  if (isLoading) return <LoadingSpinner />;

  // Check if there are no books
  if (!filteredBooks || filteredBooks.length === 0) {
    return (
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
        <h3 className="text-lg font-medium">No books Found</h3>
        <p className="mt-1 text-gray-500">
          Start exploring our library to borrow books!
        </p>
      </motion.div>
    );
  }

  return (
    <>
      <Helmet>
        <title>All Books - ReadSphere</title>
        <meta name="description" content="All books in the ReadSphere." />
        <meta property="og:title" content="All Books - ReadSphere" />
      </Helmet>

      <div className="mx-auto py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold mb-10">All Books</h1>

          <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
            <button
              className={`btn ${
                showOnlyAvailable ? "btn-primary" : "btn-outline"
              }`}
              onClick={() => setShowOnlyAvailable(!showOnlyAvailable)}
            >
              {showOnlyAvailable ? "Show All Books" : "Show Available Books"}
            </button>

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
            key={viewMode}
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
