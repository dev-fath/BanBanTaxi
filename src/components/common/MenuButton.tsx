import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import { DefaultScreenNavigationProp } from '../../@types/screenTypes';

const MenuButton = () => {
  const navigation: DefaultScreenNavigationProp = useNavigation();
  return (
    <CircleButton onPress={() => navigation.navigate('Menu')}>
      <Icon name="grid-outline" size={25} />
    </CircleButton>
  );
};

const CircleButton = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  border: solid 2px black;
  border-radius: 25px;
  width: 50px;
  height: 50px;
  top: 16px;
  left: 16px;
  background-color: #ccc;
`;
export default MenuButton;
