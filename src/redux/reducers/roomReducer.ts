import { createSlice } from '@reduxjs/toolkit';

const roomSlice = createSlice({
  name: 'user',
  initialState: {
    rooms: []
  },
  reducers: {
    setRoomsAction: (state, action) => {
      state.rooms = action.payload;
    }
  }
});

const { reducer: roomReducer, actions } = roomSlice;
export const { setRoomsAction } = actions;
export default roomReducer;
