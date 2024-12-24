import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Home from "../pages/home/Home";
import AllBooks from "../pages/allBooks/AllBooks";
import AddBook from "../pages/addBook/AddBook";
import BorrowedBooks from "../pages/borrowedBooks/BorrowedBooks";
import Category from "../pages/category/Category";
import BookDetails from "../pages/bookDetails/BookDetails";
import UpdateBook from "../pages/updateBook/UpdateBook";

const routes = createBrowserRouter([
    {
        path: "/",
        errorElement: <h2>Error 404</h2>,
        element: <MainLayout/>,
        children:[
            {
                path: "",
                element: <Home/>
            },
            {
                path: "categories/:category",
                element: <Category/>
            },
            {
                path: "bookDetails/:id",
                element: <BookDetails/>,
                
            },
            {
                path: "allBooks",
                element: <AllBooks/>
            },
            {
                path: "updateBook/:id",
                element: <UpdateBook/>, 
            },
            {
                path: "addBook",
                element: <AddBook/>
            },
            {
                path: "borrowedBooks",
                element: <BorrowedBooks/>
            },
            {
                path: "login",
                element: <Login/>
            },
            {
                path: "register",
                element: <Register/>
            }
        ]
    }
]);

export default routes;