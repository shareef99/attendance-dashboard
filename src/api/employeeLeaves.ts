import { axiosClient } from "./index";

type UpdateLeaveStatusType = {
  emp_id: string;
  leave_id: string;
  by: "hod" | "principal";
  status: "pending-principal" | "reject-hod" | "approved" | "reject-principal";
};

export const updateLeaveStatusApi = async ({
  emp_id,
  leave_id,
  by,
  status,
}: UpdateLeaveStatusType) => {
  return axiosClient.put(
    "/employees/approve-leave/byHod",
    {},
    {
      params: {
        emp_id: emp_id,
        leave_id: leave_id,
        by: by,
        status: status,
      },
    }
  );
};
