import React, { useState } from 'react'
import { Animated, View, StyleSheet, TouchableOpacity, Image, Text, Dimensions } from 'react-native'
import Spinner from 'react-native-spinkit'
import { ParallaxSwiper, ParallaxSwiperPage } from 'react-native-parallax-swiper'
import ScreenshotCard from './ScreenshotCard'
import { get } from '../lib/storage'
import photo from '../../assets/images/photo.png'
// @flow

const { width, height } = Dimensions.get('window')

const Home = () => {
  const animatedValue = new Animated.Value(0)

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [screenshots, setScreenshots] = useState([])

  const getPageTransformStyle = (index) => ({
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [
            (index - 1) * (width + 8), // Add 8 for dividerWidth
            index * (width + 8),
            (index + 1) * (width + 8)
          ],
          outputRange: [0, 1, 0],
          extrapolate: 'clamp'
        })
      },
      {
        rotate: animatedValue.interpolate({
          inputRange: [(index - 1) * (width + 8), index * (width + 8), (index + 1) * (width + 8)],
          outputRange: ['180deg', '0deg', '-180deg'],
          extrapolate: 'clamp'
        })
      }
    ]
  })

  const takeScreenshoot = async (): void => {
    setLoading(true)

    const API_URL = await get('hostUrl', '')

    if (API_URL) {
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (response.status !== 200) throw Error('Something went wrong')

        const { successful, url } = await response.json()

        if (successful && !!url) {
          setScreenshots([...screenshots, `${API_URL}${url}`])
        }
      } catch (err) {
        setError(err.message)
      }
    }
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <Spinner isVisible size={60} type="9CubeGrid" color="#0a1854" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={takeScreenshoot}>
          <Image source={photo} style={styles.photo} />
        </TouchableOpacity>
      )}
      {screenshots.length > 0 && (
        <>
          <ParallaxSwiper
            speed={0.5}
            animatedValue={animatedValue}
            dividerWidth={8}
            dividerColor="black"
            backgroundColor="black"
            onMomentumScrollEnd={(activePageIndex) => console.log(activePageIndex)}
            showProgressBar
            progressBarBackgroundColor="rgba(0,0,0,0.25)"
            progressBarValueBackgroundColor="white"
          >
            {screenshots.map((image, index) => (
              <ParallaxSwiperPage
                key={image}
                BackgroundComponent={
                  <ScreenshotCard style={styles.backgroundImage} image={image} />
                }
                ForegroundComponent={
                  <View style={styles.foregroundTextContainer}>
                    <Animated.Text style={[styles.foregroundText, getPageTransformStyle(index)]}>
                      {image}
                    </Animated.Text>
                  </View>
                }
              />
            ))}
            <ParallaxSwiperPage
              BackgroundComponent={
                <Image
                  style={styles.backgroundImage}
                  source={{
                    uri:
                      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROOw-x6SpQur3_MGlEz4r_ydWYx2Tj528UwpibUo3NUVpGq3sW'
                  }}
                />
              }
              ForegroundComponent={
                <View style={styles.foregroundTextContainer}>
                  <Animated.Text
                    style={[styles.foregroundText, getPageTransformStyle(screenshots.length - 1)]}
                  >
                    End
                  </Animated.Text>
                </View>
              }
            />
          </ParallaxSwiper>
        </>
      )}
      {!!error && <Text>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  button: {
    marginVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 150,
    backgroundColor: '#e6e6e6',
    borderWidth: 1,
    borderColor: '#183091',
    height: 150,
    width: 150
  },
  photo: {
    width: 64,
    height: 64
  },
  paginationContainer: {
    paddingVertical: 8
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8
  },
  slider: {
    marginTop: 15,
    overflow: 'visible'
  },
  backgroundImage: {
    width,
    height
  },
  foregroundTextContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  foregroundText: {
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: 0.41,
    color: 'white'
  }
})

export default Home
