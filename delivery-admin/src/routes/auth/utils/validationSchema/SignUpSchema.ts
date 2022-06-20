import * as Yup from 'yup';
import {phoneRegex} from 'utils/ValidationUtils';

export const SignUpSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  name: Yup.string().required('Required').trim('Not empty'),
  phoneNumber: Yup.string()
    .matches(phoneRegex, 'Incorrect phone number')
    .required('Required'),
  password: Yup.string()
    .required('Required')
    .trim('Not empty')
    .min(3, 'Password should be more than 3 symbols '),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords do not match')
    .required('Password confirm is required'),
});
