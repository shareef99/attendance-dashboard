import { axiosClient } from "./index";

export const getDesignationsApi = async () => {
  const res = await axiosClient.get("/designations");
  return res.data.designations;
};
