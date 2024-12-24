import { Rating } from "@smastrom/react-rating";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
const TableView = ({ containerVariants, itemVariants, filteredBooks }) => (
  <motion.div
    // initial={{ opacity: 0 }}
    // animate={{ opacity: 1 }}
    className="overflow-x-auto"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >
    <table className="table table-zebra w-full">
      <thead className="bg-base-200 text-black rounded-t-3xl border-2 ">
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Author</th>
          <th>Category</th>
          <th>Quantity</th>
          <th>Rating</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody className="border-2 border-t-0 ">
        <AnimatePresence>
          {filteredBooks?.map((book) => (
            <motion.tr
              variants={itemVariants}
              key={book._id}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -0 }}
              whileHover={{ backgroundColor: "rgba(0,0,0,0.08)" }}
            >
              <td>
                <img
                  src={book.imageUrl}
                  alt={book.bookName}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td>{book?.bookName}</td>
              <td>{book.authorName}</td>
              <td>{book?.bookCategory}</td>
              <td>{book.quantity}</td>
              <td>
                <div className="rating rating-sm">
                  <Rating
                    className="max-w-20"
                    readOnly
                    value={book?.bookRating}
                  />
                </div>
              </td>
              <td>
                <Link
                  to={`/updateBook/${book?._id}`}
                  className="py-3 px-6 text-center w-full border rounded-full font-semibold hover:bg-primary hover:text-white transition-colors duration-300"
                >
                  Update
                </Link>
              </td>
            </motion.tr>
          ))}
        </AnimatePresence>
      </tbody>
    </table>
  </motion.div>
);

export default TableView;
