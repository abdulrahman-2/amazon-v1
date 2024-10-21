import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteItems: [],
};

const FavoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addToFavorite: (state, action) => {
      state.favoriteItems.push(action.payload);
    },
    removeFromFavorite: (state, action) => {
      state.favoriteItems = state.favoriteItems.filter(
        (item) => item.id !== action.payload.id
      );
    },
    resetFavorite: (state) => {
      state.favoriteItems = [];
    },
  },
});

export const { addToFavorite, removeFromFavorite, resetFavorite } =
  FavoriteSlice.actions;
export default FavoriteSlice.reducer;
