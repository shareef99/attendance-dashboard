import { ScrollArea, Table } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { getEmployeesWithLeavesApi } from "../../api/employees";
import Badge from "../../components/Molecules/Badge";
import Loader from "../../components/Molecules/Loader";
import { errNotification } from "../../helpers/notification";

export default function EmployeeLeaves() {
  const {
    data: employeesWithLeaves,
    isLoading,
    isError,
    error,
  } = useQuery<any, any>({
    queryFn: getEmployeesWithLeavesApi,
    queryKey: ["employees-with-leaves"],
  });

  if (isError) {
    errNotification({
      id: "employee",
      title: "Employee Leaves",
      message: error.message || "Failed to fetch employees with leaves",
    });
  }

  return (
    <section className="my-8">
      <h2 className="text-xl">Employee Leaves</h2>
      {isLoading ? (
        <Loader fullscreen={true} />
      ) : (
        <ScrollArea>
          <Table striped withBorder withColumnBorders className="mt-4">
            <thead>
              <tr>
                <th>Name</th>
                <th>From</th>
                <th>To</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Action</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employeesWithLeaves?.map((x: any) => (
                <tr key={x.leave_id}>
                  <td>{x.name}</td>
                  <td>{dayjs(x.from).format("DD/MM/YYYY")}</td>
                  <td>{dayjs(x.to).format("DD/MM/YYYY")}</td>
                  <td>{x.leave_duration}</td>
                  <td>{x.status}</td>
                  <td>Approve</td>
                  <td>Reject</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ScrollArea>
      )}
    </section>
  );
}
