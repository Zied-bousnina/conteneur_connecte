import React, {Component} from 'react';
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
// import Fonts from '../common/assets/fonts';
import Fonts from '../../assets/fonts';
// import SvgIcon from '../common/assets/images/SvgIcon';
import SvgIcon from '../../assets/images/SvgIcon';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import BackSvg from '../../components/svg/BackSvg';
import EnterOtp from '../../components/svg/EnterOtp';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { resendOtp, setLoading, verifyEmail } from '../../redux/actions/authActions';
import EmailSent from '../../components/Animations/SentEmail';
import EmailConfirmation from '../../components/Animations/EmailConfirmation';
import { SET_EMAIL_SENT } from '../../redux/types';
import OTPVerified from '../../components/Animations/OTPVerified';
import OtpFailure from '../../components/Animations/OtpFailure';






const VerifyEmailScreen = () => {
  
  const route = useRoute();
  const { userId, email } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const emailSent  = useSelector(state=>state.errors.emailSent)
  const isLoading  = useSelector(state=>state.errors.isLoading)
  const state = useSelector(state=>state)
  const success = useSelector(state=>state.errors.errors.success)
  setTimeout(() => {
    
    dispatch(setLoading(false))
  }, 2310);
  
  // console.log(state.errors.emailSent)


  const hanndleVerifyEmail = (code) => {
    dispatch({
      type: SET_EMAIL_SENT,
      payload: true
  });
    
    console.log("success", !success)
  
    const userData = {
      userId,
      otp: code,
    };
    console.log(userData)
    dispatch(verifyEmail(userData, navigation));
    console.log(state)
  };

  const resendOTP = () => {
    console.log(email)
    dispatch(resendOtp({email}))
  };
  return (
  <>
  {success? <OTPVerified/> : null}
  {/* {!success? <OtpFailure/> : null} */}
  {isLoading? <EmailSent/> : null }
    {emailSent? <EmailSent /> : null}
    <KeyboardAvoidingView behavior="position" style={styles.mainCon}>
        <View style={{padding: 20}}>
          <Pressable onPress={() => navigation.goBack(null)}>
            {/* <SvgIcon icon={'back'} width={30} height={30} /> */}
            <BackSvg
              width={30}
              height={30}
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
              <Text style={styles.forgotDesLbl}>{email}</Text>
            </View>
            <View style={styles.formCon}>
              <OTPInputView
                pinCount={4}
                autoFocusOnLoad
                style={{width: '80%', height: 70}}
                codeInputFieldStyle={{color: '#000'}}
                onCodeFilled={code =>
                  hanndleVerifyEmail(code)
                // console.log(code)
                }
                // clearInputs

                
              />
              <Pressable onPress={ resendOTP}>
                <Text style={styles.registerLbl}>Resend OTP</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView></>
  )
}

export default VerifyEmailScreen

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