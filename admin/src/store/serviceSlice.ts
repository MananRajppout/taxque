import Axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { baseURL } from "./categorySlice";
import { STATUSES } from "./statusTypes";

export interface TableState {
  headers: string[];
  rows: Array<Record<string, string>>;
};

export interface stepDataType {
  title: string;
  summary: { summary: string }[];
  steps: { step: string }[];
}

export interface ELGBTBulletType {
  title: string;
  bulletPoints: {
    bullet: string;
  }[];
}

export interface featureDataType {
  title: string;
  summary: string;
}

export interface categoryProps {
  title: string;
  Id: string;
}

export interface FAQType {
  question: string;
  answer: string;
  _id?: string;
}

export interface FAQArgs {
  id: string;
  data: FAQType;
}

export interface FAQUpdatTeype {
  productId?: string;
  faqId?: string;
  question?: string;
  answer?: string;
  _id?: string;
}

export interface FAQUpdatTeypeArgs {
  data: FAQUpdatTeype;
}

export interface feturePointsProps {
  title: string;
  summary: string;
  _id?: string;
}

export interface priceDataProps {
  title: string;
  basicPrice: string;
  price: string;
  plan?: string;
  summary: string;
  fetures?: string[];
  MostPopular?: boolean;
  _id?: string;
}

interface priceArgs {
  id: string;
  data: priceDataProps;
}

export interface priceDataUpdateProps {
  title?: string;
  basicPrice?: string;
  price?: string;
  plan?: string;
  summary?: string;
  fetures?: string[];
  MostPopular?: boolean;
  _id?: string;
}

interface priceUpdateArgs {
  id: string;
  priceItemId: string;
  data: priceDataUpdateProps;
}

export interface ServiceInfoValType {
  title: string;
  Slug: string
  displayName: string,
  metaTitle: string;
  metaDescription: string;
}

export interface ServiceDataType {
  title: string;
  Slug: string;
  displayName: string;
  metaTitle: string;
  metaDescription: string;
  category: {
    title: string;
    id: string;
  };
  feturePoints: { title: string; summary: string }[];
  overView?: {
    title?: string;
    summarys?: string[];
  };
  whatIs?: {
    summarys: string[];
    liList: {
      title: string;
      summary: string;
    }[];
    Notice: {
      noticeTitle: string;
      noticeSummary: string;
    };
  };
  keyFeature?: {
    title: string;
    summarys: string[];
    keyFeatureItems: {
      title: string;
      summary: string;
    }[];
  };
  benefits?: {
    title: string;
    summarys: string[];
    benefitsItems: {
      title: string;
      summary: string;
    }[];
  };
  difference?: {
    title: string;
    summarys: string[];
    tableData: TableState;
  };
  documentsRequired?: {
    title: string;
    summarys: string[];
    tableData: TableState;
  };
  MCACompliance?: {
    title: string;
    summarys: string[];
    tableData: TableState;
  };
  ThresholdLimits?: {
    title: string;
    summarys: string[];
  };
  Eligibility?: {
    title: string;
    summarys: string[];
    eligibilityPoints: {
      title: string;
      bulletPoints: { bullet: string }[];
    }[];
  };
  DueDate?: {
    title: string;
    summarys: string[];
    tableData: TableState;
  };
  Steps?: stepDataType[];
  FAQ?: FAQType[];
  priceData?: priceDataProps[];
  display?: Date;
  _id?: string;
}

interface UpdateServiceType {
  title?: string;
  Slug?: string;
  displayName?: string;
  metaTitle?: string;
  metaDescription?: string;
  category?: {
    title: string;
    id: string;
  };
  feturePoints?: { title: string; summary: string }[];
  overView?: {
    title?: string;
    summarys?: string[];
  };
  whatIs?: {
    summarys?: string[];
    liList: {
      title: string;
      summary: string;
    }[];
    Notice: {
      noticeTitle: string;
      noticeSummary: string;
    };
  };
  keyFeature?: {
    title: string;
    summarys: string[];
    keyFeatureItems: {
      title: string;
      summary: string;
    }[];
  };
  benefits?: {
    title: string;
    summarys: string[];
    benefitsItems: {
      title: string;
      summary: string;
    }[];
  };
  difference?: {
    title: string;
    summarys: string[];
    tableData: TableState;
  };
  documentsRequired?: {
    title: string;
    summarys: string[];
    tableData: TableState;
  };
  MCACompliance?: {
    title: string;
    summarys: string[];
    tableData: TableState;
  };
  ThresholdLimits?: {
    title: string;
    summarys: string[];
  };
  Eligibility?: {
    title: string;
    summarys: string[];
    eligibilityPoints: {
      title: string;
      bulletPoints: { bullet: string }[];
    }[];
  };
  DueDate?: {
    title: string;
    summarys: string[];
    tableData: TableState;
  };
  Steps?: stepDataType[];
  FAQ?: FAQType[];
  priceData?: priceDataProps[];
  display?: Date;
  _id?: string;
}

interface UpdateServiceArgs {
  id: string;
  data: UpdateServiceType;
}

// Define the initial state type
interface ServiceState {
  data: ServiceDataType[];
  status: STATUSES;
}

// Initial state
const initialState: ServiceState = {
  data: [],
  status: STATUSES?.LOADING,
};

// **Fetch Services - Async Thunk**
export const FetchService = createAsyncThunk<ServiceDataType[]>(
  "Service/fetch",
  async () => {
    const response = await fetch(`${baseURL}/service`);
    const data = await response.json();
    return data;
  }
);

export const CreateService = createAsyncThunk<ServiceDataType, ServiceDataType>(
  "Service/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Axios.post(`${baseURL}/service/create`, {
        ...data,
      });
      toast.success("Service created successfully.");
      setTimeout(() => window.location.reload(), 600);
      return response.data;
    } catch (error: any) {
      toast.error("Something went wrong", error.response?.data);
      console.log(error.response?.data);
      setTimeout(() => window.location.reload(), 600);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

//Delete Service
export const DeleteService = createAsyncThunk<void, string>(
  "Service/delete",
  async (id) => {
    try {
      await Axios.post(`${baseURL}/service/delete/${id}`).then(() => {
        toast.info("Service deleted successfully !");
        setTimeout(() => window.location.reload(), 1000);
      });
    } catch (error) {
      console.error("Error deleting Service:", error);
      toast.error("Internal server error!");
      setTimeout(() => window.location.reload(), 600);
    }
  }
);

// Update Service----------------------------------------------
export const UpdateService = createAsyncThunk<
  UpdateServiceType,
  UpdateServiceArgs
>("product/update", async ({ data, id }, { rejectWithValue }) => {
  try {
    const response = await Axios.post(`${baseURL}/service/update/${id}`, data);
    toast.success("Service updated successfully !");
    setTimeout(() => window.location.reload(), 1000);
    return response.data;
  } catch (error: any) {
    toast.error("Failed to update Service");
    setTimeout(() => window.location.reload(), 600);
    return rejectWithValue(error.response?.data || "An error occurred");
  }
});

//Add FAQ
export const AddFAQ = createAsyncThunk<FAQType, FAQArgs>(
  "Service/FAQ/update",
  async ({ data, id }, { rejectWithValue }) => {
    try {
      const response = await Axios.post(
        `${baseURL}/service/faq/add/${id}`,
        data
      );
      toast.success("FAQ updated successfully !");
      setTimeout(() => window.location.reload(), 1000);
      return response.data;
    } catch (error: any) {
      toast.error("Failed to update FAQ");
      setTimeout(() => window.location.reload(), 600);
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

//Update FAQ----------------------------------------------
export const UpdateFAQ = createAsyncThunk<FAQUpdatTeype, FAQUpdatTeypeArgs>(
  "faq/update",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await Axios.post(`${baseURL}/service/faq/update`, data);
      toast.success("FAQ updated successfully !");
      setTimeout(() => window.location.reload(), 1000);
      return response.data;
    } catch (error: any) {
      toast.error("Failed to update FAQ");
      setTimeout(() => window.location.reload(), 600);
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

//Delete FAQ
export const DeleteFAQ = createAsyncThunk<void, object>(
  "faq/delete",
  async (ids) => {
    try {
      await Axios.post(`${baseURL}/service/faq/delete`, ids).then(() => {
        toast.info("FAQ deleted successfully !");
        setTimeout(() => window.location.reload(), 1000);
      });
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      toast.error("Internal server error!");
      setTimeout(() => window.location.reload(), 600);
    }
  }
);

//Add price
export const AddPrice = createAsyncThunk<priceDataProps, priceArgs>(
  "Service/price/add",
  async ({ data, id }, { rejectWithValue }) => {
    try {
      const response = await Axios.post(
        `${baseURL}/service/price/add/${id}`,
        data
      );
      toast.success("Add price plan successfully!");
      setTimeout(() => window.location.reload(), 1000);
      return response.data;
    } catch (error: any) {
      toast.error("Failed to add price plan");
      setTimeout(() => window.location.reload(), 600);
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

//Update Price plan
export const UpdatePlan = createAsyncThunk<
  priceDataUpdateProps,
  priceUpdateArgs
>("price/update", async ({ data, id, priceItemId }, { rejectWithValue }) => {
  try {
    const response = await Axios.post(
      `${baseURL}/service/price/update/${id}/${priceItemId}`,
      data
    );
    toast.success("Price plan updated successfully !");
    setTimeout(() => window.location.reload(), 1000);
    return response.data;
  } catch (error: any) {
    toast.error("Failed to update Price plan!");
    setTimeout(() => window.location.reload(), 600);
    return rejectWithValue(error.response?.data || "An error occurred");
  }
});

//Delete Price plan
export const DeletePricePlan = createAsyncThunk<
  void,
  { id: string; priceItemId: string }
>("pricePlan/delete", async ({ id, priceItemId }) => {
  try {
    await Axios.post(
      `${baseURL}/service/price/delete/${id}/${priceItemId}`
    ).then(() => {
      toast.info("Plan deleted successfully !");
      setTimeout(() => window.location.reload(), 1000);
    });
  } catch (error) {
    console.error("Error deleting Plan:", error);
    toast.error("Internal server error!");
    setTimeout(() => window.location.reload(), 600);
  }
});

// **Service Slice**
const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    get: (state, action: PayloadAction<ServiceDataType[]>) => {
      state.data = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(FetchService.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(FetchService.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(FetchService.rejected, (state) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const { get } = serviceSlice.actions;
export default serviceSlice.reducer;
