import { Button, Table } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { getEmployeeApi } from "../../api/employees";
import Loader from "../../components/Molecules/Loader";

export default function ApplyForLeave() {
  // Queries
  const {
    isLoading,
    isError,
    error,
    data: employee,
  } = useQuery<any, any>({
    queryFn: getEmployeeApi,
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
      <Table className="my-4" withBorder withColumnBorders striped>
        <thead>
          <tr>
            <th>Leave Name</th>
            <th>Short Name</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {employee.leaves.map((leave: any) => (
            <tr>
              <td>{leave.name}</td>
              <td>{leave.shortName}</td>
              <td>{dayjs(leave.from).format("DD-MM-YYYY")}</td>
              <td>{dayjs(leave.to).format("DD-MM-YYYY")}</td>
              <td>{leave.leaveDuration}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </section>
  );
}
