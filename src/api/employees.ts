import { axiosClient } from "./index";

export const getEmployeesApi = async () => {
  const res = await axiosClient.get("/employees");
  return res.data.employees;
};

export const getEmployeeApi = async () => {
  const res = await axiosClient.get("/employees/639032f2698601ab7fe7a5de");
  return res.data.employee;
};

export const addEmployeeApi = async (body: any) => {
  await axiosClient.post("/employees", body);
};
