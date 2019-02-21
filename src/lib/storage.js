import AsyncStorage from '@react-native-community/async-storage'

export const get = async (key, defaults = {}) => {
  try {
    let data = await AsyncStorage.getItem(key)
    data = JSON.parse(data)
    return data ? data : defaults
  } catch (error) {
    return defaults
  }
}

export const set = (key, data) => {
  try {
    data = JSON.stringify(data)
    return AsyncStorage.setItem(key, data)
  } catch (e) {
    console.log(e)
  }
}

export const del = (key) => {
  return AsyncStorage.removeItem(key)
}

export const clear = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys()
    return AsyncStorage.multiRemove(keys)
  } catch (e) {
    return
  }
}
