import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useLocation } from "react-router";

interface PrevLocationContext {
  // prevLocationRef: RefObject<string | null>;
  prevLocation: string | null;
}

const PrevLocationContext = createContext<PrevLocationContext>(
  {} as PrevLocationContext
);

// usePrevious hook returns the previous value
// Assigns new value after usePrevious mounts
const usePrevious = (value: string) => {
  const ref = useRef<string | null>(null);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

const PrevLocationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  console.log("PrevLocationProvider running...");
  const location = useLocation();
  // No need to use /login
  const prevLocation = usePrevious(location.pathname);

  const providerValue = useMemo(() => {
    return {
      prevLocation,
    };
  }, [location]);

  return (
    <PrevLocationContext.Provider value={providerValue}>
      {children}
    </PrevLocationContext.Provider>
  );
};

const usePrevLocation = () => {
  return useContext(PrevLocationContext);
};

export { PrevLocationProvider as default, usePrevLocation };
