import React from 'react';

export default function useLocalState(key, initialState) {
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      return initialState;
    } catch (error) {}
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
