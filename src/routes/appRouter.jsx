import {createBrowserRouter} from 'react-router-dom'
import { Layout } from "../components/layout.jsx"
import {ProductDetail} from "../pages/productDetail.jsx";
import {BookingPage} from "../pages/Booking.jsx";

export const AppRouter = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <ProductDetail/> },
      { path: '/booking/:id', element: <BookingPage/> },
    ]
  }
])