import { RootState } from "@/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).authState.token;
    const id = (getState() as any).userState._id;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    if (id) {
      headers.set("x-user-id", id);
    }
    return headers;
  },
});

const apiSlice = createApi({
  baseQuery: baseQuery,
  endpoints: (_) => ({}),
});

export default apiSlice;
