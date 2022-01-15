import React, { useCallback } from 'react';

import { Text } from 'react-native';
import BackButton from '../common/backButton';
import { useDispatch } from 'react-redux';
import { findDestination, findSource } from '../../redux/maps/addressFindSlice';

// 맵을 다시 호출하지 않고 출발지 선택하기 위한 컴포넌트
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
