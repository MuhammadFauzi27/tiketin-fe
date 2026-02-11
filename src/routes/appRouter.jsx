import { createBrowserRouter, Navigate } from "react-router-dom";
import { Layout } from "../components/layout.jsx";
import Cari from "../pages/cariPage.jsx";
import Setting from "../components/setting.jsx";
import ListPembelian from "../components/listPembelian.jsx";
import Pesanan from "../components/pesanan.jsx";
import PrivacyPolicy from "../components/privacyPolicy.jsx";
import SyaratKetentuan from '../components/syaratKetentuan.jsx'
import {LayoutSetting, LayoutPlain, LayoutLanding } from "../components/layoutPlain.jsx";
import LandingPage from '../pages/landing-page/landingPage.jsx'
import DetailBus from "../pages/detailPage.jsx";

export const AppRouter = createBrowserRouter([
  {
    element: <LayoutLanding/>,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: "/home", element: <LandingPage /> },

    ],
  },
  {
    element: <Layout />,
    children: [
      { path: "/cari-bus", element: <Cari /> },
      { path: "/detail-bus", element: <DetailBus /> },

      {
        path: "/pengaturan",
        element: <LayoutSetting />,
        children: [
          { index: true, element: <Setting /> }, 
          { path: "list-pembelian", element: <ListPembelian /> }, 
          { path: "pesanan", element: <Pesanan /> }, 
        ]
      },
    ],
  },

  {
    element: <LayoutPlain />,
    children: [
      { path: "/privacy-policy", element: <PrivacyPolicy /> },
      { path: "/syarart-ketentuan", element: <SyaratKetentuan /> },
    ],
  },
]);
