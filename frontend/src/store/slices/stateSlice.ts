import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LabelState {
  value: boolean;
}

const initialState: LabelState = {
  value: false,
};

const labelSlice = createSlice({
  name: "label",
  initialState,
  reducers: {
    toggleLabel: (state) => {
      state.value = !state.value;
    },
    setLabel: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { toggleLabel, setLabel } = labelSlice.actions;
export default labelSlice.reducer;
