import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View } from 'react-native';
import styled from 'styled-components/native';

const BackButton = (prop: { onClick: () => void }) => {
  return (
    <CircleButton onPress={prop.onClick}>
      <View>
        <Icon name="arrow-back" size={25} />
      </View>
    </CircleButton>
  );
};

const CircleButton = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  border: solid 1px black;
  border-radius: 25px;
  width: 50px;
  height: 50px;
  top: 16px;
  left: 16px;
  background-color: #eee;
`;
export default BackButton;
