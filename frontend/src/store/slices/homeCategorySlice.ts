import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HomeCategoryState {
  value: any | null;
}

const initialState: HomeCategoryState = {
  value: null,
};

const homeCategorySection = createSlice({
  name: 'homeCategorySection',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<any>) => {
      state.value = action.payload;
    },
  },
});

export const { setValue } = homeCategorySection.actions;
export default homeCategorySection.reducer;
