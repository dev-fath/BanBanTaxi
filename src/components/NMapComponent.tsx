import React from 'react';
import NaverMapView, { Coord } from 'react-native-nmap';
import { useDispatch, useSelector } from 'react-redux';
import { AddressState } from '../redux/addressFind/addressFindStore';
import { pinPoint, sourceAddress } from '../redux/addressFind/addressFindSlice';
import { Image, View } from 'react-native';
import markerImage from '../../assets/mapMarker.png';
import { loadReverseGeocode } from '../services/apiService';
import { ILand, IReverseGeocodeResponse } from '../interfaces/geocodeResponse';

function BanBanMap() {
  const direction = useSelector((state: AddressState) => state.direction);
  const centerPosition = { latitude: 37.37849825726812, longitude: 127.11265235498155 };
  const dispatch = useDispatch();
  // const pin = useSelector((state: AddressState) => state.pinPoint);

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
        showsMyLocationButton={false}
        mapPadding={{ bottom: 60 }}
        center={{ ...centerPosition, zoom: 16 }}
        onCameraChange={(e) => {
          const { latitude, longitude }: Coord = e;
          getAddressFromPoint({ latitude, longitude });
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
