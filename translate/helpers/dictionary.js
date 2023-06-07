import AsyncStorage from '@react-native-async-storage/async-storage';

export const setStoreData = async value => {
  try {
    await AsyncStorage.setItem('Good morning.', JSON.stringify('Amgeu keu'));
    console.log('Done..');
  } catch (e) {
    console.log(e);
  }
};

export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    const res = JSON.parse(value);
    return res;
  } catch (e) {
    console.log(e);
  }
};
