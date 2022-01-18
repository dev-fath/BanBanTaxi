import React from 'react';
import _ from 'lodash';

import BackButton from '../components/common/backButton';
import { IFindAddressScreenProps } from '../interfaces/defaultScreenProps';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { addressFindStore, AddressState } from '../redux/maps/addressFindStore';
import SettingPoint from '../components/findAddress/SettingPoint';
import { Image, StyleSheet, View } from 'react-native';
import markerImage from '../../assets/mapMarker.png';
import NaverMapView, { Coord } from 'react-native-nmap/index';
import {
  destinationAddressObject,
  destinationPoint,
  sourceAddressObject,
  sourcePoint,
} from '../redux/maps/addressFindSlice';
import { loadReverseGeocode } from '../services/maps/naverMapApiService';
import { IAddresses, IReverseGeocodeResponse } from '../interfaces/geocodeResponse';
const FindAddressOnMapScreen = ({ navigation }: IFindAddressScreenProps) => {
  const handleClickBackButton = () => {
    navigation.goBack();
  };
  const dispatch = useDispatch();
  const isFindSource = useSelector((state: AddressState) => state.isFindSource);
  let pinPoint = isFindSource
    ? useSelector((state: AddressState) => state.sourcePoint)
    : useSelector((state: AddressState) => state.destinationPoint);

  const getAddressFromPoint = (coord: Coord) => {
    const { latitude, longitude }: Coord = coord;
    void loadReverseGeocode({
      coords: { latitude, longitude },
      orders: ['roadaddr'],
      output: 'json',
    })
      .then<IReverseGeocodeResponse>((response) => response.json())
      .then((data) => {
        if (data.status.code === 3) {
          console.log('목적지 정보 없음');
          return;
        }
        const addressData = data.results[0];
        const addressObject: IAddresses = {
          x: longitude.toString(),
          y: latitude.toString(),
          roadAddress: `${addressData.region.area1.name} ${addressData.region.area2.name} ${addressData.region.area3.name} ${addressData.land.name} ${addressData.land.number1} ${addressData.land.number2}`,
          placeName: addressData.land.addition0.value,
        };
        console.log(data.results);
        // data.results
        isFindSource
          ? dispatch(sourceAddressObject(addressObject))
          : dispatch(destinationAddressObject(addressObject));
      });
  };

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
              getAddressFromPoint({ latitude, longitude });
              pinPoint = { latitude, longitude };

              if (isFindSource) {
                const dispatchSourcePoint = () => dispatch(sourcePoint({ latitude, longitude }));
                _.debounce(dispatchSourcePoint, 250);
              } else {
                const dispatchDestinationPoint = () =>
                  dispatch(destinationPoint({ latitude, longitude }));
                _.debounce(dispatchDestinationPoint, 250);
              }
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
