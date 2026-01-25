import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    loading: true,
    error: null,
    filters: {
        search: "",
        block: "",
        is_active: ""
    },
    pagination: {
        page: 1,
        limit: 10,
        total: 1,
    }
};

const allotmentRoomsSlice = createSlice({
    name: "allotmentRooms",
    initialState,
    reducers: {
        setAllotmentRooms: (state, action) => {
            state.items = action.payload.data;
            state.pagination.total = action.payload.count;
            state.loading = false;
            state.error = null;
        },
        forceAllotmentRoomRefresh: (state) => {
            state.loading = true;
            state.error = null;
        },
        setAllotmentRoom: (state, action) => {
            const room = action.payload;
            const index = state.items.findIndex(r => r._id === room._id);

            if (index !== -1) {
                state.items[index] = room;
            } else {
                state.items.unshift(room);
                state.pagination.total += 1;
            }
        },
        setAllotmentRoomsLoading(state, action) {
            state.loading = action.payload;
        },
        setAllotmentRoomsError(state, action) {
            state.error = action.payload;
            state.loading = false;
        },
        setAllotmentRoomsFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
            state.pagination.page = 1;
            state.error = null;
        },
        setAllotmentRoomsPage: (state, action) => {
            state.pagination.page = action.payload;
        },
        setAllotmentRoomsPageSize: (state, action) => {
            state.pagination.limit = action.payload;
            state.pagination.page = 1;
        },
        resetAllotmentRoomsFilters: (state) => {
            state.filters = { ...initialState.filters };
            state.pagination = { ...initialState.pagination };
            state.loading = true;
            state.error = null;
        },
        resetAllotmentRoomSlice: () => initialState,
    }
});
export const {
    setAllotmentRooms,
    forceAllotmentRoomRefresh,
    setAllotmentRoom,
    setAllotmentRoomsLoading,
    setAllotmentRoomsError,
    setAllotmentRoomsFilters,
    setAllotmentRoomsPage,
    setAllotmentRoomsPageSize,
    resetAllotmentRoomsFilters,
    resetAllotmentRoomSlice,
} = allotmentRoomsSlice.actions;

const selectAllotmentRoomState = (state) => state?.allotmentRooms;

export const selectAllotmentRoomsItems = (state) =>
    selectAllotmentRoomState(state).items;

export const selectAllotmentRoomsFilters = (state) =>
    selectAllotmentRoomState(state).filters;

export const selectAllotmentRoomsPagination = (state) =>
    selectAllotmentRoomState(state).pagination;
export const selectAllotedRoomById = (roomId) => (state) => state?.allotmentRooms?.items.find((r) => r._id === roomId);


export const selectAllAllotmentRoomState = createSelector(
    [selectAllotmentRoomState],
    (rooms) => ({
        items: rooms.items,
        loading: rooms.loading,
        error: rooms.error,
    })
);

export const selectAllotmentRoomsFiltered = createSelector(
    [selectAllotmentRoomsItems, selectAllotmentRoomsFilters],
    (items = [], filters) => {
        const q = (filters?.search || "").trim().toLowerCase();

        return items.filter((room) => {
            const roomNumber = String(room.room_number || "").toLowerCase();
            const block = String(room.block || "").toLowerCase();

            const matchSearch =
                !q ||
                roomNumber.includes(q) ||
                block.includes(q) ||
                `${block}-${roomNumber}`.includes(q);

            const matchBlock =
                !filters.block || block === filters.block.toLowerCase();

            const matchActive =
                filters.is_active === "" ||
                room.is_active === JSON.parse(filters.is_active);

            return matchSearch && matchBlock && matchActive;
        });
    }
);

export const selectAllotmentRoomsPageData = createSelector(
    [selectAllotmentRoomsFiltered, selectAllotmentRoomsPagination],
    (filtered = [], { page, limit }) => {
        const start = (page - 1) * limit;
        const end = start + limit;

        return {
            items: filtered.slice(start, end),
            page,
            limit,
            pages: Math.max(1, Math.ceil(filtered.length / limit)),
            total: filtered.length,
        };
    }
);
export const selectAllotmentRoomsTotalCount = createSelector(
    [selectAllotmentRoomsItems],
    (items) => items.length
);

export const selectAllotmentRoomsActiveCount = createSelector(
    [selectAllotmentRoomsItems],
    (items) => items.filter((room) => room.is_active).length
);


export default allotmentRoomsSlice.reducer;