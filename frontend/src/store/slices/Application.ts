import Axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Reloader } from "@/components/Tools";

import { STATUSES } from "@/store/slices/status";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/taxque/api";

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
    
    // Backend now returns: { success: true, message: "...", application: {...} }
    const responseData = response.data;
    
    if (responseData.success && responseData.application) {
      toast.success(responseData.message || "Application submitted successfully!");
      return responseData.application;
    } else {
      throw new Error(responseData.message || "Failed to submit application");
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to submit application. Please try again.";
    toast.error(errorMessage);
    console.error("Application submission error:", error);
    return rejectWithValue(error.response?.data || { message: errorMessage });
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
      })
      .addCase(CreateApplication.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(CreateApplication.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.status = STATUSES.IDLE;
      })
      .addCase(CreateApplication.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(DeleteApplication.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(DeleteApplication.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
      })
      .addCase(DeleteApplication.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(UpdateApplication.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(UpdateApplication.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (app) => app._id === action.payload._id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
        state.status = STATUSES.IDLE;
      })
      .addCase(UpdateApplication.rejected, (state) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const { get } = applicationSlice.actions;
export default applicationSlice.reducer;
