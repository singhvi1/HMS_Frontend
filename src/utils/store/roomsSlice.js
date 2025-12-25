import { createSelector, createSlice } from "@reduxjs/toolkit";
import { rooms as mockRooms } from "../../../data";

const initialState = {
  items: mockRooms,
  filters: {
    search: "",
    block: "",
    floor: "",
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

const selectRoomsState = (state) => state.rooms;
export const selectRoomsItems = (state) => selectRoomsState(state).items;
export const selectRoomsFilters = (state) => selectRoomsState(state).filters;
export const selectRoomsPagination = (state) => selectRoomsState(state).pagination;

export const selectRoomsFiltered = createSelector(
  [selectRoomsItems, selectRoomsFilters],
  (items, filters) => {
    const search = filters.search.trim().toLowerCase();
    return items.filter((r) => {
      const block = (r.block || "").toString().toLowerCase();
      const roomNumber = (r.room_number || "").toString().toLowerCase();
      const floor = r.floor === undefined || r.floor === null ? "" : String(r.floor);
      const isActive = r.is_active ? "active" : "inactive";

      const matchesSearch =
        !search ||
        roomNumber.includes(search) ||
        block.includes(search) ||
        `${block}-${roomNumber}`.includes(search);

      const matchesBlock = !filters.block || block === filters.block.toLowerCase();
      const matchesFloor = !filters.floor || floor === String(filters.floor);
      const matchesActive =
        !filters.is_active ||
        (filters.is_active === "true" ? r.is_active === true : r.is_active === false);

      return matchesSearch && matchesBlock && matchesFloor && matchesActive;
    });
  }
);

export const selectRoomsPageData = createSelector(
  [selectRoomsFiltered, selectRoomsPagination],
  (filtered, pagination) => {
    const total = filtered.length;
    const pageSize = pagination.pageSize;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const page = Math.min(Math.max(1, pagination.page), totalPages);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return {
      page,
      pageSize,
      total,
      totalPages,
      items: filtered.slice(start, end)
    };
  }
);

export const selectRoomsTotalCount = createSelector(
  [selectRoomsItems],
  (items) => items.length
);

export const selectRoomsActiveCount = createSelector(
  [selectRoomsItems],
  (items) => items.filter((r) => r.is_active).length
);

export default roomsSlice.reducer;
