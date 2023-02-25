import React, {Component, useState, useRef} from 'react';
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  TextInput,
  
  KeyboardAvoidingView,
} from 'react-native';
import Fonts from '../../assets/fonts';
import SvgIcon from '../../assets/images/SvgIcon';
// import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import SignUpSVG from '../../components/svg/SignUpSVG';
import { useNavigation } from '@react-navigation/native';
import LoginSVG from '../../components/svg/LoginSVG';
import AtSVG from '../../components/svg/AtSVG';
import UserSVg from '../../components/svg/UserSVg';
import PhoneSVG from '../../components/svg/PhoneSVG';
import CostomFormik from '../../components/costomFormik/CostomFormik';
import AppInput from '../../components/Inputs/AppInput'; 
import * as yup from 'yup'

import { Animated } from 'react-native';
import LockIcon from '../../components/svg/LockIcon';
import ShowIcon from '../../components/svg/ShowIcon';
import LoginButton from '../../components/Buttons/LoginButton';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, setLoading } from '../../redux/actions/authActions';

import AppLoader from '../../components/Animations/AppLoader';






const initialValues = {
  email: '',
  password: '',
  confirm: '',
  name:''
};
const validationSchema = yup.object({

  name: yup
    .string()
    .trim()
    .required('Name is required'),
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email address is required'),
  password: yup.string().trim().min(6, 'password is too short!').required('Password is required'),
  confirm: yup.string()
  .oneOf([yup.ref('password'), null], 'Passwords must match')
});
const AnimatedLine = Animated.createAnimatedComponent(View);

const SignUpScreen = () => {
  
  
  const [show, setshow] = useState(false);
  const lineAnimation = useRef(new Animated.Value(0)).current;  
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const errors = useSelector(state=>state.errors.errors)
  const isLoading = useSelector(state=>state.errors.isLoading)

  showPasswordHandler = navigation => {
    setshow(!show);
    Animated.timing(lineAnimation, {
      toValue: show ? 0 : 20,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };
  

  const handleSignUp = async (values, formikActions)=> {
    dispatch(setLoading(true));

    const { email, password, confirm, name } = values;
    console.log(values)
    // dispatch(formikActions.signUp(email, password, confirm, name));
    // console.log(formikActions.signUp(email, password, confirm, name))
     dispatch(registerUser({...values}, navigation))

    formikActions.resetForm()
      formikActions.setSubmitting(false);

      // console.log(errors)
      console.log(isLoading)
      

     
  }


  return (
   <>
    {isLoading? <AppLoader /> : null}
    <KeyboardAvoidingView behavior="position" style={styles.mainCon}>
        <View style={styles.loginIcon}>
          {/* <SvgIcon icon={'signup'} width={300} height={300} /> */}
          <SignUpSVG
            width={300}
            height={300}
            />           

        </View>
        <CostomFormik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSignUp}
            >
            
        <View style={styles.container}>
          <View style={styles.loginLblCon}>
            <Text style={styles.loginLbl}>Sign up</Text>
          </View>
          <View style={styles.formCon}>
            <View style={styles.textBoxCon}>
              <View style={styles.at}>
                <AtSVG
                  width={20}
                  height={20}
                />  
              </View>
              <View style={styles.textCon}>
                <AppInput
                  name="email"
                  placeholder="Email ID"
                  style={styles.textInput}
                  placeholderTextColor={'#aaa'}
                />
              </View>
            </View>
            <View style={[styles.textBoxCon, {marginTop: 30}]}>
              <View style={styles.at}>
                <UserSVg
                  width={20}
                  height={20}
                />
              </View>
              <View style={styles.textCon}>
                <AppInput
                  name="name"
                  placeholder="Full Name"
                  style={styles.textInput}
                  placeholderTextColor={'#aaa'}
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
            <View style={[styles.textBoxCon, {marginTop: 30}]}>
              <View style={styles.at}>
                <LockIcon width={20} height={20} />
              </View>
              <View style={[styles.passCon]}>
                <View style={styles.textCon}>
                  <AppInput
                    name="confirm"
                    placeholder="Confirm Password"
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
            <View style={styles.termsCon}>
              <Text style={styles.termsBy}>
                By signing up, you're agree to our{' '}
              </Text>
              <Pressable
                onPress={() =>navigation.navigate('SignUpScreen')}>
                <Text style={styles.termLbl}>Terms & Conditions </Text>
              </Pressable>
              <Text style={styles.termsBy}> and </Text>
              <Pressable
                onPress={() => navigation.navigate('SignUpScreen')}>
                <Text style={styles.termLbl}>Privacy Policy</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.loginCon}>
            <LoginButton
              style={styles.LoginBtn}
              loginBtnLbl={styles.loginBtnLbl}
              btnName={"Register"}
            />
          </View>

          <View style={styles.registerCon}>
            <Text style={styles.registerNew}>Joined us before? </Text>
            <Pressable
              onPress={() => navigation.navigate('Login')}>
              <Text style={styles.registerLbl}>Login</Text>
            </Pressable>
            
          </View>
        </View>
        </CostomFormik>
      </KeyboardAvoidingView></>
    
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  mainCon: {
    backgroundColor: '#fff',
    flex: 1,
    
  },
  loginIcon: {
    alignSelf: 'center',
    marginTop: -30,
  },
  formCon: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: -30,
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
  registerCon: {flexDirection: 'row', justifyContent: 'center', paddingTop: 0},
  registerLbl: {color: '#0057ff', fontFamily: Fonts.type.NotoSansSemiBold},
  registerNew: {
    color: '#aaa',
    fontFamily: Fonts.type.NotoSansSemiBold,
  },
  forgotLbl: {
    color: '#0057ff',
    // textAlign: 'right',
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
  termsCon: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    paddingVertical: 20,
  },
  termsBy: {
    fontSize: 12,
    color: '#aaa',
    fontFamily: Fonts.type.NotoSansSemiBold,
  },
  termLbl: {
    color: '#0057ff',
    fontFamily: Fonts.type.NotoSansSemiBold,
    fontSize: 12,
  },
});