import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coord } from 'react-native-nmap';

const initialState: IInitialState = {
  isFindSource: false,
  isFindDestination: false,
  sourceAddress: '',
  destinationAddress: '',
  direction: [{ latitude: 0, longitude: 0 }],
};
export const addressSlice = createSlice({
  name: 'addressFind',
  initialState: initialState,
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
    direction: (state, action: PayloadAction<Coord[]>) => {
      state.direction = action.payload;
    },
  },
});

export const { findSource, findDestination, sourceAddress, destinationAddress, direction } =
  addressSlice.actions;

export const selectIsFindSource = (state: { isFindSource: boolean }) => state.isFindSource;

export const selectSource = (state: { sourceAddress: string }) => state.sourceAddress;
export const selectDestination = (state: { destinationAddress: string }) =>
  state.destinationAddress;

export type AddressStateReducers = ReturnType<typeof addressSlice.reducer>;
export default addressSlice.reducer;

interface IInitialState {
  isFindSource: boolean;
  isFindDestination: boolean;
  sourceAddress: string;
  destinationAddress: string;
  direction: Coord[];
}
