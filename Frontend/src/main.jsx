import './assets/fonts/fonts.css';
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import Login from "./components/Login/login.jsx";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword.jsx";
import ResetPassword from "./components/ForgotPassword/resetPassword.jsx";
import Layout from "./Layout.jsx";
import Signup from "./components/Signup/signup.jsx";
import VerifyEmail from "./components/Signup/verifyEmail.jsx";
import Home from "./components/Home/home.jsx";
import FAQ from "./components/FAQ/FAQPage.jsx";
import Chat from "./components/Chat/Chat.jsx";
import Blogs from "./components/Blogs/Blogs.jsx";
import About from "./components/About/About.jsx";
import Pricing from './components/Pricing/Pricing.jsx';
import ProtectedRoute from "./components/utils/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // Public Routes
      {
        path: "Login",
        element: <Login />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Pricing",
        element:<Pricing/>,
      },
      // {
      //   path: "/faq",
      //   element: <FAQ />,
      // },
      {
        path: "/chat",
        element: <Chat />,
      },
      // {
      //   path: "/blogs",
      //   element: <Blogs />,
      // },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "ForgotPassword",
        element:<ForgotPassword/>
      },
      {
        path: "About",
        element:<About/>
      },
      {
        path: "verify-email",
        element:<VerifyEmail/>
      },
      {
        path: "reset-password",
        element:<ResetPassword/>
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "faq",
            element: <FAQ />,
          },
          {
            path: "/blogs",
            element: <Blogs />,
          },
        ],
      },

      // Protected Routes
      {},
      {},

      {},
      {},
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
