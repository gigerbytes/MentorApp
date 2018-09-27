import { AsyncStorage } from 'react-native'

export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (error) {
    console.log(error)
  }
}

export const getItem = async key => {
  try {
    const value = await AsyncStorage.getItem(key)
    if (value !== null) {
      return value
    }
  } catch (error) {
    console.log(error)
  }
}
