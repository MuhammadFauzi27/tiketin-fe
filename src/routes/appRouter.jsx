import {createBrowserRouter} from 'react-router-dom'
import { Layout } from "../components/layout.jsx"

export const AppRouter = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <></> },
    ]
  }
])