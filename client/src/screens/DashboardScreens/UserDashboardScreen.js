import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native'
import LoginButton from '../../components/Buttons/LoginButton'
import { useDispatch } from 'react-redux'

import { LogOut } from '../../redux/actions/authActions'




const UserDashboardScreen = () => {
  const dispatch = useDispatch()

  const handleLogOut= _ => {
    console.log("logout")
    dispatch(LogOut())
   
  }
  return (
    <View>
      <Text>UserDashboardScreen</Text>

      <Button
  onPress={handleLogOut}
  title="LogOut"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>

      
    </View>
  )
}

export default UserDashboardScreen

// const styles = StyleSheet.create({
//   mainCon: {
//     backgroundColor: '#fff',
//     flex: 1,
    
//   },
//   loginIcon: {
//     alignSelf: 'center',
//     marginTop: -30,
//   },
//   formCon: {
//     flexDirection: 'column',
//     justifyContent: 'space-around',
//     marginTop: -30,
//   },
//   container: {
//     paddingHorizontal: 20,
//     marginTop: -20,
//   },
//   loginLblCon: {
//     position: 'relative',
//     bottom: 40,
//   },
//   loginLbl: {
//     color: '#000',
//     fontSize: 40,
//     fontFamily: Fonts.type.NotoSansExtraBold,
//   },
//   at: {
//     alignSelf: 'center',
//     width: '10%',
//   },
//   show: {
//     alignSelf: 'center',
//     width: '10%',
//     position: 'relative',
//     right: 20,
//     zIndex: 10,
//   },
//   textBoxCon: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   textCon: {
//     width: '90%',
//   },
//   passCon: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   textInput: {
//     borderBottomColor: '#aaa',
//     borderWidth: 1,
//     borderTopWidth: 0,
//     borderLeftWidth: 0,
//     borderRightWidth: 0,
//     color: '#000',
//     fontSize: 16,
//     fontFamily: Fonts.type.NotoSansMedium,
//     height: 40,
//   },
//   forgotAction: {
//     paddingVertical: 20,
//   },
//   registerCon: {flexDirection: 'row', justifyContent: 'center', paddingTop: 0},
//   registerLbl: {color: '#0057ff', fontFamily: Fonts.type.NotoSansSemiBold},
//   registerNew: {
//     color: '#aaa',
//     fontFamily: Fonts.type.NotoSansSemiBold,
//   },
//   forgotLbl: {
//     color: '#0057ff',
//     // textAlign: 'right',
//     fontFamily: Fonts.type.NotoSansSemiBold,
//   },
//   LoginBtn: {
//     backgroundColor: '#0057ff',
//     borderRadius: 20,
//   },
//   loginBtnLbl: {
//     textAlign: 'center',
//     fontSize: 16,
//     fontFamily: Fonts.type.NotoSansBlack,
//     color: '#fff',
//     paddingVertical: 10,
//   },
//   devider: {
//     borderBottomColor: '#aaa',
//     borderBottomWidth: StyleSheet.hairlineWidth,
//     marginTop: 20,
//   },
//   or: {
//     color: '#aaa',
//     textAlign: 'center',
//     backgroundColor: '#fff',
//     width: 60,
//     alignSelf: 'center',
//     fontFamily: Fonts.type.NotoSansSemiBold,
//     position: 'relative',
//     bottom: 13,
//   },
//   deviderCon: {
//     paddingVertical: 10,
//   },
//   googleIconCon: {
//     flexDirection: 'row',
//     backgroundColor: '#eee',
//     justifyContent: 'center',
//     paddingVertical: 15,
//     borderRadius: 20,
//     paddingHorizontal: 30,
//   },
//   googleLbl: {
//     color: '#000',
//     textAlign: 'center',
//     paddingHorizontal: 30,
//     fontFamily: Fonts.type.NotoSansBlack,
//   },
//   termsCon: {
//     flexDirection: 'row',
//     width: '100%',
//     flexWrap: 'wrap',
//     paddingVertical: 20,
//   },
//   termsBy: {
//     fontSize: 12,
//     color: '#aaa',
//     fontFamily: Fonts.type.NotoSansSemiBold,
//   },
//   termLbl: {
//     color: '#0057ff',
//     fontFamily: Fonts.type.NotoSansSemiBold,
//     fontSize: 12,
//   },
// });