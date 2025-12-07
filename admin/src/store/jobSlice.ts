import Axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { STATUSES } from "./statusTypes";

export const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000/taxque/api";


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
  aboutThisRole?: string;
  keyResponsibilities?: string;
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
  aboutThisRole?: string;
  keyResponsibilities?: string;
  postedDate?: number;
  jobLocation?: string;
  _id?: string;
}

interface UpdateJobArgs {
  id: string;
  data: JobUpdateDataType;
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
      setTimeout(() => window.location.reload(), 600);
      return response.data;
    } catch (error: any) {
      toast.error("Something went wrong", error.response?.data);
      setTimeout(() => window.location.reload(), 900);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);


export const DeleteJob = createAsyncThunk<void, string>(
  "job/delete",
  async (id) => {
    try {
      await Axios.post(`${baseURL}/job/delete/${id}`).then(() => {
        toast.info("Job deleted successfully !");
        setTimeout(() => window.location.reload(), 1000);
      });
    } catch (error) {
      console.error("Error deleting Job:", error);
      toast.error("Internal server error!");
    }
  }
);

export const UpdateJob = createAsyncThunk<JobUpdateDataType, UpdateJobArgs>("job/update", async ({ data, id }, { rejectWithValue }) => {
  try {
    console.log("UpdateJob - Sending request:", { id, data, url: `${baseURL}/job/update/${id}` });
    const response = await Axios.post(`${baseURL}/job/update/${id}`, data);
    console.log("UpdateJob - Response received:", response.data);
    toast.success("Job updated successfully !");
    setTimeout(() => window.location.reload(), 1000);
    return response.data.data || response.data;
  } catch (error: any) {
    console.error("UpdateJob - Error:", error);
    console.error("UpdateJob - Error response:", error.response?.data);
    toast.error(error.response?.data?.message || "Failed to update Job");
    return rejectWithValue(error.response?.data || "An error occurred");
  }
});


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
