import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App';
import './index.css';
import Home from './pages/homepage';
import ErrorPage from './pages/errorpage';
import LoginPage from './pages/loginpage';
import SignupPage from './pages/signuppage';
import NewReview from './pages/newreview';
import WriteNewReview from './pages/writenewreview';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <LoginPage />
      },
      {
        path: "signup",
        element: <SignupPage />
      },
      {
        path: "addreview",
        element: <NewReview/>
      },
      {
        path: "writereview",
        element: <WriteNewReview/>
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);