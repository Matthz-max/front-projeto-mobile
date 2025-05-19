import { NativeBaseProvider } from 'native-base';
import React, { useState } from 'react';
import HomeScreen from '../../screens/HomeScreen';
import WelcomeScreen from '../../screens/WelcomeScreen';

export default function Index() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <NativeBaseProvider>
      {showWelcome ? (
        <WelcomeScreen onNext={() => setShowWelcome(false)} />
      ) : (
        <HomeScreen/>
      )}
    </NativeBaseProvider>
  );
}
