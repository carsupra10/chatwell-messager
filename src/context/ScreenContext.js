import React, { createContext, useState } from 'react';

export const ScreenContext = createContext();

export const ScreenProvider = ({ children }) => {
  const [activeScreen, setActiveScreen] = useState('sidebar');

  const toggleScreen = () => {
    setActiveScreen((prevScreen) => (prevScreen === 'sidebar' ? 'chat' : 'sidebar'));
  };

  const changeScreen = (screen) => {
    setActiveScreen(screen);
  };

  return (
    <ScreenContext.Provider value={{ activeScreen, setActiveScreen: changeScreen, toggleScreen }}>
      {children}
    </ScreenContext.Provider>
  );
};
