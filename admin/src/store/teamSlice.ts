import Axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { STATUSES } from "./statusTypes";

export const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000/taxque/api";

export interface TeamInputDataType {
  name: string;
  email: string;
  role: string;
  facebook: string;
  twitter: string
  linkedin: string
}

export interface TeamInputDataUpdateType {
  name?: string;
  email?: string;
  role?: string;
  facebook?: string;
  twitter?: string
  linkedin?: string
}

interface TeamDataType {
  name: string;
  email: string;
  imgUrl: string;
  role: string;
  summary: string;
  media: {
    facebook: string;
    twitter: string
    linkedin: string
  }
  _id?: string;
}

interface TeamDataUpdateType {
  name?: string;
  email?: string;
  imgUrl?: string;
  role?: string;
  summary?: string;
  media?: {
    facebook?: string;
    twitter?: string
    linkedin?: string
  }
  _id?: string;
}

interface TeamUpdateDataArgs {
  id: string,
  data: TeamDataUpdateType
}

interface teamState {
  data: TeamDataType[];
  status: STATUSES;
}

// Initial state
const initialState: teamState = {
  data: [],
  status: STATUSES.LOADING,
};

//Fetch team
export const FetchTeam = createAsyncThunk<TeamDataType[]>(
  "team/fetch",
  async () => {
    const response = await fetch(`${baseURL}/teams`);
    const data = await response.json();
    return data;
  }
);

//create Team
export const CreateTeam = createAsyncThunk<TeamDataType, TeamDataType>(
  "team/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Axios.post(`${baseURL}/team/create`, {
        ...data,
      });
      toast.success("Team created successfully.");
      setTimeout(() => window.location.reload(), 600);
      return response.data;
    } catch (error: any) {
      toast.error("Something went wrong", error.response?.data);
      setTimeout(() => window.location.reload(), 900);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const UpdateTeam = createAsyncThunk<TeamDataUpdateType, TeamUpdateDataArgs>(
  "team/update",
  async ({ data, id }, { rejectWithValue }) => {
    try {
      const response = await Axios.post(`${baseURL}/team/update/${id}`, data);
      toast.success("Team update successfully !");
      setTimeout(() => window.location.reload(), 1000);
      return response.data;
    } catch (error: any) {
      toast.error("Failed to update Team");
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export const DeleteTeam = createAsyncThunk<void, string>(
  "team/delete",
  async (id) => {
    try {
      await Axios.post(`${baseURL}/team/delete/${id}`).then(() => {
        toast.info("Team deleted successfully !");
        setTimeout(() => window.location.reload(), 1000);
      });
    } catch (error) {
      console.error("Error deleting team:", error);
      toast.error("Internal server error!");
    }
  }
)

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    get: (state, action: PayloadAction<TeamDataType[]>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(FetchTeam.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(FetchTeam.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(FetchTeam.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(CreateTeam.fulfilled, (state, action) => {
        state.data.push(action.payload); // Append the new team member
        state.status = STATUSES.IDLE;
      })
  },
});

export const { get } = teamSlice.actions;
export default teamSlice.reducer;
