import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import {IUserSettings} from "./types/IUser";
import {getFromLocalStorage} from "./utils/LocalStorage";
import {IAddress} from "./types/IGeography";
import {GlobalContext} from "./GlobalContext";

export default function App() {

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [userSettings, setUserSettings] = useState<IUserSettings | null>(null);

  useEffect(() => {
    console.log('---------STATE APP!!----------');
    updateUserSettings();
  }, [])

  const updateUserSettings = async () => {
    console.log('updating context');
    const address = await getFromLocalStorage<IAddress>('address');
    const distance = await getFromLocalStorage<number>('distance');
    setUserSettings({address, distance});
  }

  const state = {userSettings, updateUserSettings};


  if (!isLoadingComplete) {
    return null;
  }
  return (
    <GlobalContext.Provider value={state}>
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme}/>
        <StatusBar/>
      </SafeAreaProvider>
    </GlobalContext.Provider>
  );

}
