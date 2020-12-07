import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    isLoading: false
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  }
});

const { reducer: loadingReducer, actions } = loadingSlice;
export const { setIsLoading } = actions;
export default loadingReducer;
