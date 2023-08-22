import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    //Increment Action
    increment: (state) => {
      state.count += 1;
    },
    // Decrement Action
    decrement: (state) => {
      state.count -= 1;
    },
    // Reset Action
    reset: (state) => {
      state.count = 0;
    },
    // Increment by Amount
    incrementByAmount: (state, action) => {
      state.count += action.payload;
    },
  },
});

export const { increment, decrement, reset, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
