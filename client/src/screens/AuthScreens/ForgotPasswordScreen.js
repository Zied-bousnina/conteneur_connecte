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
import SvgIcon from '../../assets/images/SvgIcon';
import ForgotSVG from '../../components/svg/ForgotSVG';
import BackSvg from '../../components/svg/BackSvg';
import AtSVG from '../../components/svg/AtSVG';
import {useNavigation} from '@react-navigation/native'
import CostomFormik from '../../components/costomFormik/CostomFormik';
import AppInput from '../../components/Inputs/AppInput';
import * as yup from 'yup';
import LoginButton from '../../components/Buttons/LoginButton';

const validationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email address is required'),
});

const initialValues = {
  email: '',
}

const ForgotPasswordScreen = () => {
  const navigation = useNavigation()

  const handleForgotPassword = ()=>{
    console.log('forgot password')
  }
  return (
    <KeyboardAvoidingView behavior="position" style={styles.mainCon}>
        <View style={{padding: 20}}>
          <Pressable onPress={
            () => navigation.goBack(null)
          }>
            {/* <SvgIcon icon={'back'} width={30} height={30} /> */}
            <BackSvg
              width={31}
              height={31}
            />
          </Pressable>
        </View>
        <View style={{position: 'relative', bottom: 30}}>
          <View style={styles.loginIcon}>
           
            <ForgotSVG
              width={320}
              height={320}
            />
          </View>
          <CostomFormik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleForgotPassword}
            >
          <View style={styles.container}>
            <View style={styles.loginLblCon}>
              <Text style={styles.loginLbl}>Forgot Password?</Text>
            </View>
            <View style={styles.forgotDes}>
              <Text style={styles.forgotDesLbl}>
                Don't worry! It happens, please enter the address associated
                with your account
              </Text>
            </View>
            <View style={styles.formCon}>
              <View style={styles.textBoxCon}>
                <View style={styles.at}>
                  {/* <SvgIcon icon={'at'} width={20} height={20} /> */}
                  <AtSVG
                    width={20}
                    height={20}
                  />
                </View>
                <View style={styles.textCon}>
                  {/* <TextInput
                    style={styles.textInput}
                    placeholder={'Email ID'}
                    placeholderTextColor={'#aaa'}
                  /> */}
                  <AppInput
                    name="email"
                    placeholder="Email ID"
                    style={styles.textInput}
                    placeholderTextColor={'#aaa'} 
                    />
                    
                </View>
              </View>
            </View>

            <View style={[styles.loginCon, {marginTop: 40}]}>
              {/* <Pressable
                style={styles.LoginBtn}
                onPress={() => navigation.navigate('EnterOTPResetPassword')}>
                <Text style={styles.loginBtnLbl}>Submit</Text>
              </Pressable> */}

              <LoginButton
                style={styles.LoginBtn}
                loginBtnLbl={styles.loginBtnLbl}
                btnName={"Send Link"}
              />
                

            </View>
          </View>
          </CostomFormik>
        </View>
      </KeyboardAvoidingView>
  )
}

export default ForgotPasswordScreen

const styles = StyleSheet.create({
  mainCon: {
    backgroundColor: '#fff',
    flex: 1,
  },
  loginIcon: {
    alignSelf: 'center',
  },
  formCon: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  container: {
    paddingHorizontal: 20,
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
  at: {
    alignSelf: 'center',
    width: '10%',
  },

  textBoxCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textCon: {
    width: '90%',
  },

  textInput: {
    borderBottomColor: '#aaa',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    color: '#000',
    fontSize: 16,
    fontFamily: Fonts.type.NotoSansMedium,
    height: 40,
  },

  LoginBtn: {
    backgroundColor: '#0057ff',
    borderRadius: 20,
  },
  loginBtnLbl: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: Fonts.type.NotoSansBlack,
    color: '#fff',
    paddingVertical: 10,
  },

  forgotDes: {
    position: 'relative',
    bottom: 35,
  },
  forgotDesLbl: {
    color: '#000',
    fontFamily: Fonts.type.NotoSansRegular,
  },
});