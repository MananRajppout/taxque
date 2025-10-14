import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import userReducer from "./userSlice";
import serviceReducer from "./serviceSlice";
import blogReducer from "./blogSlice";
import teamReducer from "./teamSlice";
import jobReducer from "./jobSlice";
import applicationReducer from "./Application";
import labelReducer from "./stateSlice";
import homeCategorySectionReducer from "./homeCategorySlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    service: serviceReducer,
    blog: blogReducer,
    team: teamReducer,
    job: jobReducer,
    application: applicationReducer,
    label: labelReducer,
    homeCategorySection: homeCategorySectionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
