import firebase from 'react-native-firebase'

// eslint-disable-next-line import/prefer-default-export
export const signIn = async (): void => {
  await firebase.auth().signInAnonymously()
}
