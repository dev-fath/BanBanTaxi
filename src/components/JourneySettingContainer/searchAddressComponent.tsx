import React, { useCallback } from 'react';

import { Text } from 'react-native';
import BackButton from '../backButton';
import { useDispatch } from 'react-redux';
import { findDestination, findSource } from '../../redux/addressFind/addressFindSlice';

const SearchAddressComponent = () => {
  const dispatch = useDispatch();
  const handleClickBackButton = useCallback(() => {
    dispatch(findSource(false));
    dispatch(findDestination(false));
  }, [dispatch]);
  return (
    <>
      <BackButton onClick={handleClickBackButton} />
      <Text>주소찾기</Text>
    </>
  );
};

export default SearchAddressComponent;
