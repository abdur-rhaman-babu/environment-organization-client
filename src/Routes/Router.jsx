import { createBrowserRouter } from "react-router-dom";
import Main from "./../Main/Main";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Events from "../Pages/Events/Events";
import Contacts from "../Pages/Contacts/Contacts";
import Donate from "../Pages/Donate/Donate";
import Login from "../Auth/Login/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contacts />,
      },
      {
        path: "/donate",
        element: <Donate />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
