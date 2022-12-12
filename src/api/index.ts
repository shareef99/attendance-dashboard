import axios from "axios";
// import { getAuthRefreshToken, updateAuthToken } from "../helpers/auth";
import { store } from "../store";
// import { updateToken } from "../store/userSlice";

export const axiosClient = axios.create({
  baseURL: "http://localhost:9000/api/v1",
});

export const setUpInterceptors = () => {
  axiosClient.interceptors.request.use(
    (request) => {
      const currentState = store.getState();
      request.headers![
        "Authorization"
      ] = `Bearer ${currentState.employee.accessToken}`;
      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosClient.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      return Promise.reject(error);
    }
  );
};
