import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: true,
  error: null,
  filters: {
    search: "",
    block: "",
    is_active: "",
    allocation_status: "",
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 1,
  }
};

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    setRooms: (state, action) => {
      state.items = action.payload.data;
      state.pagination.total = action.payload.count;
      state.loading = false;
      state.error = null;
    },
    setRoomError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    forceRoomRefresh: (state) => {
      state.loading = true;
      state.error = null;
    },
    setRoom: (state, action) => {
      const room = action.payload;
      const index = state.items.findIndex(r => r._id === room._id);

      if (index !== -1) {
        state.items[index] = room;
      } else {
        state.items.unshift(room);
        state.pagination.total += 1;
      }
    },
    setRoomsFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1;
      state.error = null;
    },
    setRoomsPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    setRoomsPageSize: (state, action) => {
      state.pagination.limit = action.payload;
      state.pagination.page = 1;
    },
    resetRoomsFilters: (state) => {
      state.filters = { ...initialState.filters };
      state.pagination = { ...initialState.pagination };
      state.loading = true;
      state.error = null;
    },
    resetRoomSlice: () => initialState,
  }
});

export const {
  setRooms,
  setRoom,
  setRoomError,
  forceRoomRefresh,
  setRoomsFilters,
  setRoomsPage,
  setRoomsPageSize,
  resetRoomsFilters,
  resetRoomSlice,
} = roomsSlice.actions;

const selectRoomState = (state) => state?.rooms;

export const selectAllRoomState = createSelector(
  [selectRoomState],
  (rooms) => ({
    items: rooms.items,
    loading: rooms.loading,
    error: rooms.error,
  })
)

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
      items?.filter((item) => {
        const roomNumber = String(item.room_number || "").toLowerCase();
        const block = String(item.block || "").toLowerCase();

        const matchSearch = !q || roomNumber.includes(q) ||
          block.includes(q) ||
          `${block}-${roomNumber}`.includes(q);

        const matchBlock = !filters.block || block == filters.block.toLowerCase();

        const matchActive = filters.is_active === "" ||
          item.is_active === JSON.parse(filters.is_active);
        const matchAllocationStatus = filters.allocation_status === "" ||
          item.allocation_status === (filters.allocation_status);

        return matchActive && matchSearch && matchBlock && matchAllocationStatus;
      })
    )
  })
export const selectRoomsPageData = createSelector(
  [selectRoomsFiltered, selectRoomsPagination],
  (filtered = [], { page, limit }) => {
    const startIndx = (page - 1) * limit;
    const endIndx = (startIndx + limit)
    return {
      items: filtered?.slice(startIndx, endIndx),
      page,
      limit,
      pages: Math.max(1, Math.ceil(filtered.length / limit)),
      total: filtered.length,
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
