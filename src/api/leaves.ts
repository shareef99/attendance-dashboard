import { store } from "../store";
import { axiosClient } from "./index";

export const getLeavesAPi = async () => {
  const res = await axiosClient.get("/leaves");
  return res.data.leaves;
};

export const addLeaveApi = async (body: any) => {
  await axiosClient.post("/leaves", body);
};

export const applyForLeaveApi = async (body: any) => {
  return await axiosClient.post(`/employees/apply-leave`, body, {
    params: {
      id: store.getState().employee.emp_id,
    },
  });
};
