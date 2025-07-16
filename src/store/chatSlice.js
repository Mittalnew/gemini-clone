import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  chatrooms: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    createChatroom: (state, action) => {
      state.chatrooms.push({
        id: nanoid(),
        title: action.payload.title,
        createdAt: new Date().toISOString(),
      });
    },
    deleteChatroom: (state, action) => {
      state.chatrooms = state.chatrooms.filter(room => room.id !== action.payload);
    },
  },
});

export const { createChatroom, deleteChatroom } = chatSlice.actions;
export default chatSlice.reducer;
