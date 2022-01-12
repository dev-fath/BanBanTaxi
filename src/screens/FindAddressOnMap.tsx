import React from 'react';

import BackButton from '../components/backButton';
import { IFindAddressScreenProps } from '../interfaces/defaultScreenProps';
import BanBanMap from '../components/NMapComponent';
import { Provider } from 'react-redux';
import { addressFindStore } from '../redux/addressFind/addressFindStore';
const FindAddressOnMapScreen = ({ navigation }: IFindAddressScreenProps) => {
  const handleClickBackButton = () => {
    navigation.goBack();
  };
  return (
    <>
      <Provider store={addressFindStore}>
        <BanBanMap />
      </Provider>
      <BackButton onClick={handleClickBackButton} />
    </>
  );
};

export default FindAddressOnMapScreen;
