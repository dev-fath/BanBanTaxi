import React from 'react';

import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AddressState } from '../../redux/maps/addressFindStore';
import { destinationAddress, sourceAddress } from '../../redux/maps/addressFindSlice';
import { useNavigation } from '@react-navigation/native';
import { FindAddressScreenNavigationProp } from '../../@types/screenTypes';

const SettingPoint = () => {
  const dispatch = useDispatch();
  const navigation: FindAddressScreenNavigationProp = useNavigation();
  const isFindSource = useSelector((state: AddressState) => state.isFindSource);
  const address = isFindSource
    ? useSelector((state: AddressState) => state.sourceAddressObject)
    : useSelector((state: AddressState) => state.destinationAddressObject);
  const buttonTitle = `${isFindSource ? '출발지' : '목적지'}로 설정하기`;
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.settingContainer}>
        <Text style={styles.title}>{address.placeName || address.roadAddress}</Text>
        <Text style={styles.subTitle}>
          {address.placeName ? address.roadAddress : address.jibunAddress}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (isFindSource) {
              dispatch(
                sourceAddress(
                  address.placeName || address.roadAddress || address.jibunAddress || '',
                ),
              );
            } else {
              dispatch(
                destinationAddress(
                  address.placeName || address.roadAddress || address.jibunAddress || '',
                ),
              );
            }
            navigation.navigate({
              name: 'FindAddress',
              params: { setFocusDestination: true },
              merge: true,
            });
          }}>
          <Text style={styles.buttonText}>{buttonTitle}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '30%',
  },
  settingContainer: {
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 16,
    height: '100%',
  },
  title: {
    paddingBottom: 12,
    fontSize: 18,
    fontWeight: '600',
  },
  subTitle: {
    paddingBottom: 12,
    fontSize: 14,
    color: '#aaa',
    fontWeight: '500',
  },
  button: {
    display: 'flex',
    height: 56,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F0',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default SettingPoint;
