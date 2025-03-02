import apiSlice from "@/api";

interface RegisterUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface OnboardingDetails {
  accountName: string;
  timezone: string;
  accountsManaged: string;
  inboxesManaged: string;
  emailProvider: string;
}

interface OnboardingPayload {
  onboadingDetails: OnboardingDetails;
  userId: string;
}

export const registerUserApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<any, RegisterUserPayload>({
      query: (payload) => ({
        url: "/auth/register",
        method: "POST",
        body: payload,
      }),
    }),
    verifyEmail: builder.mutation<any, { email: string; code: string }>({
      query: (payload) => ({
        url: "/auth/verify",
        method: "POST",
        body: payload,
      }),
    }),
    resendOTP: builder.mutation<any, { email: string }>({
      query: ({ email }) => ({
        url: "/auth/resend-verification",
        method: "POST",
        body: { email },
      }),
    }),
    registerOnboarding: builder.mutation<any, OnboardingPayload>({
      query: (payload) => ({
        url: `/auth/onboarding/${payload.userId}`,
        method: "POST",
        body: payload.onboadingDetails,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useVerifyEmailMutation,
  useResendOTPMutation,
  useRegisterOnboardingMutation,
} = registerUserApi;
