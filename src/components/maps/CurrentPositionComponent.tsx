import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import Styled from 'styled-components/native';
import Geolocation from 'react-native-geolocation-service';
interface ILocation {
  latitude: number;
  longitude: number;
}
const CurrentPosition = () => {
  const [location, setLocation] = useState<ILocation | undefined>(undefined);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({
          latitude,
          longitude,
        });
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  }, []);

  return (
    <Container>
      {location ? (
        <>
          <Text>Latitude: {location.latitude}</Text>
          <Text>Latitude: {location.longitude}</Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </Container>
  );
};

const Container = Styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export default CurrentPosition;
