import React from 'react';

import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Geolocation from '@react-native-community/geolocation';
import { useDispatch } from 'react-redux';

import { pinPoint } from '../../redux/maps/addressFindSlice';

const MyLocationButton = () => {
  const requestPermission = () => {
    return Geolocation.requestAuthorization();
  };
  const dispatch = useDispatch();
  // const currentPinPoint = useSelector<AddressStateReducers, Coord>((state) => state.pinPoint);
  const getMyLocation = () => {
    Geolocation.getCurrentPosition((response) => {
      dispatch(
        pinPoint({ latitude: response.coords.latitude, longitude: response.coords.longitude }),
      );
      console.log(response.coords);
    });
  };
  return (
    <TouchableOpacity
      onPress={() => {
        requestPermission();
        getMyLocation();
      }}>
      <Icon name="locate-outline" size={18} />
    </TouchableOpacity>
  );
};

export default MyLocationButton;
