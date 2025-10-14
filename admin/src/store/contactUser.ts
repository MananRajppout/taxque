import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { STATUSES } from "./statusTypes";

export const baseURL = import.meta.env.VITE_BASE_URL;

export interface UserDataType {
  name: string;
  email: string;
  phone: string;
  location: {
    city: string,
    pin: string,
    state: string
  };
  date: string
  section: string;
  service?: string;
  _id?: string;
}

interface userState {
  data: UserDataType[];
  status: STATUSES;
}
// Initial state
const initialState: userState = {
  data: [],
  status: STATUSES.LOADING,
};

//Fetch user
export const FetchContactUser = createAsyncThunk<UserDataType[]>(
  "contact-user/fetch",
  async () => {
    const response = await fetch(`${baseURL}/contact-user`);
    const data = await response.json();
    return data.user;
  }
);


const contactUserSlice = createSlice({
  name: "contactUser",
  initialState,
  reducers: {
    get: (state, action: PayloadAction<UserDataType[]>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(FetchContactUser.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(FetchContactUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(FetchContactUser.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })
  },
});

export const { get } = contactUserSlice.actions;
export default contactUserSlice.reducer;
