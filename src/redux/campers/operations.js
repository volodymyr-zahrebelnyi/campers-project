import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers"
      );
      return response.data.items;
    } catch (error) {
      console.error("Error fetching campers:", error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const fetchCamperById = createAsyncThunk(
  "campers/fetchCamperById",
  async (camperId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers/${camperId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching campers data:", error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
