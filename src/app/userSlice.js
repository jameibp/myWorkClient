import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  isLoggedIn: false,
  firebaseToken: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setFirebaseToken: (state, action) => {
      state.firebaseToken = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFirebaseToken, setIsLoggedIn, setUser } = userSlice.actions;

export default userSlice.reducer;
