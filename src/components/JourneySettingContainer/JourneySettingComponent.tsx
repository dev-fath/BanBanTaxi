import React from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Coord } from 'react-native-nmap/index';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';

import { getDirections, loadGeocode } from '../../services/maps/naverMapApiService';
import { AddressState } from '../../redux/maps/addressFindStore';
import { directions, findSource } from '../../redux/maps/addressFindSlice';

import { IGeocodeResponse } from '../../interfaces/geocodeResponse';
import { IDefaultScreenProps } from '../../interfaces/defaultScreenProps';

const JourneySettingComponent = ({ navigation }: IDefaultScreenProps) => {
  const dispatch = useDispatch();
  const directionsArrayToCoord = (directionArray: null | [[number, number]]) => {
    if (!directionArray) {
      console.warn('null direction');
      return [{ latitude: 0, longitude: 0 }] as Coord[];
    }
    return directionArray.map((direction) => {
      return { latitude: direction[1], longitude: direction[0] } as Coord;
    });
  };
  const start: Coord = { latitude: 37.379024, longitude: 127.113128 };
  const goal: Coord = { latitude: 37.379213, longitude: 126.99937 };
  const url = 'https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving';

  const handleClickButton = () => {
    return getDirections(url, start, goal).then((result) => {
      const directionCoords: Coord[] = directionsArrayToCoord(result);
      dispatch(directions(directionCoords));
    });
  };
  const sourceAddress: string =
    useSelector((state: AddressState) => state.sourceAddressObject.placeName) || '';
  const destinationAddress: string =
    useSelector((state: AddressState) => state.destinationAddressObject.placeName) || '';

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TouchableOpacity
          style={styles.sourceButton}
          onPress={() => {
            dispatch(findSource(true));
            navigation.navigate('FindAddressNavigator');
          }}>
          <Text style={styles.sourceButtonText}>{sourceAddress}</Text>
          {/*<MyLocationButton />*/}
          {/*<TouchableWithoutFeedback>*/}
          {/*  <Icon name={'locate-outline'} size={18} />*/}
          {/*</TouchableWithoutFeedback>*/}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.destinationButton}
          onPress={() => {
            dispatch(findSource(false));
            navigation.navigate('FindAddressNavigator');
          }}>
          <Text style={styles.destinationButtonText}>
            {destinationAddress || '어디로 모실까요?'}
          </Text>
          <Icon style={styles.destinationButtonIcon} name={'arrow-forward-outline'} size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const geocode = () => {
  return loadGeocode({ query: '회안대로 ', count: 10, coordinate: '127.2359831,37.3839480' })
    .then<IGeocodeResponse>((res) => {
      return res.json();
    })
    .then((obj) => {
      return obj;
    });
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    minHeight: 150,
    height: '30%',
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: 'white',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
  },
  wrapper: {
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sourceButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
    height: 56,
  },
  sourceButtonText: {
    fontSize: 18,
  },
  destinationButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: 'black',
    height: 56,
  },
  destinationButtonText: {
    fontSize: 18,
    color: '#00FF00',
  },
  destinationButtonIcon: {
    color: '#00FF00',
  },
});

export default JourneySettingComponent;
