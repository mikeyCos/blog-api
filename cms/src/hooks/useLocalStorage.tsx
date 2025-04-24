import { useState } from "react";

// TODO
// Need to define type for defaultValue and newValue

const useLocalStorage = (key: string, defaultValue: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(key);
      if (value) return JSON.parse(value);
      window.localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue: any) => {
    try {
      window.localStorage.setItem(key, newValue);
    } catch (err) {
      console.log(err);
    }

    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
