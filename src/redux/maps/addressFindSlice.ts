import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coord } from 'react-native-nmap';
import { IAddresses } from '../../interfaces/geocodeResponse';

const initialState: IInitialState = {
  isFindSource: true,
  sourceAddressObject: {},
  destinationAddressObject: {},
  pinPoint: { latitude: 37.378595, longitude: 127.112724 },
  sourcePoint: { latitude: 37.378595, longitude: 127.112724 },
  destinationPoint: { latitude: 37.378595, longitude: 127.112724 },
  centerPoint: { latitude: 37.378595, longitude: 127.112724 },
};
export const addressSlice = createSlice({
  name: 'addressFind',
  initialState: initialState,
  reducers: {
    findSource: (state, action: PayloadAction<boolean>) => {
      state.isFindSource = action.payload;
    },
    sourceAddressObject: (state, action: PayloadAction<IAddresses>) => {
      state.sourceAddressObject = action.payload;
    },
    destinationAddressObject: (state, action: PayloadAction<IAddresses>) => {
      state.destinationAddressObject = action.payload;
    },
    pinPoint: (state, action: PayloadAction<Coord>) => {
      state.pinPoint = action.payload;
    },
    sourcePoint: (state, action: PayloadAction<Coord>) => {
      state.sourcePoint = action.payload;
    },
    destinationPoint: (state, action: PayloadAction<Coord>) => {
      state.destinationPoint = action.payload;
    },
    centerPoint: (state, action: PayloadAction<Coord>) => {
      state.pinPoint = action.payload;
    },
  },
});

export const {
  findSource,
  pinPoint,
  sourcePoint,
  destinationPoint,
  sourceAddressObject,
  destinationAddressObject,
} = addressSlice.actions;

export const selectIsFindSource = (state: { isFindSource: boolean }) => state.isFindSource;

export const selectSource = (state: { sourceAddress: string }) => state.sourceAddress;
export const selectDestination = (state: { destinationAddress: string }) =>
  state.destinationAddress;

export type AddressStateReducers = ReturnType<typeof addressSlice.reducer>;
export default addressSlice.reducer;

interface IInitialState {
  isFindSource: boolean;
  sourceAddressObject: IAddresses;
  destinationAddressObject: IAddresses;
  pinPoint: Coord;
  sourcePoint: Coord;
  destinationPoint: Coord;
  centerPoint: Coord;
}
