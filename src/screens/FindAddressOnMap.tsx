import React, { useCallback, useEffect } from 'react';

import BackButton from '../components/common/backButton';
import { IFindAddressScreenProps } from '../interfaces/defaultScreenProps';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { addressFindStore, AddressState } from '../redux/maps/addressFindStore';
import SettingPoint from '../components/findAddress/SettingPoint';
import { Image, StyleSheet, View } from 'react-native';
import markerImage from '../../assets/mapMarker.png';
import NaverMapView, { Coord } from 'react-native-nmap/index';
import { getAddressFromPoint } from '../components/findAddress/getAddressFromPoint';
import { destinationPoint, sourcePoint } from '../redux/maps/addressFindSlice';
const FindAddressOnMapScreen = ({ navigation, route }: IFindAddressScreenProps) => {
  const handleClickBackButton = () => {
    navigation.goBack();
  };
  const dispatch = useDispatch();
  const isFindSource = useSelector((state: AddressState) => state.isFindSource);
  const pinPoint = isFindSource
    ? useSelector((state: AddressState) => state.sourcePoint)
    : useSelector((state: AddressState) => state.destinationPoint);
  const callback = useCallback(
    ({ latitude, longitude }: Coord) => {
      if (isFindSource) {
        dispatch(sourcePoint({ latitude, longitude }));
      } else {
        dispatch(destinationPoint({ latitude, longitude }));
      }
    },
    [pinPoint],
  );

  return (
    <>
      <Provider store={addressFindStore}>
        <View style={styles.container}>
          <Image style={styles.image} source={markerImage} />
          <NaverMapView
            style={{
              width: '100%',
              height: '80%',
            }}
            zoomControl={true}
            maxZoomLevel={20}
            minZoomLevel={7}
            showsMyLocationButton={true}
            mapPadding={{ bottom: 60 }}
            center={{ ...pinPoint, zoom: 16 }}
            onCameraChange={(e) => {
              console.log(e);
              const { latitude, longitude }: Coord = e;
              const address = getAddressFromPoint({ latitude, longitude });
              void address.then((addressString) => {
                console.log(addressString);
              });
              callback({ latitude, longitude });
            }}
          />
        </View>
        <SettingPoint />
      </Provider>
      <BackButton onClick={handleClickBackButton} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'flex-start',
    // alignContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  image: {
    position: 'absolute',
    top: '35%',
    transform: [{ translateY: -28 }],
    alignContent: 'center',
    width: 20,
    height: 32,
    zIndex: 1,
  },
});

export default FindAddressOnMapScreen;
