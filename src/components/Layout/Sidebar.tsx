import {
  ArrowLeftOnRectangleIcon,
  BellAlertIcon,
  CalendarDaysIcon,
  ChevronRightIcon,
  IdentificationIcon,
  UserCircleIcon,
  UserMinusIcon,
} from "@heroicons/react/24/outline";
import { Navbar, NavLink, ScrollArea } from "@mantine/core";
import { useDispatch } from "react-redux";
import { NavLink as RRDNavLink, useNavigate } from "react-router-dom";
import { clearAuth } from "../../helpers/auth";
import { signout } from "../../store/employeeSlice";

export default function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Navbar
      width={{ base: 250 }}
      withBorder={false}
      className="bg-p-white-green"
    >
      <ScrollArea className="h-full bg-p-blue-light">
        <Navbar.Section grow className="bg-p-blue-light px-4 py-8">
          <RRDNavLink to="/profile">
            {({ isActive }) => (
              <NavLink
                label="Profile"
                className={`text-p-blue-dark hover:bg-p-gray hover:text-p-blue ${
                  isActive && "bg-p-green text-black"
                }`}
                classNames={{
                  label: "text-lg font-medium",
                }}
                icon={<UserCircleIcon className="w-5 h-5" />}
                rightSection={<ChevronRightIcon className="h-4 w-4" />}
              />
            )}
          </RRDNavLink>
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
                icon={<IdentificationIcon className="w-5 h-5" />}
                rightSection={<ChevronRightIcon className="h-4 w-4" />}
              />
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
                icon={<CalendarDaysIcon className="w-5 h-5" />}
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
                icon={<UserMinusIcon className="w-5 h-5" />}
                rightSection={<ChevronRightIcon className="h-4 w-4" />}
              ></NavLink>
            )}
          </RRDNavLink>
          <RRDNavLink to="/notifications">
            {({ isActive }) => (
              <NavLink
                label="Notifications"
                className={`text-p-blue-dark hover:bg-p-gray hover:text-p-blue ${
                  isActive && "bg-p-gray text-p-blue"
                }`}
                classNames={{
                  label: "text-lg font-medium",
                }}
                icon={<BellAlertIcon className="w-5 h-5" />}
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
