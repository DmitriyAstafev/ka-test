import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  isModalActive: false,
  modalMessage: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = action.payload;
      localStorage.setItem("isAuth", JSON.stringify(action.payload));
    },
    setModalActive: (state, action) => {
      state.isModalActive = action.payload;
    },
    setModalMessage: (state, action) => {
      state.modalMessage = action.payload;
    },
  },
});

export const { setAuth, setModalActive, setModalMessage } = userSlice.actions;

export default userSlice.reducer;
