import {
  DefaultScreenNavigationProp,
  DefaultScreenRouteProp,
  FindAddressScreenNavigationProp,
  FindAddressScreenRouteProp,
} from '../@types/screenTypes';

export interface IDefaultScreenProps {
  route?: DefaultScreenRouteProp;
  navigation: DefaultScreenNavigationProp;
}

export interface IFindAddressScreenProps {
  route?: FindAddressScreenRouteProp;
  navigation: FindAddressScreenNavigationProp;
}
