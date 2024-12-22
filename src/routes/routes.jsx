import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";

const routes = createBrowserRouter([
    {
        path: "/",
        errorElement: <h2>Error 404</h2>,
        element: <MainLayout/>,
        children:[
            {
                path: "",
                element: <h2>Home Page</h2>
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