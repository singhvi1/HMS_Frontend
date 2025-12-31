import { createSelector, createSlice } from "@reduxjs/toolkit";
import { rooms as mockRooms } from "../../../data";

const initialState = {
  items: mockRooms,
  filters: {
    search: "",
    block: "",
    is_active: ""
  },
  pagination: {
    page: 1,
    pageSize: 10
  }
};

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    setRooms: (state, action) => {
      state.items = action.payload;
    },
    setRoomsFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1;
    },
    setRoomsPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    setRoomsPageSize: (state, action) => {
      state.pagination.pageSize = action.payload;
      state.pagination.page = 1;
    },
    resetRoomsFilters: (state) => {
      state.filters = initialState.filters;
      state.pagination = initialState.pagination;
    }
  }
});

export const {
  setRooms,
  setRoomsFilters,
  setRoomsPage,
  setRoomsPageSize,
  resetRoomsFilters
} = roomsSlice.actions;

const selectRoomState = (state) => state.rooms;
export const selectRoomById = (id) => (state) => state.rooms.items.find((r) => r._id === id);
export const selectRoomsItems = (state) => selectRoomState(state).items
export const selectRoomsFilters = (state) => selectRoomState(state).filters
export const selectRoomsPagination = (state) => selectRoomState(state).pagination

export const selectRoomsFiltered = createSelector(
  [selectRoomsItems, selectRoomsFilters],
  (items = [], filters) => {
    if (!filters) return items;
    const q = (filters?.search || "").trim().toLowerCase()
    return (
      items.filter((item) => {
        const roomNumber = String(item.room_number || "").toLowerCase();
        const block = String(item.block || "").toLowerCase();
        const matchSearch = !q || roomNumber.includes(q) ||
          block.includes(q) || `${block}-${roomNumber}`.includes(q);
        const matchBlock = !filters.block || block == filters.block.toLowerCase();
        const matchActive = filters.is_active === "" ||
          item.is_active === (filters.is_active === "true");
        return matchActive && matchSearch && matchBlock;
      })
    )
  })
export const selectRoomsPageData = createSelector(
  [selectRoomsFiltered, selectRoomsPagination],
  (filtered = [], { page, pageSize }) => {
    const startIndx = (page - 1) * pageSize;
    const endIndx = (startIndx + pageSize)
    return {
      items: filtered?.slice(startIndx, endIndx),
      page,
      pageSize,
      totalPages: Math.max(1, Math.ceil(filtered?.length / pageSize))
    }
  }
)
export const selectRoomsTotalCount = createSelector(
  [selectRoomsItems],
  (items) => items.length
)

export const selectRoomsActiveCount = createSelector(
  [selectRoomsItems],
  (items) => items.filter((room) => room.is_active).length
)



export default roomsSlice.reducer;
