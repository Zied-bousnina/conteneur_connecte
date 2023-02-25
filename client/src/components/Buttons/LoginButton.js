import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useFormikContext } from 'formik'

const LoginButton = ({ name, placeholder,style,errorStyle,loginBtnLbl,btnName, ...rest}) => {
    const { handleSubmit, touched, values, isSubmitting } = useFormikContext()

  return (
    <Pressable
    style={style}
    onPress={ isSubmitting? null : handleSubmit}
    // onPress={()=>console.log(props.values)}
    backgroundColor={ isSubmitting ? '#808080' : '#0057ff'}
   
    disabled={
    //   values.email   === '' || values.password === ''
    isSubmitting
        ? true
        : false
        
    }
    >
      <Text style={loginBtnLbl}>{btnName}</Text>
    </Pressable>
  )
}

export default LoginButton