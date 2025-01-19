import apiSlice from "@/api";

export const m365UsersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllUsers: builder.query<any, any>({
      query: () => ({
        url: "/auth/register",
        method: "GET",
      }),
    }),
  }),
});

export const { useFetchAllUsersQuery } = m365UsersApi;
