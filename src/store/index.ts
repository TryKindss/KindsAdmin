import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userReducer from "./slice/userSlice";
import authReducer from "./slice/authSlice";
import apiSlice from "@/api";
import consoleLogger from "./middleware";

export const store = configureStore({
  reducer: {
    userState: userReducer,
    authState: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([consoleLogger, apiSlice.middleware]),
  devTools: true,
});

setupListeners(store.dispatch);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
