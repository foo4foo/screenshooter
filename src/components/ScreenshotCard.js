import React from 'react'
import { Image } from 'react-native'

type Props = {
  item: string,
  screenWidth: number
}

const ScreenshotCard = ({ item, screenWidth }: Props) => (
  <Image
    source={{ uri: item }}
    resizeMode="contain"
    style={{
      width: screenWidth - screenWidth / 10,
      height: 200
    }}
  />
)

export default ScreenshotCard
