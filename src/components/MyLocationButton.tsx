import React from 'react';

import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const MyLocationButton = () => {
  return (
    <TouchableOpacity onPress={(e) => console.log(e)}>
      <Icon name="locate-outline" size={18} />
    </TouchableOpacity>
  );
};

export default MyLocationButton;
