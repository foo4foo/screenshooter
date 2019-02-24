/**
 * @format
 */
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Spinner from 'react-native-spinkit'
import Home from './src/components/Home'
import { get, set } from './src/lib/storage'
import { useEffectAsync } from './src/lib/utils'
import QRScanner from './src/components/QRScanner'
import { getHostUrl } from './src/lib/db'
import { signIn } from './src/lib/auth'
// @flow

if (__DEV__) {
  import('./ReactotronConfig')
}

const App = () => {
  const [loading, setLoading] = useState(true)
  const [QRCode, setQRCode] = useState('')

  useEffectAsync(async (): void => {
    await signIn()

    const hostId = await get('hostId', '')

    if (hostId) {
      const hostUrl = await getHostUrl(hostId)

      if (hostUrl) await set('hostUrl', hostUrl)

      setQRCode(hostId)
    }
    setLoading(false)
  }, [])

  const onBarCodeRead = (e: Object): void => {
    setQRCode(e.data)
    set('hostId', e.data)
  }

  return (
    <View
      style={[styles.container, QRCode ? { alignItems: 'center', justifyContent: 'center' } : {}]}
    >
      {loading ? (
        <View style={styles.loadingContainer}>
          <Spinner isVisible size={60} type="Wave" color="#0a1854" />
        </View>
      ) : (
        <>{QRCode ? <Home /> : <QRScanner onBarCodeRead={onBarCodeRead} />}</>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default App
