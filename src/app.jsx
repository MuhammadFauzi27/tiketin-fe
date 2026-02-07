import {AppRouter} from "./routes/appRouter.jsx"
import {RouterProvider} from "react-router-dom";

export const App = () => {
  return (
    <RouterProvider router={AppRouter} />
  )
}
