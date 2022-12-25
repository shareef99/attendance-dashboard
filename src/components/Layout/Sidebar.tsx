import {
  ArrowLeftOnRectangleIcon,
  CalendarDaysIcon,
  ChevronRightIcon,
  IdentificationIcon,
  UserCircleIcon,
  UserGroupIcon,
  UserMinusIcon,
} from "@heroicons/react/24/outline";
import { Navbar, NavLink, ScrollArea } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { NavLink as RRDNavLink, useNavigate } from "react-router-dom";
import { clearAuth } from "../../helpers/auth";
import { signout } from "../../store/employeeSlice";
import logo from "../../assets/Images/logo.webp";

export default function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const employee = useSelector(({ employee }: any) => employee);

  return (
    <Navbar width={{ base: 250 }} withBorder={false}>
      <div className="flex h-20 items-center bg-p-blue px-4">
        <img
          src={logo}
          className="mr-2 h-12 w-12 bg-opacity-40 rounded-full bg-p-gray"
          alt="ISL Logo"
        />
        <p className="text-xl text-p-gray">Leave Dashboard</p>
      </div>
      <ScrollArea className="h-full bg-p-blue-light">
        <Navbar.Section grow className="bg-p-blue-light px-4 py-8">
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
              />
            )}
          </RRDNavLink>
          {employee.role <= 2 && (
            <>
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
              <RRDNavLink to="/employee-leaves">
                {({ isActive }) => (
                  <NavLink
                    label="Employee Leaves"
                    className={`text-p-blue-dark  hover:bg-p-gray hover:text-p-blue ${
                      isActive && "bg-p-gray text-p-blue"
                    }`}
                    classNames={{
                      label: "text-lg font-medium",
                    }}
                    icon={<UserGroupIcon className="w-5 h-5" />}
                    rightSection={<ChevronRightIcon className="h-4 w-4" />}
                  />
                )}
              </RRDNavLink>
            </>
          )}
          <RRDNavLink to="/leaves">
            {({ isActive }) => (
              <NavLink
                label="Leaves Types"
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
