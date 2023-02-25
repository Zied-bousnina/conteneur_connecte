import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
const EmailSent = () => {
  return (
    <View
        style={[StyleSheet.absoluteFillObject, styles.container]}
    >
      <LottieView
        source={{
            // uri: 'https://assets9.lottiefiles.com/packages/lf20_y9qOnk.json'
            // uri: 'https://assets9.lottiefiles.com/packages/lf20_bEQdwC.json'
            uri: 'https://assets9.lottiefiles.com/packages/lf20_Cc8Bpg.json'
        }}
        autoPlay
        loop
        
        
        />

    </View>
  )
}

export default EmailSent

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 1000,
        
       
    },
})