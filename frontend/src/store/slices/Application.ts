import Axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Reloader } from "@/components/Tools";

import { STATUSES } from "@/store/slices/status";
const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
export interface ApplicationDataType {
  jobId: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  experienceYears: string;
  currentJobTitle: string;
  expectedSalary: string;
  noticePeriod: string;
  resume: string;
  _id?: string;
}

interface ApplicationState {
  data: ApplicationDataType[];
  status: STATUSES;
}


const initialState: ApplicationState = {
  data: [],
  status: STATUSES.LOADING,
};


export const FetchApplication = createAsyncThunk<ApplicationDataType[]>(
  "application/fetch",
  async () => {
    const response = await fetch(`${baseURL}/application`);
    const data = await response.json();
    return data.application;
  }
);

export const CreateApplication = createAsyncThunk<
  ApplicationDataType,
  ApplicationDataType
>("application/create", async (data, { rejectWithValue }: any) => {
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
});


export const DeleteApplication = createAsyncThunk<void, string>(
  "application/delete",
  async (id) => {
    try {
      await Axios.post(`${baseURL}/application/delete/${id}`).then(() => {
        toast.info("Application deleted successfully!");
        Reloader(1000);
      });
    } catch (error) {
      console.error("Error deleting application:", error);
      toast.error("Internal server error!");
    }
  }
);

interface UpdateApplicationArgs {
  data: Partial<ApplicationDataType>;
  id: string;
}

export const UpdateApplication = createAsyncThunk<
  ApplicationDataType,
  UpdateApplicationArgs
>("application/update", async ({ data, id }, { rejectWithValue }: any) => {
  try {
    const response = await Axios.post(`${baseURL}/application/update/${id}`, data);
    toast.success("Application updated successfully!");
    Reloader(1000);
    return response.data;
  } catch (error: any) {
    toast.error("Failed to update application");
    return rejectWithValue(error.response?.data || "An error occurred");
  }
});

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
