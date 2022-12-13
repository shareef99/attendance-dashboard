import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import ApplyForLeave from "./pages/ApplyForLeave/ApplyForLeave";
import ApplyLeave from "./pages/ApplyForLeave/ApplyLeave";
import Signin from "./pages/Auth/Signin";
import AddEmployee from "./pages/Employees/AddEmployee";
import Employees from "./pages/Employees/Employees";
import AddLeave from "./pages/Leaves/AddLeave";
import Leaves from "./pages/Leaves/Leaves";
import Profile from "./pages/Profile/Profile";

export default function Router() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Navigate to="/profile" />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "employees",
          children: [
            {
              path: "",
              element: <Employees />,
            },
            {
              path: "add",
              element: <AddEmployee />,
            },
          ],
        },
        {
          path: "leaves",
          children: [
            {
              path: "",
              element: <Leaves />,
            },
            {
              path: "add",
              element: <AddLeave />,
            },
          ],
        },
        {
          path: "apply-for-leave",
          children: [
            { path: "", element: <ApplyForLeave /> },
            {
              path: "apply",
              element: <ApplyLeave />,
            },
          ],
        },
        {
          path: "notifications",
          element: <>Notification</>,
        },
      ],
    },
    {
      path: "/auth",
      children: [
        {
          path: "signin",
          element: <Signin />,
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

  return <RouterProvider router={routes} />;
}
