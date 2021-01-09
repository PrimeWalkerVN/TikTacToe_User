import { createSlice } from '@reduxjs/toolkit';

const roomSlice = createSlice({
  name: 'user',
  initialState: {
    rooms: [],
    usersOnline: []
  },
  reducers: {
    setRoomsAction: (state, action) => {
      state.rooms = action.payload;
    },
    setUsersOnline: (state, action) => {
      state.usersOnline = action.payload;
    }
  }
});

const { reducer: roomReducer, actions } = roomSlice;
export const { setRoomsAction, setUsersOnline } = actions;
export default roomReducer;
