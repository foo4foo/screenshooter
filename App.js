/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}
import React, { useState } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import Home from './src/components/Home'
import { get, set } from './src/lib/storage'
import { useEffectAsync } from './src/lib/utils'
import QRScanner from './src/components/QRScanner'

const App = () => {
  const [loading, setLoading] = useState(true)
  const [QRCode, setQRCode] = useState('')

  useEffectAsync(async () => {
    const hostId = await get('hostId')

    if (hostId) {
      setQRCode(hostId)
    }
    setLoading(false)
  })

  const onBarCodeRead = (e) => {
    setQRCode(e.data)
    set('hostId', e.data)
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="grey" />
        </View>
      ) : (
        <>{QRCode ? <Home /> : <QRScanner onBarCodeRead={onBarCodeRead} />}</>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0a1854'
  },
  loadingContainer: {
    justifyContent: 'center'
  }
})

export default App
