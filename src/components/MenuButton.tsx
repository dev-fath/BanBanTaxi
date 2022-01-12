import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { IDefaultScreenProps } from '../interfaces/defaultScreenProps';
import { useSelector } from 'react-redux';
import { AddressState } from '../redux/addressFind/addressFindStore';

const MenuButton = ({ navigation }: IDefaultScreenProps) => {
  const findState: boolean = useSelector<AddressState, boolean>((state) => state.isFindSource);
  return (
    <TouchableOpacity
      style={{
        display: findState ? 'none' : 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        borderColor: 'black',
        borderStyle: 'solid',
        borderRadius: 50,
        width: 50,
        height: 50,
        borderWidth: 2,
        top: 16,
        left: 16,
        backgroundColor: '#ccc',
      }}
      onPress={() => navigation.navigate('Menu')}>
      <Icon name="grid-outline" size={25} />
    </TouchableOpacity>
  );
};

export default MenuButton;
