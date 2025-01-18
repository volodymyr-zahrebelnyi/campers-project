import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: "",
  form: "",
  equipments: {
    AC: false,
    transmission: "",
    kitchen: false,
    TV: false,
    bathroom: false,
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setLocation(state, action) {
      state.location = action.payload;
    },
    setForm(state, action) {
      state.form = action.payload;
    },
    setEquipments(state, action) {
      state.equipments = action.payload;
    },
    clearFilters(state) {
      state.location = "";
      state.form = "";
      state.equipments = {
        AC: false,
        transmission: "",
        kitchen: false,
        TV: false,
        bathroom: false,
      };
    },
  },
});

export const { setLocation, setForm, setEquipments, clearFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
