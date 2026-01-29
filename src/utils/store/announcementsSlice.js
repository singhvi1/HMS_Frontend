import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  listFetched: false,
  error: null,
};

const announcementSlice = createSlice({
  name: "announcements",
  initialState,
  reducers: {


    setAnnouncements(state, action) {
      state.list = action.payload;
      state.listFetched = true;
    },
    addAnnouncement(state, action) {
      state.list.unshift(action.payload);
    },
    updateOneAnnouncement(state, action) {
      const index = state.list.findIndex(
        (a) => a._id === action.payload._id
      );

      if (index !== -1) {
        state.list[index] = action.payload;
      } else {
        state.list.push(action.payload);
      }
    },
    updatefilesAnnouncement(state, action) {
      const { id, files } = action.payload;
      const index = state.list.findIndex(
        (a) => a._id === id
      );
      console.log(state.list[index], "this is state list index announcemnt")
      if (index !== -1) {
        state.list[index].announcement_files = files;
      }
    },

    removeAnnouncement(state, action) {
      state.list = state.list.filter(
        (a) => a._id !== action.payload
      );
    },
    resetAnnouncements: () => initialState,
  }
});

export const {
  setAnnouncements,
  addAnnouncement,
  updateOneAnnouncement,
  removeAnnouncement,
  resetAnnouncements, updatefilesAnnouncement
} = announcementSlice.actions;


export const selectAnnounceMentById = (id) => (state) => state.announcements.list.find((item) => item._id === id);


export default announcementSlice.reducer;
