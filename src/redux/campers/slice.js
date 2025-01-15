import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  campers: [],
  filteredCampers: [],
  favorites: [], // Список ID избранных кемперов
  filters: {
    location: "",
    type: "",
    features: [],
  },
  status: "idle",
};

const campersSlice = createSlice({
  name: "campers",
  initialState,
  reducers: {
    setCampers(state, action) {
      state.campers = action.payload;
      state.filteredCampers = action.payload;
    },
    setFilters(state, action) {
      state.filters = action.payload;
    },
    setFilteredCampers(state, action) {
      state.filteredCampers = action.payload;
    },
    toggleFavorite(state, action) {
      const camperId = action.payload;
      if (state.favorites.includes(camperId)) {
        state.favorites = state.favorites.filter((id) => id !== camperId);
      } else {
        state.favorites.push(camperId);
      }
    },
    resetFilters(state) {
      state.filters = { location: "", type: "", features: [] };
      state.filteredCampers = state.campers;
    },
    setLoadingStatus(state) {
      state.status = "loading";
    },
    setIdleStatus(state) {
      state.status = "idle";
    },
    setFailedStatus(state) {
      state.status = "failed";
    },
  },
});

export const {
  setCampers,
  setFilters,
  setFilteredCampers,
  toggleFavorite,
  resetFilters,
  setLoadingStatus,
  setIdleStatus,
  setFailedStatus,
} = campersSlice.actions;

export default campersSlice.reducer;
