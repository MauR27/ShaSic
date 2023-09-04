import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

const usersDataSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { getUsers } = usersDataSlice.actions;
export default usersDataSlice.reducer;
