import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface GeoLocation {
  type: string;
  coordinates: number[];
}

interface Identity {
  verified: boolean;
}

interface User {
  geoLocation: GeoLocation;
  identity: Identity;
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dob: string;
  email: string;
  city: string;
  channel: string;
  address: string;
  profilePic: string;
  accountType: string;
  supended: boolean;
  deleted: boolean;
  available: boolean;
  isEmailVerified: boolean;
  isVerified: string;
  bookmarks: any[];
  services: any[];
  communicationRating: number;
  recommendRating: number;
  serviceAsDescribedRating: number;
  averageRating: number;
  totalEarnings: number;
  referralCode: string;
  isFirstTransaction: boolean;
  lastOnline: any;
  liveTest: boolean;
  hasPinCreated: boolean;
  hasVerifyPhoneNumber: boolean;
  contact: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  fullName: string;
  id: string;
}

interface SigninResponse {
  status: string;
  message: string;
  token: string;
  user: User;
}

const initialState: SigninResponse = {
  status: "",
  message: "",
  token: "",
  user: {
    geoLocation: {
      type: "",
      coordinates: [0, 0],
    },
    identity: {
      verified: false,
    },
    _id: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    dob: "",
    email: "",
    city: "",
    channel: "",
    address: "",
    profilePic: "",
    accountType: "",
    supended: false,
    deleted: false,
    available: true,
    isEmailVerified: false,
    isVerified: "",
    bookmarks: [],
    services: [],
    communicationRating: 0,
    recommendRating: 0,
    serviceAsDescribedRating: 0,
    averageRating: 0,
    totalEarnings: 0,
    referralCode: "",
    isFirstTransaction: true,
    lastOnline: null,
    liveTest: false,
    hasPinCreated: false,
    hasVerifyPhoneNumber: false,
    contact: [],
    createdAt: "",
    updatedAt: "",
    __v: 0,
    fullName: "",
    id: "",
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
