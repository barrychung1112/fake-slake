import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    roomId: '',
    send: true,
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    enterRoom: (state, action) => {
      state.roomId = action.payload.roomId;
    },
    send: (state) => {
      state.send = !state.send;
    },
  },
});

export const { enterRoom, send } = appSlice.actions;

export const selectRoomId = (state) => state.app.roomId;

export const selectSend = (state) => state.app.send;

export default appSlice.reducer;
