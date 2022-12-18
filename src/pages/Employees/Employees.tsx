import { EyeIcon } from "@heroicons/react/24/outline";
import { Button, ScrollArea, Table } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getEmployeesApi,
  getEmployeesByDepartmentApi,
} from "../../api/employees";
import Loader from "../../components/Molecules/Loader";
import { errNotification } from "../../helpers/notification";
import { EmployeesType } from "./employee";

export default function Employees() {
  const navigate = useNavigate();
  const user = useSelector(({ employee }: any) => employee);

  const {
    isLoading,
    isError,
    error,
    data: employees,
  } = useQuery<Array<EmployeesType>, any>({
    queryKey: ["employees"],
    queryFn: () => getEmployeesByDepartmentApi(user.department),
  });

  if (isLoading) {
    return <Loader fullscreen={true} />;
  }

  if (isError) {
    errNotification(
      {
        id: "employee",
        title: "Employees",
        message:
          error?.response?.data.message ||
          error?.message ||
          "Failed to load employees",
      },
      false
    );
  }

  return (
    <section className="mt-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl">Employees</h2>
        <Button className="btn ">
          <Link to="/employees/add">Add Employee</Link>
        </Button>
      </div>
      {employees ? (
        <ScrollArea>
          <Table className="my-4" striped withBorder withColumnBorders>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile No</th>
                <th>Joining Date</th>
                <th>Employee Type</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee.emp_id}</td>
                  <td>{employee.department}</td>
                  <td>{employee.designation}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.mobile_no}</td>
                  <td>{dayjs(employee.joining_date).format("DD-MM-YYYY")}</td>
                  <td>{employee.emp_type}</td>
                  <td
                    className="cursor-pointer"
                    onClick={() => navigate(`/employees/${employee.emp_id}`)}
                  >
                    <EyeIcon className="w-6 h-6" />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ScrollArea>
      ) : (
        <></>
      )}
    </section>
  );
}
