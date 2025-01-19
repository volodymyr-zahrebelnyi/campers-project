import { createSlice } from "@reduxjs/toolkit";
import { fetchCampers, fetchCamperById } from "./operations";

const initialState = {
  campers: [],
  filteredCampers: [],
  favorites: [],
  filters: {
    location: "",
    form: "",
    features: [],
  },
  status: "idle",
  error: null,
  camper: null,
};

const campersSlice = createSlice({
  name: "campers",
  initialState,
  reducers: {
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
      state.filters = { location: "", form: "", features: [] };
      state.filteredCampers = state.campers;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.campers = action.payload || [];
        state.filteredCampers = action.payload;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch campers";
      })
      .addCase(fetchCamperById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.camper = action.payload || null;
      })
      .addCase(fetchCamperById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch camper";
      });
  },
});

export const { setFilters, setFilteredCampers, toggleFavorite, resetFilters } =
  campersSlice.actions;

export default campersSlice.reducer;
