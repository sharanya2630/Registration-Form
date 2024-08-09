import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './RegisterForm.css'; 
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validationSchema = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[!@#$%^&*]/, 'Password must contain at least one special character')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);
    try {
      const response = await axios.post('http://localhost:5000/api/register', values);
      console.log(response.data);
      window.alert('Successfully registered!');
      resetForm();
    } catch (error) {
      console.error('Error registering user:', error);
      window.alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className='bg-container'>
      <div className="form-container">
      <h2>Register</h2>
      <Formik
        initialValues={{ fullName: '', email: '', password: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <Field type="text" name="fullName" />
              <ErrorMessage name="fullName" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>

            <div className="form-group show-password">
              <label htmlFor="password">Password</label>
              <Field 
                type={showPassword ? 'text' : 'password'} 
                name="password" 
                className="password-field"
              />
              <span
                className="show-password-icon"
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>

            <div className="form-group show-password">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field 
                type={showConfirmPassword ? 'text' : 'password'} 
                name="confirmPassword" 
                className="password-field"
              />
              <span
                className="show-password-icon"
                onClick={() => setShowConfirmPassword(prev => !prev)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              <ErrorMessage name="confirmPassword" component="div" className="error-message" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
    </div>
  );
};

export default RegisterForm;
