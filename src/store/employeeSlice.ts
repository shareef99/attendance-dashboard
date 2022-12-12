import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  accessToken: "",
};

export type loginPayloadType = {
  accessToken: string;
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signin(state, { payload }: { payload: loginPayloadType }) {
      state.isAuth = true;
      state.accessToken = payload.accessToken;
    },
    signout(state) {
      state.isAuth = false;
      state.accessToken = "";
    },
    updateToken(state, action) {
      state.accessToken = action.payload.token;
    },
  },
});

export default userSlice.reducer;

export const { signin, signout, updateToken } = userSlice.actions;
