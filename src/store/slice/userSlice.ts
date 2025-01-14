import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface GeoLocation {
  type: string;
  coordinates: number[];
}

interface Identity {
  verified: boolean;
}

interface User {
  onboardingCompleted: boolean;
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
  verificationToken: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  __v: number;
}

interface SigninResponse {
  status: number;
  message: string;
  access_token: string;
  user: User;
}

const initialState: SigninResponse = {
  status: "",
  message: "",
  access_token: "",
  user: {
    onboardingCompleted: false,
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    status: "",
    verificationToken: "",
    createdAt: "",
    updatedAt: "",
    __v: 0,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<SigninResponse | null>) => {
      return action.payload ? { ...state, ...action.payload } : initialState;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
