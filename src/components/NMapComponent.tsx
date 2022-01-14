import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import NaverMapView, { Coord } from 'react-native-nmap';
import { useDispatch, useSelector } from 'react-redux';
import Geolocation from '@react-native-community/geolocation';

import { AddressState } from '../redux/addressFind/addressFindStore';
import { pinPoint, sourceAddress } from '../redux/addressFind/addressFindSlice';

import markerImage from '../../assets/mapMarker.png';
import { loadReverseGeocode } from '../services/apiService';
import { ILand, IReverseGeocodeResponse } from '../interfaces/geocodeResponse';

function BanBanMap() {
  const dispatch = useDispatch();

  const direction = useSelector((state: AddressState) => state.direction);
  const pin = useSelector((state: AddressState) => state.pinPoint);
  const getMyLocation = () => {
    Geolocation.getCurrentPosition((response) => {
      const { latitude, longitude }: Coord = response.coords;
      dispatch(pinPoint({ latitude, longitude }));
      getAddressFromPoint({ latitude, longitude });
    });
  };
  useEffect(() => {
    getMyLocation();
  }, []);

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
        dispatch(sourceAddress(getTargetName(data?.results[0]?.land)));
      });
  };

  const getTargetName = (land: ILand) => {
    const landNumber = land.number2 ? `${land.number1}-${land.number2}` : land.number1;
    if (land?.addition0?.value !== '') {
      return `${land?.addition0?.value} (${land.name} ${landNumber})`;
    } else {
      return `${land.name} ${land.number1} ${land.number2}`;
    }
  };
  return (
    <View
      style={{
        // justifyContent: 'flex-start',
        // alignContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}>
      <Image
        style={{
          position: 'absolute',
          top: '35%',
          transform: [{ translateY: -28 }],
          alignContent: 'center',
          width: 20,
          height: 32,
          zIndex: 1,
        }}
        source={markerImage}
      />
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
        center={{ ...pin, zoom: 16 }}
        onCameraChange={(e) => {
          const { latitude, longitude }: Coord = e;
          getAddressFromPoint({ latitude, longitude });
        }}>
        {/*<Path*/}
        {/*  coordinates={direction}*/}
        {/*  onClick={() => console.warn('onClick! path')}*/}
        {/*  width={10}*/}
        {/*  color={'#00FF00'}*/}
        {/*/>*/}
      </NaverMapView>
    </View>
  );
}

export default BanBanMap;
