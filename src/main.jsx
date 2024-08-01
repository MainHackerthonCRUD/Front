import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App';
import './index.css';
import Home from './pages/homepage';
import ErrorPage from './pages/errorpage';
import LoginPage from './pages/loginpage';
import SignupPage from './pages/signuppage';
import WriteNewReview from './pages/review_write_page';
import ReviewDetail from './pages/review_detail_page';
import MyPage from './pages/mypage';
import RegionPlus from './pages/region_plus';
import SearchNameResults from './pages/name_results';
import RegionResults from './pages/region_results';
import MapDetail from './kakaomap/detail';
import HospitalDetailReview from './components/hospital_detail_review';
import MergeDetail from './pages/hospital_detailpage';

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
        path: "/:hospitalid/:postid",
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
      },
      {
        path:"/kakaomap/detail",
        //element:<MapDetail/>
        //element:<Detail/>
        element: <MergeDetail/>
      },
      {
        path: "/test", //이거 링크는 리뷰 목록 컴포넌트 디자인 보려고 달아뒀어요!! 나중엔 지울듯
        element: <HospitalDetailReview/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);