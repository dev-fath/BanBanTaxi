import React from 'react';

import BackButton from '../components/common/backButton';
import { IFindAddressScreenProps } from '../interfaces/defaultScreenProps';
import BanBanMap from '../components/maps/NMapComponent';
import { Provider, useSelector } from 'react-redux';
import { addressFindStore, AddressState } from '../redux/maps/addressFindStore';
import SettingPoint from '../components/findAddress/SettingPoint';
const FindAddressOnMapScreen = ({ navigation }: IFindAddressScreenProps) => {
  const handleClickBackButton = () => {
    navigation.goBack();
  };
  const pinPoint = useSelector((state: AddressState) => state.pinPoint);
  return (
    <>
      <Provider store={addressFindStore}>
        <BanBanMap searchLocation={pinPoint} />
        <SettingPoint />
      </Provider>
      <BackButton onClick={handleClickBackButton} />
    </>
  );
};

export default FindAddressOnMapScreen;
