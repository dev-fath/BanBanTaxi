import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from 'react-native-screens/native-stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Home: { findPath: boolean };
  Menu: undefined;
  Introduce: undefined;
  FindAddressNavigator: undefined;
};

export type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type DefaultScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
export type DefaultScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

export type FindAddressStackParamList = {
  FindAddress: { setFocusDestination?: boolean; fromMyLocation?: boolean };
  FindAddressOnMap: undefined;
};

export type FindAddressProps = NativeStackScreenProps<FindAddressStackParamList, 'FindAddress'>;
export type FindAddressScreenNavigationProp = NativeStackNavigationProp<
  FindAddressStackParamList,
  'FindAddress'
>;
export type FindAddressScreenRouteProp = RouteProp<FindAddressStackParamList, 'FindAddress'>;
