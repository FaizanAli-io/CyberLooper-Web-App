import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import Login from './components/Login/login.jsx'
// import Home from './components/Home/home.jsx'
import Layout from './Layout.jsx'
import Signup from './components/Signup/signup.jsx'
import Home from './components/Home/home.jsx'
import FAQ from './components/FAQ/Faq.jsx'
import Chat from './components/Chat/Chat.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element:<Layout/>,

    children: [

      // Public Routes    
      {
        path: 'Login',
        element: <Login />
      },
      {
        path: 'Home',
        element: <Home />
      },
      {
        path: 'signup',
        element: <Signup />
      },
      {
        path: 'FAQ',
        element: <FAQ />
      }
      ,
      {
        path: '/Chat',
        element : <Chat/>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
 // <React.StrictMode>
    <RouterProvider router={router} />
  //</React.StrictMode>
);