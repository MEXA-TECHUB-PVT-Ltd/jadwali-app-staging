import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {}
};

export const storeScreenName = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {}
};

export const getScreenName = async (key: string) => {
  try {
    const data = await AsyncStorage.getItem(key);
    let res = await JSON.parse(data);
    return res;
  } catch (error) {
    return null;
  }
};

export const setAgreement = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {}
};

export const storeUserProfileData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {}
};

export const storeAvatar = async (key: string, value: string) => {
  try {
    const stringValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, stringValue);
  } catch (error) {
    console.log('value---avtr', error);
  }
};
export const getAvatar = async (key: string) => {
  try {
    const storedValue = await AsyncStorage.getItem(key);
    if (storedValue !== null) {
      const parsedValue = JSON.parse(storedValue);
      return parsedValue;
    }
  } catch (error) {
    console.log('get-avatar-error:', error);
  }
};

export const getUserProfileData = async (key: string) => {
  try {
    const data = await AsyncStorage.getItem(key);
    let res = await JSON.parse(data);
    return res;
  } catch (error) {
    return null;
  }
};

export const storeObjectData = async (key: string, value: object) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {}
};

export const getStorageData = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    return null;
  }
};

export const getStorageObjectData = async (key: string, defaultValue?: any) => {
  try {
    return JSON.parse((await AsyncStorage.getItem(key)) || '');
  } catch (error) {
    return defaultValue || null;
  }
};

export const removeStorageData = async (key: string) => {
  return await AsyncStorage.removeItem(key);
};

export const resetStorage = async () => {
  let theme = await AsyncStorage.getItem('@color-mode');
  await AsyncStorage.clear();
  await storeData('AppOpen', JSON.stringify(true));
  await storeData('@color-mode', JSON.stringify(theme));
  return;
};

export const storeRecentSearches = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {}
};
export const getRecentSearches = async (key: string) => {
  try {
    const data = await AsyncStorage.getItem(key);
    let res = await JSON.parse(data);
    return res;
  } catch (error) {
    return null;
  }
};
