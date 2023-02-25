

import React from 'react'
import { Formik } from 'formik'



const CostomFormik = ({children, initialValues, validationSchema, onSubmit}) => {

   
  return (
    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
    >
    {() => {
      // console.log(values, errors, touched)
      return (
        <>
            {children}
        </>

      )
      }}
    </Formik>
  )
}

export default CostomFormik