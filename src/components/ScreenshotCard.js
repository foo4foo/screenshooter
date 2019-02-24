import React from 'react'
import { Image } from 'react-native'

type Props = {
  style: Object,
  image: string
}

const ScreenshotCard = ({ style, image }: Props) => <Image style={style} source={{ uri: image }} />

export default ScreenshotCard
