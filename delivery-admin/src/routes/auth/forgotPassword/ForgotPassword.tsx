import React from 'react';
import {Field, Form, Formik} from 'formik';
import {Button, Grid, Link} from '@material-ui/core';
import Schema from '../utils/validationSchema';
import styles from '../welcome/Welcome.module.scss';
import {Loader, TextField} from 'components';
import {useAuthActions} from 'state/hooks/UseActions';
import {useSelector} from 'state/hooks';
import AuthLayout from '../common/AuthLayout/AuthLayout';
import {Link as RouterLink} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

interface ForgotPasswordValues {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const {t} = useTranslation('auth');
  const actions = useAuthActions();
  const {isBusy} = useSelector((state) => state.auth);

  const initialValues: ForgotPasswordValues = {
    email: '',
  };
  const renderBottomElements = () => (
    <Grid container className={styles.bottomContainer}>
      <Grid item>
        <span>{t('forgotPassword')}</span>
        <Link
          underline="always"
          color="inherit"
          component={RouterLink}
          to="/forgotPassword"
        >
          {t('restore')}
        </Link>
      </Grid>
    </Grid>
  );
  return (
    <AuthLayout
      title={t('accessRecovery')}
      subTitle={t('sendYourEmail')}
      bottomElements={renderBottomElements}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={Schema.ForgotPasswordSchema}
        onSubmit={(values, formActions) => {
          actions.recoverPassword(values);
          formActions.setSubmitting(false);
        }}
      >
        <Form className={styles.form}>
          <Field
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            autoComplete="email"
            name="email"
            as={TextField}
            label={t('email')}
          />
          <div className={styles.form__btnContainer}>
            {!isBusy ? (
              <Button
                fullWidth
                type="submit"
                className={styles.form__btnContainer__yellow}
                variant="contained"
              >
                {t('restore')}
              </Button>
            ) : (
              <Loader />
            )}
          </div>
          <Grid container className={styles.form__forgotPassword}>
            <Grid item>
              <span>{t('haveAnAccount')}</span>
              <Link underline="always" color="inherit" component={RouterLink} to="/auth">
                {t('signIn')}
              </Link>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </AuthLayout>
  );
};

export default ForgotPassword;
