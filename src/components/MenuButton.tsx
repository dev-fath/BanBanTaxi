import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { IDefaultScreenProps } from '../interfaces/defaultScreenProps';

const MenuButton = ({ navigation }: IDefaultScreenProps) => {
  return (
    <TouchableOpacity
      style={{
        display: 'flex',
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
