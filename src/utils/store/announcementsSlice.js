import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  selected: null,
  loading: false,
};

const announcementSlice = createSlice({
  name: "announcement",
  initialState,
  reducers: {


    setAnnouncements(state, action) {
      state.list = action.payload;
    },

    setSelectedAnnouncement(state, action) {
      state.selected = action.payload;
    },

    clearSelectedAnnouncement(state) {
      state.selected = null;
    },


    removeAnnouncement(state, action) {
      state.list = state.list.filter(
        (a) => a._id !== action.payload
      );
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },


  }
});

export const {
  setAnnouncements,
  setSelectedAnnouncement,
  clearSelectedAnnouncement,
  addAnnouncement,
  updateAnnouncement,
  removeAnnouncement,
  setLoading,
} = announcementSlice.actions;

export default announcementSlice.reducer;
