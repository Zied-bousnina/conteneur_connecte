/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';

import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Alert,
  View,
  Text,
} from 'react-native';

import EditProfile from './src/components/Profile/EditProfile';
import Login from './src/components/Auth/Login';
import OTPScreen from './src/screens/AuthScreens/EnterOTPResetPassword';
import ForgotPasswordScreen from './src/screens/AuthScreens/ForgotPasswordScreen';
import LogInScreen from './src/screens/AuthScreens/LoginScreen';
import VerifyEmailScreen from './src/screens/AuthScreens/VerifyEmailScreen';
import SignupScreen from './src/screens/AuthScreens/SignupScreen';
import ResetPassword from './src/screens/AuthScreens/ResetPassword';
import EnterOTPResetPassword from './src/screens/AuthScreens/EnterOTPResetPassword';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditProfileScreen from './src/screens/ProfileScreen/EditProfileScreen';
import AdminDashboardScreen from './src/screens/DashboardScreens/AdminDashboardScreen';
import MunicipalDashboardScreen from './src/screens/DashboardScreens/MunicipalDashboardScreen';
import UserDashboardScreen from './src/screens/DashboardScreens/UserDashboardScreen';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import store from './src/redux/store/store';
import { setCurrentUser } from './src/redux/actions/authActions';
import { SetAuthToken } from './src/utils/SetAuthToken';
import { useSelector } from 'react-redux';
const Stack = createNativeStackNavigator();



AsyncStorage.getItem('jwtToken').then((value) => {
if (value) {
  const decode = jwt_decode(value);
  console.log(decode)
  store.dispatch(setCurrentUser(decode));
  SetAuthToken(AsyncStorage.getItem('jwtToken'));
  }
}).catch((err) => {
    console.log(err);
  }
)
 


function App(): JSX.Element {
  const [isConnected, setIsConnected] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const user = useSelector(state => state.auth);
  console.log(user)
  


  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      setShowMessage(true);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        setShowMessage(false);
      }, 1000); // Delay for 1 second
    }
  }, [showMessage]);
  console.log(isConnected);
  // const user = {
  //   isConnected: false,
  //   isAdmin: false,
  //   isMunicipal: false,
  //   isUser: false,
  //   isVerified: false,
  //   profileIsEmpty: false,
  //   email: 'user@example.com',
  //   token: '',
  // };
  
  return (
    <NavigationContainer>
      <View>
        {showMessage && isConnected && (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>Connected</Text>
          </View>
        )}
        {!isConnected && (
          <Text style={{ color: 'red', backgroundColor: 'white' }}>
            {!isConnected && 'Internet Disconnected'}
          </Text>
        )}
      </View>

      {user.isConnected ? (
        user.isUser && user.profileIsEmpty ? (
          <Stack.Navigator
            initialRouteName="EditProfile"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          </Stack.Navigator>
        ) : user.isAdmin ? (
          <Stack.Navigator
            initialRouteName="AdminDashboard"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen
              name="AdminDashboard"
              component={AdminDashboardScreen}
            />
          </Stack.Navigator>
        ) : user.isMunicipal ? (
          <Stack.Navigator initialRouteName="MunicipalDashboard">
            <Stack.Screen
              name="MunicipalDashboard"
              component={MunicipalDashboardScreen}
            />
          </Stack.Navigator>
        ) : user.isUser && !user.isVerified ? (
          <Stack.Navigator
            initialRouteName="VerifyEmail"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen
              name="VerifyEmail"
              component={VerifyEmailScreen}
              initialParams={{ email: user.email }}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator
            initialRouteName="UserDashboard"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen
              name="UserDashboard"
              component={UserDashboardScreen}
            />
          </Stack.Navigator>
        )
      ) : (
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Login" component={LogInScreen} />
          <Stack.Screen name="SignUpScreen" component={SignupScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="EnterOTPResetPassword" component={EnterOTPResetPassword} />
          <Stack.Screen name="OTPVerifyEmail" component={VerifyEmailScreen} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />

        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    backgroundColor: 'green',
    padding: 0,
    position: 'relative',
    // top:10,
    width: '100%',

    zIndex: 555,
  },
  messageText: {
    color: 'white',
  },
});
export default App;
