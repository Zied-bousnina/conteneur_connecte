import React, {Component} from 'react';
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
// import Fonts from '../common/assets/fonts';
import Fonts from '../../assets/fonts';
// import SvgIcon from '../common/assets/images/SvgIcon';
import SvgIcon from '../../assets/images/SvgIcon';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {useNavigation} from '@react-navigation/native';
import BackSvg from '../../components/svg/BackSvg';
import EnterOtp from '../../components/svg/EnterOtp';



const EnterOTPResetPassword = () => {
  const navigation = useNavigation();
  const resendOTP = ()=> {


  }
  return (
    <KeyboardAvoidingView behavior="position" style={styles.mainCon}>
        <View style={{padding: 20}}>
          <Pressable onPress={() => navigation.goBack(null)}>
            {/* <SvgIcon icon={'back'} width={30} height={30} /> */}
            <BackSvg
              width={31}
              height={31}
            />
          </Pressable>
        </View>
        <View style={{position: 'relative', bottom: 30}}>
          <View style={styles.loginIcon}>
            {/* <SvgIcon icon={'enterOtp'} width={280} height={280} /> */}
            <EnterOtp
              width={280}
              height={280}
            />
          </View>
          <View style={styles.container}>
            <View style={styles.loginLblCon}>
              <Text style={styles.loginLbl}>Enter OTP?</Text>
            </View>
            <View style={styles.forgotDes}>
              <Text style={styles.forgotDesLbl}>
                An 4 digit code has been sent to
              </Text>
              <Text style={styles.forgotDesLbl}>+91 1234567890</Text>
            </View>
            <View style={styles.formCon}>
              <OTPInputView
                pinCount={4}
                autoFocusOnLoad
                style={{width: '80%', height: 70}}
                codeInputFieldStyle={{color: '#000'}}
                onCodeFilled={code =>navigation.navigate('ResetPassword')
                // console.log(code)
                }
                // clearInputs

                
              />
              <Pressable onPress={() => this.resendOTP()}>
                <Text style={styles.registerLbl}>Resend OTP</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
  )
}

export default EnterOTPResetPassword

const styles = StyleSheet.create({
  mainCon: {
    backgroundColor: '#fff',
    flex: 1,
  },
  loginIcon: {
    alignSelf: 'center',
  },
  formCon: {
    alignItems: 'center',
  },
  container: {
    paddingHorizontal: 20,
    marginTop: 50,
  },
  loginLblCon: {
    position: 'relative',
    bottom: 40,
  },
  loginLbl: {
    color: '#000',
    fontSize: 40,
    fontFamily: Fonts.type.NotoSansExtraBold,
  },
  forgotDes: {
    position: 'relative',
    bottom: 35,
  },
  forgotDesLbl: {
    color: '#000',
    fontFamily: Fonts.type.NotoSansRegular,
  },
  registerLbl: {color: '#0057ff', fontFamily: Fonts.type.NotoSansSemiBold},
});