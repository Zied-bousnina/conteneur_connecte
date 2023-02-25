import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { useFormikContext } from 'formik'
import { StyleSheet } from 'react-native'
import Fonts from '../../assets/fonts';
import { useDispatch, useSelector } from 'react-redux';

const AppInput = ({ name, placeholder,style,errorStyle, placeholderTextColor, ...rest}) => {
  const errors1 = useSelector(state=>state?.errors?.errors)
    const { handleChange, touched, errors, values, handleBlur } = useFormikContext()
  return (
    <>
    <TextInput
                style={style}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
              onChangeText={handleChange(name)}
              onBlur={handleBlur(name)}
              
              
              value={values[name]}
              {...rest}
              
              />
               {touched[name] && errors[name] || errors1[name] ? (
                  <Text style={styles.error}>{errors[name]} {errors1[name]} </Text>
                  ) : null}
             
                  </>
  )
}

const styles = StyleSheet.create({
   
    error: {
      color: 'red',
      fontFamily: Fonts.type.NotoSansSemiBold,
      fontSize: 12,
    },

  });
export default AppInput