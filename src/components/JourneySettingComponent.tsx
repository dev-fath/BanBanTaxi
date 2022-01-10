import React from 'react';

import { Button, Text, View } from 'react-native';
import { getDirections } from '../services/apiService';
import { IGeoPosition } from '../interfaces/geoPosition.interface';
import { Coord } from 'react-native-nmap/index';

const JourneySettingComponent = (props: { setDirections: (directions: Coord[]) => void }) => {
  const directionsArrayToCoord = (directionArray: null | [[number, number]]) => {
    if (!directionArray) {
      console.warn('null direction');
      return [{ latitude: 0, longitude: 0 }] as Coord[];
    }
    return directionArray.map((direction) => {
      return { latitude: direction[1], longitude: direction[0] } as Coord;
    });
  };
  const start: IGeoPosition = { lat: 37.379024, lon: 127.113128 };
  const goal: IGeoPosition = { lat: 37.379213, lon: 126.99937 };
  const url = 'https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving';
  const handleClickButton = (e: { preventDefault: () => void }) => {
    return getDirections(url, start, goal).then((result) => {
      const directionCoords: Coord[] = directionsArrayToCoord(result);
      props.setDirections(directionCoords);
    });
  };
  return (
    <View
      style={{
        position: 'relative',
      }}>
      <Text
        style={{
          fontSize: 24,
        }}>
        test
      </Text>
      <Button onPress={handleClickButton} title={'경로 찾기'}>
        경로 찾기
      </Button>
    </View>
  );
};

export default JourneySettingComponent;
