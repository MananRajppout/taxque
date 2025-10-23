import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import serviceReducer from "./serviceSlice";
import userReducer from "./userSlice";
import contactUserReducer from "./contactUserSlice";
import blogReducer from "./blogSlice";
import teamReducer from "./teamSlice";
import jobReducer from "./jobSlice";
import applicationReducer from "./applicationSlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    service: serviceReducer,
    user: userReducer,
    contactUser: contactUserReducer,
    blog: blogReducer,
    team: teamReducer,
    job: jobReducer,
    application: applicationReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
