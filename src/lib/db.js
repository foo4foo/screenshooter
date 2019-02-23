import firebase from 'react-native-firebase'

// eslint-disable-next-line import/prefer-default-export
export const getHostUrl = async (hostId) => {
  const ref = firebase.database().ref(`hosts/${hostId}`)
  const { _value } = await ref.once()
  return _value.url
}
