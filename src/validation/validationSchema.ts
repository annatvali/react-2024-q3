import * as yup from 'yup';
import { FileMetadata, Gender } from '../types/FormData';

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Z]/, 'First letter must be uppercase')
    .required('Name is required'),
  age: yup
    .number()
    .positive('Age must be a positive number')
    .integer('Age must be an integer')
    .required('Age is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character'
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  gender: yup
    .mixed<Gender>()
    .oneOf(Object.values(Gender))
    .required('Gender is required'),
  terms: yup
    .bool()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('Terms and conditions is required'),
  picture: yup.mixed<FileMetadata[]>().required('Picture is required'),
  country: yup.string().required('Country is required'),
});

export default validationSchema;
