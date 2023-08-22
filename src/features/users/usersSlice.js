import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: '0', name: 'Alex' },
  { id: '1', name: 'David' },
  { id: '2', name: 'Marcela' },
];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer;
