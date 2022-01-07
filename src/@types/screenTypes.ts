import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from 'react-native-screens/native-stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  Menu: undefined;
};

export type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type DefaultScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
export type DefaultScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
