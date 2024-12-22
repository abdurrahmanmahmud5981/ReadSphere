import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Login from "../pages/login/Login";

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
            }
        ]
    }
]);

export default routes;