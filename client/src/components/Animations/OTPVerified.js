import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
const OTPVerified = () => {
  return (
    <View
        style={[StyleSheet.absoluteFillObject, styles.container]}
    >
      <LottieView
        source={{
            uri: 'https://assets3.lottiefiles.com/packages/lf20_55kkjtkv.json'
        }}
        autoPlay
        loop
        />

    </View>
  )
}

export default OTPVerified

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 1000,
    },
})