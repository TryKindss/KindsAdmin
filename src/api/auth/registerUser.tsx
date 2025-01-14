import apiSlice from "@/api";

interface RegisterUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const registerUserApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<any, RegisterUserPayload>({
      query: (payload) => ({
        url: "/auth/register",
        body: payload,
      }),
    }),
  }),
});

export const {} = registerUserApi;
