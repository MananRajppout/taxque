import Axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Reloader } from "@/components/Tools";
import { STATUSES } from "@/store/slices/status";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";


export interface CategoryDataType {
  title: string;
  summary: string;
  imageUrl: string;
  category?: string;
  imgAltTag?: string;
  Slug?:string;
  metaTitle?: string;
  metaDescription?: string;
  _id?: string;
}
export interface UpdatedCategoryValType {
  title?: string;
  Slug?:string;
  summary?: string;
  imageUrl?: string;
  imgAltTag?: string;
  metaTitle?: string;
  metaDescription?: string;
  category?: string;
}
interface UpdateCategoryArgs {
  id: string;
  data: UpdatedCategoryValType;
}

interface CategoryState {
  data: CategoryDataType[];
  status: STATUSES;
}

const initialState: CategoryState = {
  data: [],
  status: STATUSES.LOADING,
};


export const FetchCategory = createAsyncThunk<CategoryDataType[]>(
  "Category/fetch",
  async () => {
    const response = await Axios.get(`${baseURL}/category`);
    return response.data.data || response.data; // Handle both response formats
  }
);

export const CreateCategory = createAsyncThunk<CategoryDataType, CategoryDataType>(
  "Category/create",
  async (data, { rejectWithValue }: any) => {
    try {
      const response = await Axios.post(`${baseURL}/category/create`, {
        ...data,
      });
      toast.success("Category created successfully.");
      Reloader(600);
      return response.data;
    } catch (error: any) {
      toast.error("Something went wrong", error.response?.data);
      Reloader(900);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const DeleteCategory = createAsyncThunk<void, string>(
  "Category/delete",
  async (id) => {
    try {
      await Axios.post(`${baseURL}/category/delete/${id}`).then(() => {
        toast.info("Category deleted successfully!");
        Reloader(1000);
      });
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Internal server error!");
    }
  }
);

export const UpdateCategory = createAsyncThunk<
  UpdatedCategoryValType,
  UpdateCategoryArgs
>("Category/update", async ({ data, id }, { rejectWithValue }: any) => {
  try {
    const response = await Axios.post(`${baseURL}/category/update/${id}`, data);
    toast.success("Category updated successfully!");
    Reloader(1000);
    return response.data;
  } catch (error: any) {
    toast.error("Failed to update category");
    return rejectWithValue(error.response?.data || "An error occurred");
  }
});

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    get: (state, action: PayloadAction<CategoryDataType[]>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(FetchCategory.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(FetchCategory.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(FetchCategory.rejected, (state) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const { get } = categorySlice.actions;
export default categorySlice.reducer;
