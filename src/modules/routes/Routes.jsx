import { createBrowserRouter } from "react-router-dom";
import App from "../../App";

import Home from "../../pages/home/Home";
import PrivateRoute from "../../provider/PrivateRoute";
import Cabinet from "../../components/layout/cabinet/Cabinet";
import NotFound from "../../pages/not-found/NotFound";

import ConsultantsCatalog from "../../pages/consultants-catalog/ConsultantsCatalog";
import CustomerMain from "../../pages/cabinet/customer/customer-main/CustomerMain";
import CustomerProfile from "../../pages/cabinet/customer/customer-profile/CustomerProfile";
import CustomerWallet from "../../pages/cabinet/customer/customer-wallet/CustomerWallet";
import CustomerConsultant from "../../pages/cabinet/customer/customer-consultant/CustomerConsultant";
import ConsultantMain from "../../pages/cabinet/consultant/consultant-main/ConsultantMain";
import ConsultantWallet from "../../pages/cabinet/consultant/consultant-wallet/ConsultantWallet";
import ConsultantProfile from "../../pages/cabinet/consultant/consultant-profile/ConsultantProfile";
import ConsultantSingle from "../../pages/consultant-single/ConsultantSingle";
import ConsultantClients from "../../pages/cabinet/consultant/consultant-clients/ConsultantClients";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/consultants-catalog",
        element: <ConsultantsCatalog />,
      },
      {
        path: "/consultants-catalog/:consultantId",
        element: <ConsultantSingle />,
      },
      {
        path: "/customer",
        element: (
          <PrivateRoute>
            <Cabinet userType={"customer"} />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <CustomerMain />,
          },
          {
            path: "profile",
            element: <CustomerProfile />,
          },
          {
            path: "wallet",
            element: <CustomerWallet />,
          },
          {
            path: "consultant",
            element: <CustomerConsultant />,
          },
        ],
      },
      {
        path: "/consultant",
        element: (
          <PrivateRoute>
            <Cabinet userType={"consultant"} />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <ConsultantMain />,
          },
          {
            path: "profile",
            element: <ConsultantProfile />,
          },
          {
            path: "wallet",
            element: <ConsultantWallet />,
          },
          {
            path: "clients",
            element: <ConsultantClients />,
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

export default router;
