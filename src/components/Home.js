// @flow
import React, { useState } from 'react'
import {
  ActivityIndicator,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Dimensions
} from 'react-native'
import Carousel from 'react-native-snap-carousel'
import photo from '../../assets/images/photo.png'

const API_URL = 'https://170e89e7.ngrok.io'

const SCREEN_WIDTH = Dimensions.get('screen').width

const Home = () => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [screenshots, setScreenshots] = useState([])
  const [activeSlide, setActiveSlide] = useState(1)

  const takeScreenshoot = async () => {
    setLoading(true)

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
    } catch (error) {
      setError(error.message)
    }
    setLoading(false)
  }

  const renderScreenshot = ({ item }) => {
    return (
      <Image
        key={item}
        source={{ uri: item }}
        resizeMode="contain"
        style={{
          width: SCREEN_WIDTH - SCREEN_WIDTH / 10,
          height: 200
        }}
      />
    )
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={takeScreenshoot}>
          <Image source={photo} style={styles.photo} />
        </TouchableOpacity>
      )}
      {screenshots.length > 0 && (
        <>
          <Carousel
            layout={'tinder'}
            layoutCardOffset={9}
            firstItem={screenshots.length - 1}
            inactiveSlideScale={0.94}
            inactiveSlideOpacity={0.7}
            hasParallaxImages={true}
            containerCustomStyle={styles.slider}
            data={screenshots}
            renderItem={renderScreenshot}
            sliderWidth={SCREEN_WIDTH}
            itemWidth={SCREEN_WIDTH - SCREEN_WIDTH / 10}
            onSnapToItem={(index) => {
              setActiveSlide(index)
            }}
            enableMomentum={true}
          />
        </>
      )}
      <Text style={{ color: '#fff' }}>{activeSlide}</Text>
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
    backgroundColor: '#183091',
    borderWidth: 1,
    borderColor: '#fff',
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
  }
})

export default Home
