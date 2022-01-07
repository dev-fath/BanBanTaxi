import * as React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { DefaultScreenNavigationProp, DefaultScreenRouteProp } from '../@types/screenTypes';

interface IDefaultScreenProps {
  route?: DefaultScreenRouteProp;
  navigation: DefaultScreenNavigationProp;
}
function HomeScreen({ navigation }: IDefaultScreenProps) {
  return (
    <SafeAreaView style={{ width: '100%', height: '100%' }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
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
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
