import AsyncStorage from '@react-native-community/async-storage';

export const getFromLocalStorage = async <T>(key: string): Promise<T | null> => {
  try {
    const item = await AsyncStorage.getItem(key);
    if (item) return JSON.parse(item) as T;
    else return null;
  } catch (e) {
    return null;
  }
}

export const saveToStorage = async (key: string, item: any): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(item));
    return true;
  } catch (e) {
    return false;
  }
}


