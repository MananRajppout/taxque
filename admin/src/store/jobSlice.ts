import Axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Reloader } from "../Components/Tools";
import { STATUSES } from "./statusTypes";

export const baseURL = import.meta.env.VITE_BASE_URL;

//job Type
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

export interface JobUpdateDataType {
  title?: string;
  location?: string;
  salary?: string;
  experience?: string;
  metaTitle?: string;
  metaDescription?: string;
  type?: string;
  skills?: string[];
  description?: string;
  postedDate?: number;
  jobLocation?: string;
  _id?: string;
}
interface UpdateJobArgs {
  id: string;
  data: JobUpdateDataType;
}

// Define the initial state type
interface JobState {
  data: JobDataType[];
  status: STATUSES;
}

// Initial state
const initialState: JobState = {
  data: [],
  status: STATUSES.LOADING,
};

// **Fetch Services - Async Thunk**
export const FetchJob = createAsyncThunk<JobDataType[]>(
  "job/fetch",
  async () => {
    const response = await fetch(`${baseURL}/jobs`);
    const data = await response.json();
    return data;
  }
);

export const CreateJob = createAsyncThunk<JobDataType, JobDataType>(
  "job/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Axios.post(`${baseURL}/job/create`, {
        ...data,
      });
      toast.success("Job created successfully.");
      Reloader(600);
      return response.data;
    } catch (error: any) {
      toast.error("Something went wrong", error.response?.data);
      Reloader(900);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// **Delete job - Async Thunk**
export const DeleteJob = createAsyncThunk<void, string>(
  "job/delete",
  async (id) => {
    try {
      await Axios.post(`${baseURL}/job/delete/${id}`).then(() => {
        toast.info("Job deleted successfully !");
        Reloader(1000);
      });
    } catch (error) {
      console.error("Error deleting JOb:", error);
      toast.error("Internal server error!");
    }
  }
);

//Update Job------------------
export const UpdateJob = createAsyncThunk<JobUpdateDataType, UpdateJobArgs>("job/update", async ({ data, id }, { rejectWithValue }) => {
  try {
    const response = await Axios.post(`${baseURL}/job/update/${id}`, data);
    toast.success("Job updated successfully !");
    Reloader(1000);
    return response.data;
  } catch (error: any) {
    toast.error("Failed to update Job");
    return rejectWithValue(error.response?.data || "An error occurred");
  }
});

// **Service Slice**
const serviceSlice = createSlice({
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

export const { get } = serviceSlice.actions;
export default serviceSlice.reducer;
