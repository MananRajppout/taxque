import Axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { STATUSES } from "./statusTypes";

export const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000/taxque/api";

export interface requireDocType {
  docCategory: string;
  docUrlArray: {
    docTitle: string;
    docUrl: string,
    status: string;
    rejectMessage: string;
  }[]
  _id?: string;
}

export interface UserDataType {
  name: string;
  email: string;
  token?: string;
  purchase?: {
    orderData: string;
    requireDoc: requireDocType[];
    productId: string;
    _id?: string;
  }[];
  _id?: string;
}

export interface findUserArgeType {
  email: string;
}

export interface FindUserResponseType {
  user: UserDataType;
}

export interface UserUpdateDataType {
  requireDoc?: {
    docTitle: String;
    docUrl: String[];
    status: String;
    rejectMessage: String;
    _id?: string;
  }
  _id?: string;
}

export interface docType {
  docTitle?: String;
  docUrl?: String[];
  status?: String;
  rejectMessage?: String;
  _id?: string;
}

interface UpdateUserArgs {
  data: {
    userId: string;
    productId: string;
    docId: string;
    newMessage: string;
    status: string;
    _id?: string;
  }
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
export const FetchUser = createAsyncThunk<UserDataType[]>(
  "user/fetch",
  async () => {
    const response = await fetch(`${baseURL}/users`);
    const data = await response.json();
    return data.user;
  }
);

//create User
export const CreateUser = createAsyncThunk<UserDataType, UserDataType>(
  "user/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Axios.post(`${baseURL}/user/create`, {
        ...data,
      });
      toast.success("User created successfully.");
      setTimeout(() => window.location.reload(), 600);
      return response.data;
    } catch (error: any) {
      toast.error("Something went wrong", error.response?.data);
      setTimeout(() => window.location.reload(), 900);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

//Finde user by email
export const FindUser = createAsyncThunk<UserDataType, findUserArgeType>(
  "find user/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Axios.post(`${baseURL}/user/get-by-email`, {
        ...data,
      });
      toast.success("User found successfully.");
      const user = response.data.user;
      return user;
    } catch (error: any) {
      toast.error("Something went wrong", error.response?.data);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const UpdateDoc = createAsyncThunk<UpdateUserArgs, UpdateUserArgs>(
  "user/updateDOC",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await Axios.post(`${baseURL}/user/update_doc_message`, data);
      toast.success("Document updated successfully !");
      return response.data;
    } catch (error: any) {
      toast.error("Failed to update document");
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    get: (state, action: PayloadAction<UserDataType[]>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(FetchUser.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(FetchUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(FetchUser.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(CreateUser.fulfilled, (state, action) => {
        state.data.push(action.payload); // Append the new user
        state.status = STATUSES.IDLE;
      })
      .addCase(FindUser.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(FindUser.fulfilled, (state, action) => {
        state.data = [action.payload]; // Store user in an array to match `UserDataType[]`
        state.status = STATUSES.IDLE;
      })
      .addCase(FindUser.rejected, (state) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const { get } = userSlice.actions;
export default userSlice.reducer;
