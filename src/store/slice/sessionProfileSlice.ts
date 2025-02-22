import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Organization {
  id: string;
  microsoftId: string;
  domain: string;
  displayName: string;
  status: string;
  ownerId: string;
  healthScore: number;
  groupsCount: number;
  usersCount: number;
  connections: string[];
  lastSyncedAt: string;
  autoSync: boolean;
}

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  status: string;
  role: string;
  hasMicrosoftSync: boolean;
  onboardingCompleted: boolean;
  organizations: Organization[];
}

export interface SessionProfileResponse {
  status: number;
  message: string;
  data: User;
}

const initialState: SessionProfileResponse = {
  status: 200,
  message: "",
  data: {
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    status: "",
    role: "",
    hasMicrosoftSync: false,
    onboardingCompleted: false,
    organizations: [],
  },
};

export const sessionProfileSlice = createSlice({
  name: "sessionProfile",
  initialState,
  reducers: {
    setSessionProfile: (state, action: PayloadAction<SessionProfileResponse | null>) => {
      state.status = action.payload?.status || initialState.status;
      state.message = action.payload?.message || initialState.message;
      state.data = action.payload?.data || initialState.data;
    },
  },
});

export const { setSessionProfile } = sessionProfileSlice.actions;
export default sessionProfileSlice.reducer;
