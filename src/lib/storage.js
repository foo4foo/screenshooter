import AsyncStorage from '@react-native-community/async-storage'

export const get = async (key, defaults = {}) => {
  try {
    let data = await AsyncStorage.getItem(key)
    data = JSON.parse(data)
    return data || defaults
  } catch (error) {
    return defaults
  }
}

export const set = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data))
  } catch (e) {
    console.log(e)
  }
}

export const del = async (key) => {
  await AsyncStorage.removeItem(key)
}

export const clear = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys()
    await AsyncStorage.multiRemove(keys)
  } catch (e) {
    console.log(e.message)
  }
}
