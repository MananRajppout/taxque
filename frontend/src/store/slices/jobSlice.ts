import Axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { STATUSES } from "@/store/slices/status";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";


export interface jobInpoutDataType {
  title: string;
  location: string;
  salary: string;
  metaTitle: string;
  metaDescription: string;
}

export interface JobDataType {
  title: string;
  location: string;
  salary: string;
  experience: string;
  metaTitle: string;
  metaDescription: string;
  type: string;
  skills: string[];
  description: string;
  postedDate: number;
  jobLocation: string;
  _id?: string;
}

interface JobState {
  data: JobDataType[];
  status: STATUSES;
}

const initialState: JobState = {
  data: [],
  status: STATUSES.LOADING,
};


export const FetchJob = createAsyncThunk<JobDataType[]>(
  "job/fetch",
  async () => {
    const response = await Axios.get(`${baseURL}/jobs`);
    return response.data;
  }
);


const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    get: (state, action: PayloadAction<JobDataType[]>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(FetchJob.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(FetchJob.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(FetchJob.rejected, (state) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const { get } = jobSlice.actions;
export default jobSlice.reducer;

