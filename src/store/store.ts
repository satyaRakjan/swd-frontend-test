import { configureStore } from "@reduxjs/toolkit";
import shapeReducer from "./shapeSlice";
import userReducer from "./userSlice";


export const store = configureStore({
  reducer: {
    shape: shapeReducer,
    users: userReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
