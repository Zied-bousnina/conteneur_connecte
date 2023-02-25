import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
const OtpFailure = () => {
  return (
    <View
        style={[StyleSheet.absoluteFillObject, styles.container]}
    >
      <LottieView
        source={{
            uri: 'https://assets1.lottiefiles.com/packages/lf20_dyZlfDsL2b.json'
        }}
        autoPlay
        loop
        />

    </View>
  )
}

export default OtpFailure

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 1000,
    },
})