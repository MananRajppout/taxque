import Axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { STATUSES } from "./statusTypes";

export const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000/taxque/api";

export interface BlogTag {
  _id?: string;
  name: string;
  slug: string;
  description?: string;
  status?: string;
  metaTitle?: string;
  metaDescription?: string;
}

interface State {
  data: BlogTag[];
  status: STATUSES;
}

const initialState: State = { data: [], status: STATUSES.LOADING };

export const FetchBlogTags = createAsyncThunk<BlogTag[]>(
  "blogTags/fetch",
  async () => {
    const res = await Axios.get(`${baseURL}/blog-tags`);
    return res.data?.tags || [];
  }
);

export const CreateBlogTag = createAsyncThunk<BlogTag, BlogTag>(
  "blogTags/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await Axios.post(`${baseURL}/blog-tag/create`, data);
      return res.data?.tag;
    } catch (e: any) {
      return rejectWithValue(e.response?.data || "Failed to create tag");
    }
  }
);

export const UpdateBlogTag = createAsyncThunk<BlogTag, { id: string; data: Partial<BlogTag> }>(
  "blogTags/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await Axios.post(`${baseURL}/blog-tag/update/${id}`, data);
      return res.data?.tag;
    } catch (e: any) {
      return rejectWithValue(e.response?.data || "Failed to update tag");
    }
  }
);

export const DeleteBlogTag = createAsyncThunk<string, string>(
  "blogTags/delete",
  async (id, { rejectWithValue }) => {
    try {
      await Axios.post(`${baseURL}/blog-tag/delete/${id}`);
      return id;
    } catch (e: any) {
      return rejectWithValue(e.response?.data || "Failed to delete tag");
    }
  }
);

const blogTagSlice = createSlice({
  name: "blogTags",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FetchBlogTags.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(FetchBlogTags.fulfilled, (state, action: PayloadAction<BlogTag[]>) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(FetchBlogTags.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(CreateBlogTag.fulfilled, (state, action: PayloadAction<BlogTag>) => {
        state.data.push(action.payload);
      })
      .addCase(UpdateBlogTag.fulfilled, (state, action: PayloadAction<BlogTag>) => {
        const idx = state.data.findIndex(t => t._id === action.payload._id);
        if (idx !== -1) state.data[idx] = action.payload;
      })
      .addCase(DeleteBlogTag.fulfilled, (state, action: PayloadAction<string>) => {
        state.data = state.data.filter(t => t._id !== action.payload);
      });
  },
});

export default blogTagSlice.reducer;


