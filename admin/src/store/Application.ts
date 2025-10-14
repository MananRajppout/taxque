import Axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Reloader } from "../Components/Tools";
import { STATUSES } from "./statusTypes";

export const baseURL = import.meta.env.VITE_BASE_URL;
import type { JobDataType } from "./jobSlice"


export interface ApplicationDataType {
  jobId: JobDataType;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  experienceYears: string;
  currentJobTitle: string;
  expectedSalary: string;
  noticePeriod: string;
  resume: string
  appliedDate?: string;
  status?: string;
  _id?: string;
}

interface updateApplicant {
  id: string,
  data: {
    status: string;
  }
}

interface applicationState {
  data: ApplicationDataType[];
  status: STATUSES;
}
// Initial state
const initialState: applicationState = {
  data: [],
  status: STATUSES.LOADING,
};

//Fetch application
export const FetchApplication = createAsyncThunk<ApplicationDataType[]>(
  "application/fetch",
  async () => {
    const response = await fetch(`${baseURL}/application`);
    const data = await response.json();
    return data;
  }
);

// create Application
export const CreateApplication = createAsyncThunk<ApplicationDataType, ApplicationDataType>(
  "application/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Axios.post(`${baseURL}/application/create`, {
        ...data,
      });
      toast.success("Application created successfully.");
      Reloader(600);
      return response.data;
    } catch (error: any) {
      toast.error("Something went wrong", error.response?.data);
      Reloader(900);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

//Delete applicant
export const DeleteApplicant = createAsyncThunk<void, string>(
  "applicant/delete",
  async (id) => {
    try {
      await Axios.post(`${baseURL}/application/delete/${id}`).then(() => {
        toast.info("Application deleted successfully !");
        Reloader(1000);
      });
    } catch (error) {
      console.error("Error deleting Application:", error);
      toast.error("Internal server error!");
    }
  }
);

export const UpdateApplicant = createAsyncThunk<ApplicationDataType, updateApplicant>(
  "applicant/update",
  async ({ data, id }, { rejectWithValue }) => {
    try {
      const response = await Axios.post(`${baseURL}/application/update/${id}`, data);
      toast.success("Application status updated successfully !");
      Reloader(1000);
      return response.data;
    } catch (error: any) {
      toast.error("Failed to update application!");
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    get: (state, action: PayloadAction<ApplicationDataType[]>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(FetchApplication.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(FetchApplication.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(FetchApplication.rejected, (state) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const { get } = applicationSlice.actions;
export default applicationSlice.reducer;
