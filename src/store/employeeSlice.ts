import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  accessToken: "",
  _id: "",
  name: "",
  emp_id: "",
  email: "",
  mobile_no: 0,
  joining_date: "",
  department: "",
  empType: "",
  designation: "",
  role: 0,
};

export type loginPayloadType = {
  accessToken: string;
  _id: string;
  name: string;
  emp_id: string;
  email: string;
  mobile_no: number;
  joining_date: string;
  department: string;
  empType: string;
  designation: string;
  role: number;
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signin(state, { payload }: { payload: loginPayloadType }) {
      state.isAuth = true;
      state.accessToken = payload.accessToken;
      state._id = payload._id;
      state.name = payload.name;
      state.emp_id = payload.emp_id;
      state.email = payload.email;
      state.mobile_no = payload.mobile_no;
      state.joining_date = payload.joining_date;
      state.department = payload.department;
      state.empType = payload.empType;
      state.designation = payload.designation;
      state.role = payload.role;
    },
    signout(state) {
      state.isAuth = false;
      state.accessToken = "";
      state._id = "";
      state.name = "";
      state.emp_id = "";
      state.email = "";
      state.mobile_no = 0;
      state.joining_date = "";
      state.department = "";
      state.empType = "";
      state.designation = "";
      state.role = 0;
    },
    updateToken(state, action) {
      state.accessToken = action.payload.token;
    },
  },
});

export default userSlice.reducer;

export const { signin, signout, updateToken } = userSlice.actions;
