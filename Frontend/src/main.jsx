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
import TermsOfServicePage from './components/TermsOfService/TermsOfService.jsx';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy.jsx';
import SecurityPolicy from './components/SecurityPolicy/SecurityPolicy.jsx';
import ChangePassword from './components/Profile/changePassword.jsx';
import Profile from './components/Profile/profile.jsx';
import ProtectedRoute from "./components/utils/ProtectedRoute.jsx";
import ContactUs from './components/ContactUs/ContactUs.jsx';
import NotFound from './components/NotFound/NotFound.jsx';
import DashboardPage from './components/Dashboard/Dashboard.jsx';

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
        path: "signup",
        element: <Signup />,
      },
      {
        path: "ForgotPassword",
        element: <ForgotPassword />
      },
      {
        path: "verify-email",
        element: <VerifyEmail />
      },
      {
        path: "reset-password",
        element: <ResetPassword />
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/",
            element: <Chat />,
          },
          {
            path: "/home",
            element: <Home />,
          },
          {
            path: "/Pricing",
            element: <Pricing />,
          },
          {
            path: "/TermsOfService",
            element: <TermsOfServicePage />
          },
          {
            path: "/PrivacyPolicy",
            element: <PrivacyPolicy />
          },
          {
            path: "/SecurityPolicy",
            element: <SecurityPolicy />
          },
          {
            path: "/ContactUs",
            element: <ContactUs />
          },
          {
            path: "/Dashboard",
            element: <DashboardPage />
          },
          {
            path: "/chat",
            element: <Chat />,
          },
          {
            path: "faq",
            element: <FAQ />,
          },
          {
            path: "/blogs",
            element: <Blogs />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "About",
            element: <About />
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />
      },
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
