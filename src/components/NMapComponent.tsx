import React, { useEffect } from 'react';
import NaverMapView, { Circle, Marker, Path, Polyline, Polygon, Coord } from 'react-native-nmap';
import { Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

function BanBanMap(props: { directions: Coord[] }) {
  const P0 = { latitude: 37.379024, longitude: 127.113128 };
  const P1 = { latitude: 37.378512, longitude: 127.001234 };
  const P2 = { latitude: 37.378256, longitude: 127.113256 };
  useEffect(() => {
    if (Platform.OS === 'ios') {
      void Geolocation.requestAuthorization('always');
    }
  }, []);
  return (
    <NaverMapView
      style={{ width: '100%', height: '100%' }}
      zoomControl={true}
      maxZoomLevel={20}
      minZoomLevel={7}
      showsMyLocationButton={true}
      center={{ ...P0, zoom: 16 }}
      onCameraChange={(e) => console.warn('onCameraChange', JSON.stringify(e))}
      onMapClick={(e) => console.warn('onMapClick', JSON.stringify(e))}>
      <Marker coordinate={P0} onClick={() => console.warn('onClick! p0')} />
      <Marker coordinate={P1} pinColor="blue" onClick={() => console.warn('onClick! p1')} />
      <Marker coordinate={P2} pinColor="red" onClick={() => console.warn('onClick! p2')} />
      <Path
        coordinates={props.directions}
        onClick={() => console.warn('onClick! path')}
        width={10}
      />
      {/*<Polyline coordinates={[P1, P2]} onClick={() => console.warn('onClick! polyline')} />*/}
      {/*<Circle*/}
      {/*  coordinate={P0}*/}
      {/*  color={'rgba(255,0,0,0.3)'}*/}
      {/*  radius={200}*/}
      {/*  onClick={() => console.warn('onClick! circle')}*/}
      {/*/>*/}
      {/*<Polygon*/}
      {/*  coordinates={[P0, P1, P2]}*/}
      {/*  color={'rgba(0, 0, 0, 0.5)'}*/}
      {/*  onClick={() => console.warn('onClick! polygon')}*/}
      {/*/>*/}
    </NaverMapView>
  );
}

export default BanBanMap;
