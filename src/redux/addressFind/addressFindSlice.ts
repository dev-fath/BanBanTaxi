import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const addressSlice = createSlice({
  name: 'addressFind',
  initialState: {
    isFindSource: false,
    isFindDestination: false,
    sourceAddress: '',
    destinationAddress: '',
  },
  reducers: {
    findSource: (state, action: PayloadAction<boolean>) => {
      state.isFindSource = action.payload;
    },
    findDestination: (state, action: PayloadAction<boolean>) => {
      state.isFindDestination = action.payload;
    },
    sourceAddress: (state, action: PayloadAction<string>) => {
      state.sourceAddress = action.payload;
    },
    destinationAddress: (state, action: PayloadAction<string>) => {
      state.destinationAddress = action.payload;
    },
  },
});

export const { findSource, findDestination, sourceAddress, destinationAddress } =
  addressSlice.actions;

export const selectIsFindSource = (state: { isFindSource: boolean }) => state.isFindSource;

export const selectSource = (state: { sourceAddress: string }) => state.sourceAddress;
export const selectDestination = (state: { destinationAddress: string }) =>
  state.destinationAddress;

export type AddressState = ReturnType<typeof addressSlice.reducer>;
export default addressSlice.reducer;
