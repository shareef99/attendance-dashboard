import {
  ArrowLeftOnRectangleIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { Navbar, NavLink, ScrollArea } from "@mantine/core";
import { useDispatch } from "react-redux";
import {
  NavLink as RRDNavLink,
  // useLocation,
  useNavigate,
} from "react-router-dom";
import { clearAuth } from "../../helpers/auth";
import { signout } from "../../store/employeeSlice";

export default function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { pathname } = useLocation();

  return (
    <Navbar
      width={{ base: 250 }}
      withBorder={false}
      className="bg-p-white-green"
    >
      <ScrollArea className="h-full bg-p-blue-light">
        <Navbar.Section grow className="bg-p-blue-light px-4 py-8">
          <RRDNavLink to="/employees">
            {({ isActive }) => (
              <NavLink
                label="Employees"
                className={`text-p-blue-dark hover:bg-p-gray hover:text-p-blue ${
                  isActive && "bg-p-green text-black"
                }`}
                classNames={{
                  label: "text-lg font-medium",
                }}
                rightSection={<ChevronRightIcon className="h-4 w-4" />}
              ></NavLink>
            )}
          </RRDNavLink>
          <RRDNavLink to="/leaves">
            {({ isActive }) => (
              <NavLink
                label="Leaves"
                className={`text-p-blue-dark hover:bg-p-gray hover:text-p-blue ${
                  isActive && "bg-p-gray text-p-blue"
                }`}
                classNames={{
                  label: "text-lg font-medium",
                }}
                rightSection={<ChevronRightIcon className="h-4 w-4" />}
              />
            )}
          </RRDNavLink>
          <RRDNavLink to="/apply-for-leave">
            {({ isActive }) => (
              <NavLink
                label="Apply Leave"
                className={`text-p-blue-dark hover:bg-p-gray hover:text-p-blue ${
                  isActive && "bg-p-gray text-p-blue"
                }`}
                classNames={{
                  label: "text-lg font-medium",
                }}
                rightSection={<ChevronRightIcon className="h-4 w-4" />}
              ></NavLink>
            )}
          </RRDNavLink>
          <NavLink
            label="logout"
            className="text-red-500 hover:bg-p-gray"
            classNames={{
              label: "text-lg font-medium",
            }}
            onClick={() => {
              clearAuth();
              dispatch(signout());
              navigate("/auth/signin");
            }}
            icon={<ArrowLeftOnRectangleIcon className="h-5 w-5" />}
          />
        </Navbar.Section>
      </ScrollArea>
    </Navbar>
  );
}
