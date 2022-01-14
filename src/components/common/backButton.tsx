import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity, View } from 'react-native';

const BackButton = (prop: { onClick: () => void }) => {
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
      onPress={prop.onClick}>
      <View>
        <Icon name="arrow-back" size={25} />
      </View>
    </TouchableOpacity>
  );
};

export default BackButton;
