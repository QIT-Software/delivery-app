import React from 'react';
import {Field, Form, Formik, FormikState} from 'formik';
import {Button} from '@material-ui/core';
import styles from '../welcome/Welcome.module.scss';
import Schema from '../utils/validationSchema';
import {Loader, TextField} from 'components';
import {useSelector} from 'state/hooks';
import {useAuthActions} from 'state/hooks/UseActions';
import AuthLayout from '../common/AuthLayout/AuthLayout';
import {useTranslation} from 'react-i18next';

interface SignUpValues {
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  test: string;
}

const SignUp: React.FC<FormikState<SignUpValues>> = () => {
  const {t} = useTranslation('auth');
  const actions = useAuthActions();

  const {isBusy} = useSelector((state) => state.auth);

  const initialValues: SignUpValues = {
    password: '',
    email: '',
    confirmPassword: '',
    name: '',
    phoneNumber: '',
    test: '',
  };

  return (
    <AuthLayout title={t('signUp')}>
      <Formik
        initialValues={initialValues}
        validationSchema={Schema.SignUpSchema}
        onSubmit={(values, formActions) => {
          actions.registerUser(values);
          formActions.setSubmitting(false);
        }}
      >
        <Form className={styles.form}>
          <Field
            variant="outlined"
            margin="normal"
            fullWidth
            id="name"
            name="name"
            as={TextField}
            label={t('fullName')}
          />
          <Field
            variant="outlined"
            margin="normal"
            fullWidth
            name="phoneNumber"
            label={t('phone')}
            id="phoneNumber"
            autoComplete="phone"
            as={TextField}
          />
          <Field
            variant="outlined"
            margin="normal"
            fullWidth
            name="email"
            label={t('email')}
            id="email"
            autoComplete="email"
            as={TextField}
          />
          <Field
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label={t('password')}
            type="password"
            id="password"
            as={TextField}
          />
          <Field
            variant="outlined"
            margin="normal"
            fullWidth
            name="confirmPassword"
            label={t('confirmPass')}
            type="password"
            id="confirmPassword"
            as={TextField}
          />
          <div className={styles.form__btnContainer}>
            {!isBusy ? (
              <Button
                className={styles.form__btnContainer__yellow}
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
              >
                {t('signUp')}
              </Button>
            ) : (
              <Loader />
            )}
          </div>
        </Form>
      </Formik>
    </AuthLayout>
  );
};

export default SignUp;
