import React, { useEffect, useState } from 'react';
import NaverMapView, { TrackingMode, Coord, Gravity, Marker, Path } from 'react-native-nmap';
import { useDispatch, useSelector } from 'react-redux';
import { AddressState } from '../redux/addressFind/addressFindStore';
import { pinPoint } from '../redux/addressFind/addressFindSlice';
import { Image, View } from 'react-native';
import markerImage from '../../assets/mapMarker.png';

function BanBanMap() {
  const direction = useSelector((state: AddressState) => state.direction);
  const centerPosition = { latitude: 37.379024, longitude: 127.113128 };
  const P1 = { latitude: 37.378512, longitude: 127.001234 };
  const P2 = { latitude: 37.378256, longitude: 127.113256 };

  const dispatch = useDispatch();
  const pin = useSelector((state: AddressState) => state.pinPoint);
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
        center={{ ...centerPosition, zoom: 16 }}
        onCameraChange={(e) => {
          dispatch(pinPoint({ latitude: e.latitude, longitude: e.longitude }));
        }}>
        {/*<Marker coordinate={pin} image={markerImage} width={20} height={32} />*/}
        {/*<Marker coordinate={centerPosition} onClick={() => console.warn('onClick! p0')} />*/}
        {/*<Marker coordinate={P1} pinColor="blue" onClick={() => console.warn('onClick! p1')} />*/}
        {/*<Marker coordinate={P2} pinColor="red" onClick={() => console.warn('onClick! p2')} />*/}
        {/*<Path*/}
        {/*  coordinates={direction}*/}
        {/*  onClick={() => console.warn('onClick! path')}*/}
        {/*  width={10}*/}
        {/*  color={'#00FF00'}*/}
        {/*/>*/}
        {/*<Polyline coordinates={[P1, P2]} onClick={() => console.warn('onClick! polyline')} />*/}
        {/*<Circle*/}
        {/*  coordinate={centerPosition}*/}
        {/*  color={'rgba(255,0,0,0.3)'}*/}
        {/*  radius={200}*/}
        {/*  onClick={() => console.warn('onClick! circle')}*/}
        {/*/>*/}
        {/*<Polygon*/}
        {/*  coordinates={[centerPosition, P1, P2]}*/}
        {/*  color={'rgba(0, 0, 0, 0.5)'}*/}
        {/*  onClick={() => console.warn('onClick! polygon')}*/}
        {/*/>*/}
      </NaverMapView>
    </View>
  );
}

export default BanBanMap;
