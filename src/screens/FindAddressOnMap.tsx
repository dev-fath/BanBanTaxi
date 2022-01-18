import React from 'react';

import BackButton from '../components/common/backButton';
import { IFindAddressScreenProps } from '../interfaces/defaultScreenProps';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { addressFindStore, AddressState } from '../redux/maps/addressFindStore';
import SettingPoint from '../components/findAddress/SettingPoint';
import { Image, StyleSheet, View } from 'react-native';
import markerImage from '../../assets/mapMarker.png';
import NaverMapView, { Coord } from 'react-native-nmap/index';
import { destinationAddress, sourceAddress } from '../redux/maps/addressFindSlice';
import { getAddressFromPoint } from '../components/findAddress/getAddressFromPoint';
const FindAddressOnMapScreen = ({ navigation }: IFindAddressScreenProps) => {
  const handleClickBackButton = () => {
    navigation.goBack();
  };
  const pinPoint = useSelector((state: AddressState) => state.pinPoint);
  const isFindSource = useSelector((state: AddressState) => state.isFindSource);
  const dispatch = useDispatch();
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
              const { latitude, longitude }: Coord = e;
              const address = getAddressFromPoint({ latitude, longitude });
              void address.then((result) => {
                isFindSource
                  ? dispatch(sourceAddress(result))
                  : dispatch(destinationAddress(result));
              });
            }}>
            {/*<Path*/}
            {/*  coordinates={direction}*/}
            {/*  onClick={() => console.warn('onClick! path')}*/}
            {/*  width={10}*/}
            {/*  color={'#00FF00'}*/}
            {/*/>*/}
          </NaverMapView>
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
