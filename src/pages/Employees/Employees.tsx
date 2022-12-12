import { EyeIcon } from "@heroicons/react/24/outline";
import { Button, ScrollArea, Table } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { getEmployeesApi } from "../../api/employees";
import Loader from "../../components/Molecules/Loader";

export default function Employees() {
  const {
    isLoading,
    isError,
    error,
    data: employees,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: getEmployeesApi,
  });

  if (isLoading) {
    return <Loader fullscreen={true} />;
  }

  if (isError) {
    console.log(error);
  }

  return (
    <section className="mt-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl">Employees</h2>
        <Button className="btn ">
          <Link to="/employees/add">Add Employee</Link>
        </Button>
      </div>
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
            {employees?.map((x: any) => (
              <tr key={x._id}>
                <td>{x.emp_id}</td>
                <td>{x.department}</td>
                <td>{x.designation}</td>
                <td>{x.name}</td>
                <td>{x.email}</td>
                <td>{x.mobile_no}</td>
                <td>{dayjs(x.joining_date).format("DD-MM-YYYY")}</td>
                <td>{x.emp_type}</td>
                <td className="cursor-pointer">
                  <EyeIcon className="w-6 h-6" />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollArea>
    </section>
  );
}
