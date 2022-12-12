import { axiosClient } from "./index";

export const getLeavesAPi = async () => {
  const res = await axiosClient.get("/leaves");
  return res.data.leaves;
};

export const addLeaveApi = async (body: any) => {
  await axiosClient.post("/leaves", body);
};

export const applyForLeaveApi = async (body: any, empId: string) => {
  await axiosClient.post(`/employees/apply-leave/${empId}`, body);
};
