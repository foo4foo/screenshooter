import firebase from 'react-native-firebase'

export const signIn = async () => {
  await firebase.auth().signInAnonymously()
}
