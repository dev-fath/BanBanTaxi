// Hook
import { useEffect } from 'react';
import _ from 'lodash';

export function useDebounce<T>(value: T, useFunction: () => void, delay = 250) {
  useEffect(
    () => {
      _.debounce(useFunction, delay);
    },
    [value, delay], // Only re-call effect if value or delay changes
  );
}
