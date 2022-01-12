import React from 'react';

import JourneySettingComponent from './JourneySettingComponent';
import SearchAddressComponent from './searchAddressComponent';
import { useSelector } from 'react-redux';
import { AddressState } from '../../redux/addressFind/addressFindStore';

const JourneySettingContainer = () => {
  const findState: boolean = useSelector<AddressState, boolean>((state) => state.isFindSource);
  return findState ? <SearchAddressComponent /> : <JourneySettingComponent />;
};

export default JourneySettingContainer;
