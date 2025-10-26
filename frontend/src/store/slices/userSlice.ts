import Axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Reloader } from "@/components/Tools";
import { STATUSES } from "@/store/slices/status";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/taxque/api";

export interface LocationData {
  state: string;
  city: string;
}


interface requireDocType {
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
export interface UserUpdateDataType {
  requireDoc?: {
    docTitle: String;
    docUrl: String[];
    status: String;
    rejectMessage: String;
  }
  _id?: string;
}
interface requireDocUpdateArge {
  requireDoc: requireDocType[]
  userId: string;
  productId: string;
}
export interface docType {
  docTitle?: String;
  docUrl?: String[];
  status?: String;
  rejectMessage?: String;
  _id?: string;
}
interface UpdateUserArgs {
  productId: string;
  userId: string;
  data: docType[];
  _id?: string;
}

export interface contactUserType {
  name: string;
  email: string;
  phone: string;
  location: LocationData;
  date: string
  section: string;
  service?: string;
}
export interface FindUserResponseType {
  user: UserDataType;
}

// interface UpdateDocArgs {
//   data: {
//     userId: string;
//     productId: string;
//     docId: string;
//     newMessage: string;
//     status: string;
//     docUrl: string;
//     _id?: string;
//   }
// }

interface userState {
  data: UserDataType[];
  status: STATUSES;
}

const initialState: userState = {
  data: [],
  status: STATUSES.LOADING,
};

export const FetchUser = createAsyncThunk<UserDataType[]>(
  "user/fetch",
  async () => {
    const response = await Axios.get(`${baseURL}/users`);
    return response.data.user;
  }
);

export const CreateUser = createAsyncThunk<UserDataType, UserDataType>(
  "user/create",
  async (data, { rejectWithValue }: any) => {
    try {
      const response = await Axios.post(`${baseURL}/user/create`, {
        ...data,
      });
      toast.success("User created successfully.");
      Reloader(600);
      return response.data.user;
    } catch (error: any) {
      toast.error("Something went wrong", error.response?.data);
      Reloader(900);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);


export const FindUser = createAsyncThunk<UserDataType, findUserArgeType>(
  "user/find",
  async (data, { rejectWithValue }: any) => {
    try {
      const response = await Axios.post(`${baseURL}/user/get-by-email`, {
        ...data,
      });
      const user = response.data.user;
      return user;
    } catch (error: any) {
      toast.error("Something went wrong", error.response?.data);
      Reloader(900);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);


// Get User by ID
export const GetUser = createAsyncThunk<UserDataType, { _id: string }>(
  "user/getById",
  async ({ _id }, { rejectWithValue }: any) => {
    try {
      const response = await Axios.get(`${baseURL}/user/get-by-id/${_id}`);
      const user = response.data.user;
      return user;
    } catch (error: any) {
      toast.error("Something went wrong", error.response?.data);
      Reloader(900);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Update Document
export const UpdateDoc = createAsyncThunk<UserUpdateDataType, UpdateUserArgs>(
  "user/updateDoc",
  async ({ data }, { rejectWithValue }: any) => {
    try {
      const response = await Axios.post(`${baseURL}/user/update_doc_url`, data);
      toast.success("Document URL updated successfully!");
      return response.data;
    } catch (error: any) {
      toast.error("Failed to update document URL");
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);
// Update Document URL
export const UpdateDocUrl = createAsyncThunk<requireDocType, requireDocUpdateArge>(
  "user/updateDocUrl",
  async ({ userId, productId, requireDoc }, { rejectWithValue }: any) => {
    try {
      const response = await Axios.post(`${baseURL}/user/update_doc/${userId}/${productId}`, requireDoc);
      toast.success("Document URL updated successfully!");
      return response.data;
    } catch (error: any) {
      toast.error("Failed to update document URL");
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

// export const UpdateDocUrl = createAsyncThunk<UpdateDocArgs, UpdateDocArgs>(
//   "user/updateDOCUrl",
//   async ({ data }, { rejectWithValue }) => {
//     try {
//       const response = await Axios.post(`${baseURL}/user/update_doc_url`, data);
//       toast.success("Document updated successfully !");
//       // Reloader(1000);
//       return response.data;
//     } catch (error: any) {
//       toast.error("Failed to update document");
//       return rejectWithValue(error.response?.data || "An error occurred");
//     }
//   }
// );

// Create Contact User
export const CreateContactUser = createAsyncThunk<contactUserType, contactUserType>(
  "contactUser/create",
  async (data, { rejectWithValue }: any) => {
    const selectedProductId = localStorage.getItem("selectedProduct");

    try {
      const response = await Axios.post(`${baseURL}/contact-user/create`, {
        ...data,
      });
      toast.success("Your information submitted successfully.");
      if (selectedProductId) {
        localStorage.setItem("checkoutProduct", selectedProductId);
      }
      Reloader(600);
      return response.data.user;
    } catch (error: any) {
      toast.error("Something went wrong", error.response?.data);
      Reloader(900);
      return rejectWithValue(error.response?.data || "Something went wrong");
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

      .addCase(GetUser.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(GetUser.fulfilled, (state, action) => {
        state.data = [action.payload]; // Store user in an array to match `UserDataType[]`
        state.status = STATUSES.IDLE;
      })
      .addCase(GetUser.rejected, (state) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const { get } = userSlice.actions;
export default userSlice.reducer;

