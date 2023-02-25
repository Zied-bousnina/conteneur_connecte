import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import 'react-native-gesture-handler';

import {  SignInScreen,
  SignUpScreen,
  HomeScreen,
  ResetPasswordScreen,
  VerifyEmailScreen,
  ForgotPasswordScreen
} from './route';


const AppNavigation = createStackNavigator(
  {
    SignInScreen: {
      screen: SignInScreen,
      navigationOptions: {
        headerShown: null,
      },
    },
    SignUpScreen: {
      screen: SignUpScreen,
      navigationOptions: {
        headerShown: null,
      },
    },
    VerifyEmailScreen: {
      screen: VerifyEmailScreen,
      navigationOptions: {
        headerShown: null,
      },
    },
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerShown: null,
      },
    },
    ForgotPassword: {
      screen: ForgotPasswordScreen,
      navigationOptions: {
        headerShown: null,
      },
    },
    ResetPassword: {
      screen: ResetPasswordScreen,
      navigationOptions: {
        headerShown: null,
      },
    },
  },
  {
    navigationOptions: {
      getSelection: false,
      headerVisible: false,
    },
    headerMode: 'screen',
  },
);

export default createAppContainer(AppNavigation);
