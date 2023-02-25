import React, {Component, useState, useRef} from 'react';
import {
  Text,
  View,
  Pressable,
  Animated,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import Fonts from '../../assets/fonts';
import SvgIcon from '../../assets/images/SvgIcon';
import {useNavigation} from '@react-navigation/native';

import {TouchableOpacity} from 'react-native-gesture-handler';
import {Image} from 'react-native-svg';
import LoginSVG from '../../components/svg/LoginSVG';
import AtSVG from '../../components/svg/AtSVG';
import LockIcon from '../../components/svg/LockIcon';
import ShowIcon from '../../components/svg/ShowIcon';
import GoogleSvg from '../../components/svg/GoogleSvg';
import * as yup from 'yup';
import {Formik} from 'formik';
import AppInput from '../../components/Inputs/AppInput';
import LoginButton from '../../components/Buttons/LoginButton';
import CostomFormik from '../../components/costomFormik/CostomFormik';
import EmailSent from '../../components/Animations/SentEmail';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/actions/authActions';


const initialValues = {
  email: '',
  password: '',
};
const validationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email address is required'),
  password: yup
    .string()
    .trim()
    .min(4, 'password is too short!')
    .required('Password is required'),
});
const AnimatedLine = Animated.createAnimatedComponent(View);
const LogInScreen = () => {
  const [show, setshow] = useState(false);
  const lineAnimation = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const [loading, setloading] = useState(false)
  const dispatch = useDispatch();

  showPasswordHandler = navigation => {
    setshow(!show);
    Animated.timing(lineAnimation, {
      toValue: show ? 0 : 20,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleLogin = (values, formikActions) => {
    console.log(values);
    console.log(formikActions);
    dispatch(loginUser(values))
    
      console.log(values, formikActions);
      formikActions.resetForm()
      formikActions.setSubmitting(false);

   
  };

  return (
    <>
    {loading ? <EmailSent/> :null }

    
      
    <KeyboardAvoidingView behavior="position" style={styles.mainCon}>
      <View style={styles.loginIcon}>
        <LoginSVG width={300} height={300} />
      </View>

      <CostomFormik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}>
        <View style={styles.container}>
          <View style={styles.loginLblCon}>
            <Text style={styles.loginLbl}>Login</Text>
          </View>
          <View style={styles.formCon}>
            <View style={styles.textBoxCon}>
              <View style={styles.at}>
                <AtSVG width={20} height={20} />
              </View>
              <View style={styles.textCon}>
                <AppInput
                  name="email"
                  placeholder="Email ID"

                  // placeholderTextColor={'#aaa'}
                />
              </View>
            </View>

            <View style={[styles.textBoxCon, {marginTop: 30}]}>
              <View style={styles.at}>
                <LockIcon width={20} height={20} />
              </View>
              <View style={[styles.passCon]}>
                <View style={styles.textCon}>
                  <AppInput
                    name="password"
                    placeholder="Password"
                    secureTextEntry={!show}
                    style={styles.textInput}
                    placeholderTextColor={'#aaa'}
                  />
                </View>
                <View style={styles.show}>
                  <Pressable onPress={showPasswordHandler}>
                    <ShowIcon width={20} height={20} />
                    <AnimatedLine
                      style={{
                        height: 2,
                        width: lineAnimation,
                        backgroundColor: 'black',
                        position: 'absolute',
                        bottom: 10,
                        left: 0,
                        transform: [{rotate: '150deg'}],
                      }}
                    />
                  </Pressable>
                </View>
              </View>
            </View>

            <View style={styles.forgotAction}>
              <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.forgotLbl}>Forgot Password?</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.loginCon}>
            <LoginButton
              style={styles.LoginBtn}
              loginBtnLbl={styles.loginBtnLbl}
              btnName={"Login"}
            />
          </View>
          <View style={styles.deviderCon}>
            <View style={styles.devider} />
            <Text style={styles.or}>OR</Text>
          </View>
          <View style={styles.googleIconCon}>
            <View style={styles.googleIcon}>
              <GoogleSvg width={20} height={20} />
            </View>
            <View style={styles.googleLblCon}>
              <TouchableOpacity onPress={() => this.firebaseGoogleLogin()}>
                <Text style={styles.googleLbl}>Login with Google</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.registerCon}>
            <Text style={styles.registerNew}>New User? </Text>
            <Pressable onPress={() => navigation.navigate('SignUpScreen')}>
              <Text style={styles.registerLbl}>Register</Text>
            </Pressable>
            
          </View>
        </View>
      </CostomFormik>
    </KeyboardAvoidingView>
    
    </>
  );
};

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
    marginTop: -20,
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
  show: {
    alignSelf: 'center',
    width: '10%',
    position: 'relative',
    right: 20,
    zIndex: 10,
  },
  textBoxCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textCon: {
    width: '90%',
  },
  passCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  forgotAction: {
    paddingVertical: 20,
  },
  registerCon: {flexDirection: 'row', justifyContent: 'center', paddingTop: 10},
  registerLbl: {color: '#0057ff', fontFamily: Fonts.type.NotoSansSemiBold},
  registerNew: {
    color: '#aaa',
    fontFamily: Fonts.type.NotoSansSemiBold,
  },
  forgotLbl: {
    color: '#0057ff',
    textAlign: 'right',
    fontFamily: Fonts.type.NotoSansSemiBold,
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
  devider: {
    borderBottomColor: '#aaa',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 20,
  },
  or: {
    color: '#aaa',
    textAlign: 'center',
    backgroundColor: '#fff',
    width: 60,
    alignSelf: 'center',
    fontFamily: Fonts.type.NotoSansSemiBold,
    position: 'relative',
    bottom: 13,
  },
  deviderCon: {
    paddingVertical: 10,
  },
  googleIconCon: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 20,
    paddingHorizontal: 30,
  },
  googleLbl: {
    color: '#000',
    textAlign: 'center',
    paddingHorizontal: 30,
    fontFamily: Fonts.type.NotoSansBlack,
  },
  googleIcon: {
    alignSelf: 'center',
  },
  googleLblCon: {
    alignSelf: 'center',
  },
  error: {
    color: 'red',
    fontFamily: Fonts.type.NotoSansSemiBold,
    fontSize: 12,
  },
});

export default LogInScreen;
