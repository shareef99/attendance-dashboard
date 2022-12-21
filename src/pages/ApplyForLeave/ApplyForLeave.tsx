import { Button, Table, ScrollArea } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getEmployeeApi } from "../../api/employees";
import Loader from "../../components/Molecules/Loader";

export default function ApplyForLeave() {
  const currentEmployee = useSelector(({ employee }: any) => employee);

  // Queries
  const {
    isLoading,
    isError,
    error,
    data: employee,
  } = useQuery<any, any>({
    queryFn: () => getEmployeeApi(currentEmployee.emp_id),
    queryKey: ["employee"],
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
        <h2 className="text-xl">Apply For Leave</h2>
        <Button className="btn ">
          <Link to="/apply-for-leave/apply">Apply Leave</Link>
        </Button>
      </div>
      {employee.leaves.length > 0 ? (
        <ScrollArea>
          <Table className="my-4" withBorder withColumnBorders striped>
            <thead>
              <tr>
                <th>Leave Name</th>
                <th>Short Name</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>Duration</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {employee.leaves.map((leave: any) => (
                <tr key={leave._id}>
                  <td>{leave.name}</td>
                  <td>{leave.shortname}</td>
                  <td>{dayjs(leave.from).format("DD-MM-YYYY")}</td>
                  <td>{dayjs(leave.to).format("DD-MM-YYYY")}</td>
                  <td>{leave.leave_duration}</td>
                  <td>{leave.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ScrollArea>
      ) : (
        <div>
          <p>You have not taken any leaves</p>
        </div>
      )}
    </section>
  );
}
