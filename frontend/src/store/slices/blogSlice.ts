import Axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Reloader } from "@/components/Tools";
import { STATUSES } from "@/store/slices/status";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/taxque/api";

export interface blogTextType {
  title: string;
  summarys: { summary: string }[];
}
export interface FAQType {
  question: string;
  answer: string;
  _id?: string;
}
export interface CommentType {
  name: string;
  email: string;
  comment: string;
  date?: string;
  _id?: string;
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
  status?: string;
  tags?: string[];
  FAQ?: FAQType[];
  allowComments?: boolean;
  _id?: string;
}
interface UpdateBlogArgs {
  id: string;
  data: BlogDataType;
}
interface blogState {
  data: BlogDataType[];
  Blog: BlogDataType | null;
  blogsByTag: BlogDataType[];
  comments: CommentType[];
  tagInfo: {
    tagName: string | null;
    tagDescription?: string;
    tagMetaTitle?: string;
    tagMetaDescription?: string;
  } | null;
  status: STATUSES;
}

const initialState: blogState = {
  data: [],
  Blog: null,
  blogsByTag: [],
  comments: [],
  tagInfo: null,
  status: STATUSES.LOADING,
};

export const FetchBlog = createAsyncThunk<BlogDataType[]>(
  "blog/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`${baseURL}/blogs`);
      // Handle multiple response formats and ensure we always return an array
      const blogData = response.data?.data || response.data?.blog || response.data || [];
      return Array.isArray(blogData) ? blogData : [];
    } catch (error: any) {
      console.error('Error fetching blogs:', error);
      return rejectWithValue([]);
    }
  }
);


export const FetchBlogBySlug = createAsyncThunk<BlogDataType, { slug: string }>(
  "blogBySlug/fetch",
  async ({ slug }, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`${baseURL}/blog/${slug}`);
      return response.data || {};
    } catch (error: any) {
      console.error('Error fetching blog by slug:', error);
      return rejectWithValue({} as BlogDataType);
    }
  }
);

export interface BlogsByTagResponse {
  blog: BlogDataType[];
  tagName: string | null;
  tagDescription?: string;
  tagMetaTitle?: string;
  tagMetaDescription?: string;
}

export const FetchBlogsByTag = createAsyncThunk<BlogsByTagResponse, { tagSlug: string }>(
  "blogsByTag/fetch",
  async ({ tagSlug }, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`${baseURL}/blogs/tag/${tagSlug}`);
      // Ensure response.data exists and has the expected structure
      if (response.data) {
        return response.data;
      }
      // Return default structure if response.data is empty
      return {
        blog: [],
        tagName: null,
        tagDescription: undefined,
        tagMetaTitle: undefined,
        tagMetaDescription: undefined
      };
    } catch (error: any) {
      console.error('Error fetching blogs by tag:', error);
      // Return default structure on error
      return {
        blog: [],
        tagName: null,
        tagDescription: undefined,
        tagMetaTitle: undefined,
        tagMetaDescription: undefined
      };
    }
  }
);


export const CreateBlog = createAsyncThunk<BlogDataType, BlogDataType>(
  "blog/create",
  async (data, { rejectWithValue }: any) => {
    try {
      const response = await Axios.post(`${baseURL}/blog/create`, {
        ...data,
      });
      toast.success("Blog created successfully.");
      Reloader(600);
      return response.data;
    } catch (error: any) {
      toast.error("Something went wrong", error.response?.data);
      Reloader(900);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const DeleteBlog = createAsyncThunk<void, string>(
  "blog/delete",
  async (id) => {
    try {
      await Axios.post(`${baseURL}/blog/delete/${id}`).then(() => {
        toast.info("Blog deleted successfully!");
        Reloader(1000);
      });
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Internal server error!");
    }
  }
);

export const UpdateBlog = createAsyncThunk<BlogDataType, UpdateBlogArgs>(
  "blog/update",
  async ({ data, id }, { rejectWithValue }: any) => {
    try {
      const response = await Axios.post(`${baseURL}/blog/update/${id}`, data);
      toast.success("Blog updated successfully!");
      Reloader(1000);
      return response.data;
    } catch (error: any) {
      toast.error("Failed to update blog");
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export interface AddCommentArgs {
  blogId: string;
  name: string;
  email: string;
  comment: string;
}

export const AddBlogComment = createAsyncThunk<void, AddCommentArgs>(
  "blog/comment/add",
  async ({ blogId, name, email, comment }, { rejectWithValue, dispatch }) => {
    try {
      const response = await Axios.post(`${baseURL}/blog/comment/add`, {
        blogId,
        name,
        email,
        comment,
      });
      toast.success(response.data?.message || "Comment submitted successfully.");
      // Refresh comments after adding
      if (response.data) {
        // We'll need to fetch comments again, but we don't have slug here
        // So we'll handle this in the component
      }
      return;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to submit comment";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const FetchBlogComments = createAsyncThunk<CommentType[], { slug: string }>(
  "blog/comments/fetch",
  async ({ slug }, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`${baseURL}/blog/${slug}/comments`);
      return response.data?.comments || [];
    } catch (error: any) {
      console.error('Error fetching comments:', error);
      return rejectWithValue([]);
    }
  }
);

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

    builder
      .addCase(FetchBlogBySlug.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(FetchBlogBySlug.fulfilled, (state, action) => {
        state.Blog = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(FetchBlogBySlug.rejected, (state) => {
        state.status = STATUSES.ERROR;
      });

    builder
      .addCase(FetchBlogsByTag.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(FetchBlogsByTag.fulfilled, (state, action) => {
        state.blogsByTag = action.payload.blog || [];
        state.tagInfo = {
          tagName: action.payload.tagName,
          tagDescription: action.payload.tagDescription,
          tagMetaTitle: action.payload.tagMetaTitle,
          tagMetaDescription: action.payload.tagMetaDescription,
        };
        state.status = STATUSES.IDLE;
      })
      .addCase(FetchBlogsByTag.rejected, (state) => {
        state.status = STATUSES.ERROR;
        state.blogsByTag = [];
        state.tagInfo = null;
      });

    builder
      .addCase(FetchBlogComments.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(FetchBlogComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(FetchBlogComments.rejected, (state) => {
        state.status = STATUSES.ERROR;
        state.comments = [];
      });
  },
});

export const { get } = blogSlice.actions;
export default blogSlice.reducer;
