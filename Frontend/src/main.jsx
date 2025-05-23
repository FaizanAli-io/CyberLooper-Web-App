import ReactDOM from "react-dom/client";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import "./assets/fonts/fonts.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Layout from "./Layout.jsx";
import ProtectedRoute from "./components/utils/ProtectedRoute.jsx";

import Login from "./components/Login/login.jsx";
import Signup from "./components/Signup/signup.jsx";
import VerifyEmail from "./components/Signup/verifyEmail.jsx";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword.jsx";
import ResetPassword from "./components/ForgotPassword/resetPassword.jsx";

import FAQ from "./components/FAQ/FAQ.jsx";
import Chat from "./components/Chat/Chat.jsx";
import Blogs from "./components/Blogs/Blogs.jsx";
import About from "./components/About/About.jsx";
import Profile from "./components/Profile/profile.jsx";
import Pricing from "./components/Pricing/Pricing.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import MoreAbout from "./components/MoreAbout/MoreAbout.jsx";
import ContactUs from "./components/ContactUs/ContactUs.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy.jsx";
import SecurityPolicy from "./components/SecurityPolicy/SecurityPolicy.jsx";
import TermsOfService from "./components/TermsOfService/TermsOfService.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
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
        element: <ForgotPassword />,
      },
      {
        path: "verify-email",
        element: <VerifyEmail />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/",
            element: <Navigate to="/chat" replace />,
          },
          {
            path: "/chat",
            element: <Chat />,
          },
          {
            path: "/about",
            element: <About />,
          },
          {
            path: "/more-about",
            element: <MoreAbout />,
          },
          {
            path: "/faq",
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
            path: "/pricing",
            element: <Pricing />,
          },
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/contact-us",
            element: <ContactUs />,
          },
          {
            path: "/privacy-policy",
            element: <PrivacyPolicy />,
          },
          {
            path: "/security-policy",
            element: <SecurityPolicy />,
          },
          {
            path: "/terms-of-service",
            element: <TermsOfService />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
