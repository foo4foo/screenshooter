import firebase from 'react-native-firebase'
import { FirebaseConfig } from '../config/firebase-config'

const initializeFirebaseApp = () => {
  firebase.initializeApp(FirebaseConfig)
}

export const getHostUrl = async (hostId) => {
  const ref = firebase.database().ref('hosts/' + hostId)
  const { _value } = await ref.once()
  return _value.url
}
