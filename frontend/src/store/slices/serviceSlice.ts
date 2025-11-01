import Axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Reloader } from "@/components/Tools";
import { STATUSES } from "@/store/slices/status";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/taxque/api";


export interface TableState {
  headers: string[];
  rows: Array<Record<string, string>>;
};

export interface stepDataType {
  title: string;
  summary: { summary: string }[];
  steps: { step: string }[];
}
export interface DueDateableType {
  quarter: string;
  period: string;
  TDSReturnDue: string;
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
  display?: string;
  _id?: string;
}

// Define the initial state type
interface ServiceState {
  data: ServiceDataType[];        // all products
  Service: ServiceDataType | null; // single product
  status: string;
}

const initialState: ServiceState = {
  data: [],
  Service: null,
  status: STATUSES.LOADING,
};

// Fetch Services
export const FetchService = createAsyncThunk<ServiceDataType[]>(
  "service/fetch",
  async () => {
    const response = await Axios.get(`${baseURL}/service`);
    return response.data.data || response.data; 
  }
);

export const FetchServiceById = createAsyncThunk<ServiceDataType, { slug: string }>(
  "serviceById/fetch",
  async ({ slug }, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`${baseURL}/service/${slug}`);
      // Backend returns the service directly, or wrapped in a data property
      return response.data?.data || response.data;
    } catch (error: any) {
      // Return error message for handling in the reducer
      return rejectWithValue(error.response?.data?.message || "Failed to fetch service");
    }
  }
);

export const CreateService = createAsyncThunk<ServiceDataType, ServiceDataType>(
  "service/create",
  async (data, { rejectWithValue }: any) => {
    try {
      const response = await Axios.post(`${baseURL}/service/create`, {
        ...data,
      });
      toast.success("Service created successfully.");
      Reloader(600);
      return response.data;
    } catch (error: any) {
      toast.error("Something went wrong", error.response?.data);
      console.log(error.response?.data);
      Reloader(600);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);


export const DeleteService = createAsyncThunk<void, string>(
  "service/delete",
  async (id) => {
    try {
      await Axios.post(`${baseURL}/service/delete/${id}`).then(() => {
        toast.info("Service deleted successfully!");
        Reloader(1000);
      });
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error("Internal server error!");
      Reloader(600);
    }
  }
);


export const AddFAQ = createAsyncThunk<FAQType, FAQArgs>(
  "service/faq/add",
  async ({ data, id }, { rejectWithValue }: any) => {
    try {
      const response = await Axios.post(
        `${baseURL}/service/faq/add/${id}`,
        data
      );
      toast.success("FAQ added successfully!");
      Reloader(1000);
      return response.data;
    } catch (error: any) {
      toast.error("Failed to add FAQ");
      Reloader(600);
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);


export const UpdateFAQ = createAsyncThunk<FAQUpdatTeype, FAQUpdatTeypeArgs>(
  "faq/update",
  async ({ data }, { rejectWithValue }: any) => {
    try {
      const response = await Axios.post(`${baseURL}/service/faq/update`, data);
      toast.success("FAQ updated successfully!");
      Reloader(1000);
      return response.data;
    } catch (error: any) {
      toast.error("Failed to update FAQ");
      Reloader(600);
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export const DeleteFAQ = createAsyncThunk<void, object>(
  "faq/delete",
  async (ids) => {
    try {
      await Axios.post(`${baseURL}/service/faq/delete`, ids).then(() => {
        toast.info("FAQ deleted successfully!");
        Reloader(1000);
      });
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      toast.error("Internal server error!");
      Reloader(600);
    }
  }
);


export const AddPrice = createAsyncThunk<priceDataProps, priceArgs>(
  "service/price/add",
  async ({ data, id }, { rejectWithValue }: any) => {
    try {
      const response = await Axios.post(
        `${baseURL}/service/price/add/${id}`,
        data
      );
      toast.success("Price plan added successfully!");
      return response.data;
    } catch (error: any) {
      toast.error("Failed to add price plan");
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export const UpdatePlan = createAsyncThunk<
  priceDataUpdateProps,
  priceUpdateArgs
>("service/price/update", async ({ data, id, priceItemId }, { rejectWithValue }: any) => {
  try {
    const response = await Axios.post(
      `${baseURL}/service/price/update/${id}/${priceItemId}`,
      data
    );
    toast.success("Price plan updated successfully!");
    Reloader(1000);
    return response.data;
  } catch (error: any) {
    toast.error("Failed to update price plan!");
    Reloader(600);
    return rejectWithValue(error.response?.data || "An error occurred");
  }
});


export const DeletePricePlan = createAsyncThunk<
  void,
  { id: string; priceItemId: string }
>("service/price/delete", async ({ id, priceItemId }) => {
  try {
    await Axios.post(
      `${baseURL}/service/price/delete/${id}/${priceItemId}`
    ).then(() => {
      toast.info("Price plan deleted successfully!");
      Reloader(1000);
    });
  } catch (error) {
    console.error("Error deleting price plan:", error);
    toast.error("Internal server error!");
    Reloader(600);
  }
});

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

    // Fetch product by ID
    builder
      .addCase(FetchServiceById.pending, (state) => {
        state.status = STATUSES.LOADING;
        state.Service = null; // Clear previous service when starting new fetch
      })
      .addCase(FetchServiceById.fulfilled, (state, action) => {
        state.Service = action.payload; 
        state.status = STATUSES.IDLE;
      })
      .addCase(FetchServiceById.rejected, (state) => {
        state.status = STATUSES.ERROR;
        state.Service = null; // Clear service on error
      });

    
    builder
      .addCase(CreateService.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(CreateService.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.status = STATUSES.IDLE;
      })
      .addCase(CreateService.rejected, (state) => {
        state.status = STATUSES.ERROR;
      });

 
    builder
      .addCase(DeleteService.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(DeleteService.fulfilled, (state, action) => {
        state.data = state.data.filter((p) => p._id !== action.meta.arg);
        state.status = STATUSES.IDLE;
      })
      .addCase(DeleteService.rejected, (state) => {
        state.status = STATUSES.ERROR;
      });

    
    builder
      .addCase(AddFAQ.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(AddFAQ.fulfilled, (state, action) => {
        const { id } = action.meta.arg;
        const product = state.data.find((p) => p._id === id);
        if (product) {
          product.FAQ = [...(product.FAQ || []), action.payload];
        }
        state.status = STATUSES.IDLE;
      })
      .addCase(AddFAQ.rejected, (state) => {
        state.status = STATUSES.ERROR;
      });

    
    builder
      .addCase(DeleteFAQ.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(DeleteFAQ.fulfilled, (state, action) => {
        const { productId, faqId } = action.meta.arg as any;
        const product = state.data.find((p) => p._id === productId);
        if (product?.FAQ) {
          product.FAQ = product.FAQ.filter((faq) => faq._id !== faqId);
        }
        state.status = STATUSES.IDLE;
      })
      .addCase(DeleteFAQ.rejected, (state) => {
        state.status = STATUSES.ERROR;
      });

    
    builder
      .addCase(AddPrice.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(AddPrice.fulfilled, (state, action) => {
        const { id } = action.meta.arg;
        const product = state.data.find((p) => p._id === id);
        if (product) {
          product.priceData = [...(product.priceData || []), action.payload];
        }
        state.status = STATUSES.IDLE;
      })
      .addCase(AddPrice.rejected, (state) => {
        state.status = STATUSES.ERROR;
      });

    
    builder
      .addCase(UpdatePlan.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(UpdatePlan.fulfilled, (state, action) => {
        const { id, priceItemId } = action.meta.arg;
        const product = state.data.find((p) => p._id === id);
        if (product?.priceData) {
          product.priceData = product.priceData.map((plan) =>
            plan._id === priceItemId ? { ...plan, ...action.payload } : plan
          );
        }
        state.status = STATUSES.IDLE;
      })
      .addCase(UpdatePlan.rejected, (state) => {
        state.status = STATUSES.ERROR;
      });

    builder
      .addCase(DeletePricePlan.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(DeletePricePlan.fulfilled, (state, action) => {
        const { id, priceItemId } = action.meta.arg;
        const product = state.data.find((p) => p._id === id);
        if (product?.priceData) {
          product.priceData = product.priceData.filter(
            (plan) => plan._id !== priceItemId
          );
        }
        state.status = STATUSES.IDLE;
      })
      .addCase(DeletePricePlan.rejected, (state) => {
        state.status = STATUSES.ERROR;
      });
  }

});

export const { get } = serviceSlice.actions;
export default serviceSlice.reducer;
