import { ScrollArea, Table } from "@mantine/core";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { updateLeaveStatusApi } from "../../api/employeeLeaves";
import { getEmployeesWithLeavesApi } from "../../api/employees";
import Loader from "../../components/Molecules/Loader";
import {
  errNotification,
  loadingNotification,
  successNotification,
} from "../../helpers/notification";

type EmployeesWithLeavesType = {
  leave_id: string;
  emp_id: string;
  name: string;
  department: string;
  from: string;
  to: string;
  leave_duration: "full-day" | "half-day";
  status:
    | "pending-hod"
    | "pending-principal"
    | "reject-hod"
    | "approved"
    | "reject-principal";
};

export default function EmployeeLeaves() {
  const employee = useSelector(({ employee }: any) => employee);
  const queryClient = useQueryClient();

  const {
    data: employeesWithLeaves,
    isLoading,
    isError,
    error,
  } = useQuery<Array<EmployeesWithLeavesType>, any>({
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

  const updateLeaveStatusHandler = async ({
    emp_id,
    leave_id,
    whatToDo,
  }: {
    emp_id: string;
    leave_id: string;
    whatToDo: "approve" | "reject";
  }) => {
    try {
      loadingNotification({
        id: "leave",
        title: "Leave",
        message: "Updating leave status",
      });

      await updateLeaveStatusApi({
        emp_id: emp_id,
        leave_id: leave_id,
        by: employee.role === 2 ? "hod" : "principal",
        status:
          whatToDo === "approve"
            ? employee.role === 2
              ? "pending-principal"
              : "approved"
            : employee.role === 2
            ? "reject-hod"
            : "reject-principal",
      });
      await queryClient.invalidateQueries(["employees-with-leaves"]);
      successNotification({
        id: "leave",
        title: "Leave",
        message: "Leave status updated",
      });
    } catch (err: any) {
      errNotification({
        id: "leave",
        title: "Leave",
        message:
          err?.response?.data?.message ||
          err?.message ||
          "Failed to update leave status",
      });
    }
  };

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
              {employeesWithLeaves?.map((x) => (
                <tr key={x.leave_id}>
                  <td>{x.name}</td>
                  <td>{dayjs(x.from).format("DD/MM/YYYY")}</td>
                  <td>{dayjs(x.to).format("DD/MM/YYYY")}</td>
                  <td>{x.leave_duration}</td>
                  <td>{x.status}</td>
                  <td
                    onClick={() =>
                      updateLeaveStatusHandler({
                        emp_id: x.emp_id,
                        leave_id: x.leave_id,
                        whatToDo: "approve",
                      })
                    }
                    className="cursor-pointer"
                  >
                    Approve
                  </td>
                  <td
                    onClick={() =>
                      updateLeaveStatusHandler({
                        emp_id: x.emp_id,
                        leave_id: x.leave_id,
                        whatToDo: "reject",
                      })
                    }
                    className="cursor-pointer"
                  >
                    Reject
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ScrollArea>
      )}
    </section>
  );
}
