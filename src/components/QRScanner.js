import React from 'react'
import { StyleSheet } from 'react-native'
import { RNCamera } from 'react-native-camera'
// @flow

type Props = {
  onBarCodeRead?: Function
}

const QRScanner = (props: Props) => {
  const { onBarCodeRead } = props

  return (
    <RNCamera
      barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
      flashMode={RNCamera.Constants.FlashMode.on}
      style={styles.preview}
      onBarCodeRead={onBarCodeRead}
    />
  )
}

QRScanner.defaultProps = {
  onBarCodeRead: () => {}
}

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
})

export default QRScanner
