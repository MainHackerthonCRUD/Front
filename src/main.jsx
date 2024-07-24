import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App';
import './index.css';
import Home from './pages/homepage';
import ErrorPage from './pages/errorpage';
import LoginPage from './pages/loginpage';
import SignupPage from './pages/signuppage';
import WriteNewReview from './pages/writenewreview';
import ReviewDetail from './pages/reviewdetail';
import MyPage from './pages/mypage';
import RegionPlus from './pages/region_plus';
import SearchNameResults from './pages/name_results';
import RegionResults from './pages/region_results';

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
        path: "writereview",
        element: <WriteNewReview/>
      },
      {
        path: "review/:postid",
        element: <ReviewDetail/>
      },
      {
        path: "/mypage/:pk",
        element: <MyPage/>
      },
      {
        path: "region-plus",
        element: <RegionPlus/>
      },
      {
        path: "/results/:hospital_name",
        element: <SearchNameResults/>
      },
      {
        path:"/region/:region_name",
        element:<RegionResults/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);