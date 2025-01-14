import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload ?? initialState.token;
    },
  },
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;
