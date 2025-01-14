import apiSlice from ".";

export const serviceApi = apiSlice
  .enhanceEndpoints({
    addTagTypes: ["services"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAllServices: builder.query<any, any>({
        query() {
          return {
            url: "service/get-all-services",
          };
        },
      }),
    }),
  });

export const { useGetAllServicesQuery } = serviceApi;
