import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  accessToken: "",
  _id: "",
  name: "",
  empId: "",
  email: "",
  mobileNo: 0,
  joiningDate: "",
  department: "",
  empType: "",
  designation: "",
  role: 0,
};

export type loginPayloadType = {
  accessToken: string;
  _id: string;
  name: string;
  empId: string;
  email: string;
  mobileNo: number;
  joiningDate: string;
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
      state.empId = payload.empId;
      state.email = payload.email;
      state.mobileNo = payload.mobileNo;
      state.joiningDate = payload.joiningDate;
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
      state.empId = "";
      state.email = "";
      state.mobileNo = 0;
      state.joiningDate = "";
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
