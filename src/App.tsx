import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <>Home</>,
      children: [
        {
          path: "",
          element: <Navigate to="/home" />,
        },
        {
          path: "home",
          element: (
            <div className="flex h-full items-center justify-center text-3xl font-medium tracking-wide text-p-blue-dark">
              ADMIN DASHBOARD UNDER MAINTENANCE
            </div>
          ),
        },
      ],
    },
    {
      path: "/auth",
      children: [
        {
          path: "signin",
          element: <>Sign In</>,
        },
        {
          path: "signup",
          element: <>Sign Up</>,
        },
        {
          path: "*",
          element: <Navigate to="/auth/signin" />,
        },
        {
          path: "",
          element: <Navigate to="/auth/signin" />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
