import { AppRouter } from "./routes/appRouter.jsx";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export const App = () => {
  return (
    <>
      <Toaster position="top-center" />
      <RouterProvider router={AppRouter} />
    </>
  );
};
