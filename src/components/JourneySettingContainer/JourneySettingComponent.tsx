import React from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';

import { AddressState } from '../../redux/maps/addressFindStore';
import { findSource } from '../../redux/maps/addressFindSlice';

import { IDefaultScreenProps } from '../../interfaces/defaultScreenProps';

const JourneySettingComponent = ({ navigation }: IDefaultScreenProps) => {
  const dispatch = useDispatch();
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
