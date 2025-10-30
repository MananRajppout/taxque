import Axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { STATUSES } from "./statusTypes";

export const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000/taxque/api";

export interface BlogCategory {
  _id?: string;
  name: string;
  slug: string;
  description?: string;
  status?: string;
  parentId?: string | null;
  icon?: string;
  isDefault?: boolean;
  isFeatured?: boolean;
  metaTitle?: string;
  metaDescription?: string;
}

interface State {
  data: BlogCategory[];
  status: STATUSES;
}

const initialState: State = { data: [], status: STATUSES.LOADING };

export const FetchBlogCategories = createAsyncThunk<BlogCategory[]>(
  "blogCategories/fetch",
  async () => {
    const res = await Axios.get(`${baseURL}/blog-categories`);
    return res.data?.categories || [];
  }
);

export const CreateBlogCategory = createAsyncThunk<BlogCategory, BlogCategory>(
  "blogCategories/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await Axios.post(`${baseURL}/blog-category/create`, data);
      return res.data?.category;
    } catch (e: any) {
      return rejectWithValue(e.response?.data || "Failed to create category");
    }
  }
);

export const UpdateBlogCategory = createAsyncThunk<BlogCategory, { id: string; data: Partial<BlogCategory> }>(
  "blogCategories/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await Axios.post(`${baseURL}/blog-category/update/${id}`, data);
      return res.data?.category;
    } catch (e: any) {
      return rejectWithValue(e.response?.data || "Failed to update category");
    }
  }
);

const blogCategorySlice = createSlice({
  name: "blogCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FetchBlogCategories.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(FetchBlogCategories.fulfilled, (state, action: PayloadAction<BlogCategory[]>) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(FetchBlogCategories.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(CreateBlogCategory.fulfilled, (state, action: PayloadAction<BlogCategory>) => {
        state.data.push(action.payload);
      })
      .addCase(UpdateBlogCategory.fulfilled, (state, action: PayloadAction<BlogCategory>) => {
        const idx = state.data.findIndex((c) => c._id === action.payload._id);
        if (idx !== -1) state.data[idx] = action.payload;
      });
  },
});

export default blogCategorySlice.reducer;


