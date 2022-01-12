import { configureStore } from '@reduxjs/toolkit';
import addressFindSlice from './addressFindSlice';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const addressFindStore = configureStore({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  reducer: addressFindSlice,
});
export type AddressState = ReturnType<typeof addressFindStore.getState>;
