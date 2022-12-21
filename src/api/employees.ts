import { axiosClient } from "./index";

export const getEmployeesApi = async () => {
  const res = await axiosClient.get("/employees");
  return res.data.employees;
};

export const getEmployeeApi = async (id: string) => {
  const res = await axiosClient.get("/employees/byId", {
    params: {
      id: id,
    },
  });
  return res.data.employee;
};

export const getEmployeesByDepartmentApi = async (department: string) => {
  const res = await axiosClient.get("/employees/byDepartment", {
    params: {
      department: department,
    },
  });
  return res.data.employees;
};

export const addEmployeeApi = async (body: any) => {
  return await axiosClient.post("/employees", body);
};

export const getEmployeesWithLeavesApi = async () => {
  const res = await axiosClient.get("/employees/withLeaves");
  return res.data.employees;
};
