import {createBrowserRouter} from 'react-router-dom'
import { Layout } from "../components/layout.jsx"
import {ProductDetail} from "../pages/detail/productDetail.jsx";
import {BookingPage} from "../pages/booking/booking.jsx";
import {PaymentPage} from "../pages/payment/payment.jsx";
import {ETicketPage} from "../pages/ticket/installTicket.jsx";

export const AppRouter = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <ProductDetail/> },
      { path: '/booking/:id', element: <BookingPage/> },
      { path: '/payment/:id', element: <PaymentPage/> },
      { path: '/ticket/install', element: <ETicketPage/> },
    ]
  }
])