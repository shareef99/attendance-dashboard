import { useSelector } from "react-redux";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import ApplyForLeave from "./pages/ApplyForLeave/ApplyForLeave";
import ApplyLeave from "./pages/ApplyForLeave/ApplyLeave";
import Signin from "./pages/Auth/Signin";
import EmployeeLeaves from "./pages/EmployeeLeaves/EmployeeLeaves";
import AddEmployee from "./pages/Employees/AddEmployee";
import EmployeeDetails from "./pages/Employees/EmployeeDetails";
import Employees from "./pages/Employees/Employees";
import AddLeave from "./pages/Leaves/AddLeave";
import Leaves from "./pages/Leaves/Leaves";

export default function Router() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Navigate to="/apply-for-leave" />,
        },
        {
          path: "*",
          element: <Navigate to="/apply-for-leave" />,
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
            {
              path: ":empId",
              element: <EmployeeDetails />,
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
          path: "employee-leaves",
          element: <EmployeeLeaves />,
        },
        {
          path: "notifications",
          element: <>Notification</>,
        },
        {
          path: "profile",
          element: <EmployeeDetails />,
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
