import React from 'react';

import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const MyLocationButton = () => {
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
        bottom: 16,
        left: 16,
        backgroundColor: '#ccc',
      }}
      onPress={(e) => console.log(e)}>
      <Icon name="locate-outline" size={25} />
    </TouchableOpacity>
  );
};

export default MyLocationButton;
