import React from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getDirections, loadGeocode } from '../../services/apiService';
import { Coord } from 'react-native-nmap/index';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import {
  AddressStateReducers,
  direction,
  findDestination,
  findSource,
} from '../../redux/addressFind/addressFindSlice';
import { IGeocodeResponse } from '../../interfaces/geocodeResponse';

const JourneySettingComponent = () => {
  const directionsArrayToCoord = (directionArray: null | [[number, number]]) => {
    if (!directionArray) {
      console.warn('null direction');
      return [{ latitude: 0, longitude: 0 }] as Coord[];
    }
    return directionArray.map((direction) => {
      return { latitude: direction[1], longitude: direction[0] } as Coord;
    });
  };

  const dispatch = useDispatch();
  const start: Coord = { latitude: 37.379024, longitude: 127.113128 };
  const goal: Coord = { latitude: 37.379213, longitude: 126.99937 };
  const url = 'https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving';
  const handleClickButton = (e: { preventDefault: () => void }) => {
    return getDirections(url, start, goal).then((result) => {
      const directionCoords: Coord[] = directionsArrayToCoord(result);
      dispatch(direction(directionCoords));
    });
  };
  const findState: boolean = useSelector<AddressStateReducers, boolean>(
    (state) => state.isFindSource,
  );

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TouchableOpacity
          style={styles.sourceButton}
          onPress={() => {
            dispatch(findSource(true));
            console.log(geocode());
            // dispatch(sourceAddress('회안대로 350-25'));
            console.log('출발지 선택 화면으로 이동(?)');
            console.log('출발지 선택 UI 나타내기(?)');
          }}>
          <Text style={styles.sourceButtonText}>[현위치] 휴맥스빌리지 {findState}</Text>
          <Icon name={'locate-outline'} size={18} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.destinationButton}
          onPress={() => {
            dispatch(findDestination(true));
            console.log('목적지 선택 화면으로 이동(?)');
            console.log('목적지 선택 UI 나타내기(?)');
            // handleClickButton
          }}>
          <Text style={styles.destinationButtonText}>어디로 모실까요?</Text>
          <Icon style={styles.destinationButtonIcon} name={'arrow-forward-outline'} size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const geocode = () => {
  return loadGeocode({ query: '회안대로 350', count: 10 })
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
