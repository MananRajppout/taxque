import Axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { STATUSES } from "./statusTypes";

export const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000/taxque/api";

export interface blogTextType {
  title: string;
  summarys: { summary: string }[];
}

export interface BlogDataType {
  title: string;
  Slug: string;
  metaTitle: string;
  metaDescription: string
  imageUrl?: string;
  blogText: blogTextType[];
  date?: string;
  category?: string;
  _id?: string;
}

interface BlogUpdateDataType {
  title?: string;
  Slug?: string;
  metaTitle?: string;
  metaDescription?: string
  imageUrl?: string;
  blogText?: blogTextType[];
  date?: string;
  category?: string;
  _id?: string;
}

interface UpdateBlogArgs {
  id: string;
  data: BlogUpdateDataType;
}

interface blogState {
  data: BlogDataType[];
  status: STATUSES;
}

const initialState: blogState = {
  data: [],
  status: STATUSES.LOADING,
};

export const FetchBlog = createAsyncThunk<BlogDataType[]>(
  "blog/fetch",
  async () => {
    const response = await fetch(`${baseURL}/blogs`);
    const data = await response.json();
    return data.blog;
  }
);

export const CreateBlog = createAsyncThunk<BlogDataType, BlogDataType>(
  "blog/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Axios.post(`${baseURL}/blog/create`, {
        ...data,
      });
      toast.success("Blog created successfully.");
      setTimeout(() => window.location.reload(), 600);
      return response.data;
    } catch (error: any) {
      toast.error("Something went wrong", error.response?.data);
      setTimeout(() => window.location.reload(), 900);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const DeleteBlog = createAsyncThunk<void, string>(
  "blog/delete",
  async (id) => {
    try {
      await Axios.post(`${baseURL}/blog/delete/${id}`).then(() => {
        toast.info("Blog deleted successfully !");
        setTimeout(() => window.location.reload(), 1000);
      });
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Internal server error!");
    }
  }
);

export const UpdateBlog = createAsyncThunk<
  BlogDataType,
  UpdateBlogArgs
>("blog/update", async ({ data, id }, { rejectWithValue }) => {
  try {
    const response = await Axios.post(`${baseURL}/blog/update/${id}`, data);
    toast.success("Blog updated successfully !");
    setTimeout(() => window.location.reload(), 1000);
    return response.data;
  } catch (error: any) {
    toast.error("Failed to update blog");
    return rejectWithValue(error.response?.data || "An error occurred");
  }
});

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    get: (state, action: PayloadAction<BlogDataType[]>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(FetchBlog.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(FetchBlog.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(FetchBlog.rejected, (state) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const { get } = blogSlice.actions;
export default blogSlice.reducer;
