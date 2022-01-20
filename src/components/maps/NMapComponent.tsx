import React, { useCallback, useEffect, useState } from 'react';
import NaverMapView, { Coord, Path } from 'react-native-nmap';
import { useDispatch, useSelector } from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

import {
  destinationAddressObject,
  pinPoint,
  sourceAddressObject,
} from '../../redux/maps/addressFindSlice';

import markerImage from '../../../assets/mapMarker.png';
import { getDirections, loadReverseGeocode } from '../../services/maps/naverMapApiService';
import { IAddresses, IReverseGeocodeResponse } from '../../interfaces/geocodeResponse';
import { AddressState } from '../../redux/maps/addressFindStore';
import { DefaultScreenNavigationProp } from '../../@types/screenTypes';

function BanBanMap(props: { searchLocation?: Coord; findPath?: boolean }) {
  const navigation: DefaultScreenNavigationProp = useNavigation();
  const dispatch = useDispatch();
  const [direction, setDirection] = useState([
    { latitude: 37.378595, longitude: 127.112724 },
    { latitude: 37.378595, longitude: 127.112724 },
  ]);
  const startPoint: Coord = {
    latitude: Number(useSelector((state: AddressState) => state.sourceAddressObject.y)),
    longitude: Number(useSelector((state: AddressState) => state.sourceAddressObject.x)),
  };
  const endPoint: Coord = {
    latitude: Number(useSelector((state: AddressState) => state.destinationAddressObject.y)),
    longitude: Number(useSelector((state: AddressState) => state.destinationAddressObject.x)),
  };
  const findPath = () => {
    if (!props.findPath) {
      return;
    }
    const directionsArrayToCoord = (directionArray: null | [[number, number]]) => {
      if (!directionArray) {
        return [
          {
            latitude: useSelector((state: AddressState) => state.centerPoint.latitude),
            longitude: useSelector((state: AddressState) => state.centerPoint.longitude),
          },
        ] as Coord[];
      }
      return directionArray.map((direction) => {
        return { latitude: direction[1], longitude: direction[0] } as Coord;
      });
    };

    void getDirections(startPoint, endPoint).then((result) => {
      const directionCoords: Coord[] = directionsArrayToCoord(result);
      setDirection(directionCoords);
    });
    navigation.setParams({ findPath: false });
  };

  const isFindSource = true;
  let pin: Coord;
  if (props.searchLocation) {
    pin = props.searchLocation;
  } else {
    pin = useSelector((state: AddressState) => {
      return state.pinPoint;
    });
  }
  const getMyLocation = () => {
    if (props.searchLocation) {
      const { latitude, longitude }: Coord = props.searchLocation;
      dispatch(pinPoint({ latitude, longitude }));
      getAddressFromPoint({ latitude, longitude });
      return;
    }

    Geolocation.getCurrentPosition((response) => {
      const { latitude, longitude }: Coord = response.coords;
      dispatch(pinPoint({ latitude, longitude }));
      getAddressFromPoint({ latitude, longitude });
    });
  };
  useEffect(getMyLocation, []);
  useFocusEffect(useCallback(findPath, [props.findPath]));
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
    <Container>
      <CenterMarker source={markerImage} />
      <StyledNaverMapView
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
        <Path
          coordinates={direction}
          onClick={() => console.warn('onClick! path')}
          width={10}
          color={'#00FF00'}
        />
      </StyledNaverMapView>
    </Container>
  );
}

const Container = styled.View`
  align-items: center;
  width: 100%;
  height: 100%;
`;

const CenterMarker = styled.Image`
  position: absolute;
  top: 35%;
  transform: translateY(-28px);
  align-content: center;
  width: 20px;
  height: 32px;
  z-index: 1;
`;

const StyledNaverMapView = styled(NaverMapView)`
  width: 100%;
  height: 80%;
`;

export default BanBanMap;
