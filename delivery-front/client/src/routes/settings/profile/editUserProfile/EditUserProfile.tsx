import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './EditUserProfile.styles';
import {LoadableContainer} from 'state/entities/LoadableContainer';
import {Session} from 'entities/Session';
import {Account} from 'entities/Account';
import {useAuthActions, useRouterActions} from 'state/hooks/UseActions';
import UpdateUserRequest from 'state/ducks/session/models';
import {useTranslation} from 'react-i18next';
import RequireLoadable from 'components/require/RequireLoadable';
import RequireSession from 'components/require/RequireSession';
import {useValidation} from 'shared/src/validation/hooks/UseValidation';
import AuthInputField from 'client/src/components/AuthInputField/AuthInputField';
import LinearGradient from 'react-native-linear-gradient';
import {ValidationHint} from 'components';
import {AddPhoto, ProfileImage} from 'routes/settings/assets';
import ImagePickerPopUp from 'routes/settings/imagePicker/ImagePickerPopUp';
import {Route} from 'react-router';
import Image from 'client/src/components/image/Image';

interface EditUserProfileProps {
  session: LoadableContainer<Session>;
}

interface EditFieldsProps {
  account: Account;
  showPopUp?: boolean;
  setShowPopUp?: () => void;
  // isBusy: boolean;
}

const EditFields: React.FC<EditFieldsProps> = ({account}) => {
  const actions = useAuthActions();
  const routerAction = useRouterActions();

  const {t} = useTranslation('editProfile');

  const {name, image} = account.user;
  const {phoneNumber, email} = account.info;

  const [userNameValue, setUserName] = useState(name);
  const [usernameValidationHint, setUsernameValidationHint] = useState<string>();

  const [phoneValue, setPhone] = useState(phoneNumber);
  const [phoneNumberValidationHint, setPhoneNumberValidationHint] = useState<string>();

  const [emailValidationHint, setEmailValidationHint] = useState<string>();

  const [emailValue, setEmail] = useState(email);

  const [avatarValidationHint, setAvatarValidationHint] = useState<string>();

  const {
    validateSummary,
    validate,
    validationMessages,
    validators,
    callValidation,
  } = useValidation();

  const validateAvatar = (avatarUri: string | undefined) => () => {
    const avatarPlaceholder = t('avatarInput'); // todo: add to the resources
    return validate(
      [
        () =>
          validationMessages.notExists(avatarPlaceholder, validators.exists(!!avatarUri)),
      ],
      setAvatarValidationHint,
    );
  };

  const validateUserName = (userName: string) => () => {
    const loginPlaceholder = t('nameInput');
    return validate(
      [
        () => validationMessages.empty(loginPlaceholder, validators.empty(userName)),
        () =>
          validationMessages.lengthValidation(
            loginPlaceholder,
            validators.validateLength(userName.length, 1, 20),
          ),
        () =>
          validationMessages.name(loginPlaceholder, validators.validateName(userName)),
      ],
      setUsernameValidationHint,
    );
  };

  const validateEmail = (email: string) => () => {
    const loginPlaceholder = t('emailInput');
    return validate(
      [
        () => validationMessages.empty(loginPlaceholder, validators.empty(email)),
        () => validationMessages.email(validators.validateEmail(email)),
      ],
      setEmailValidationHint,
    );
  };

  const validatePhoneNumber = (phone: string) => () => {
    const loginPlaceholder = t('phoneNumberInput');
    return validate(
      [
        () => validationMessages.empty(loginPlaceholder, validators.empty(phone)),
        () =>
          validationMessages.phoneNumber(
            loginPlaceholder,
            validators.validatePhoneNumber(phone),
          ),
      ],
      setPhoneNumberValidationHint,
    );
  };

  useEffect(() => {
    if (image) {
      callValidation([validateAvatar(image)]);
    }
  }, [image]);

  const validateAll = () => {
    return validateSummary([
      //
      validateUserName(userNameValue),
      validatePhoneNumber(phoneValue),
      validateEmail(emailValue),
    ]);
  };

  const createUpdateRequest = (): UpdateUserRequest => {
    return {
      name: userNameValue,
      email: emailValue,
      phoneNumber: phoneValue,
    };
  };
  return (
    <>
      <View style={styles.topContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Edit profile</Text>
        </View>
      </View>
      <View style={styles.profileHeaderContainer}>
        <View style={styles.avatarContainer}>
          <TouchableOpacity
            style={styles.setProfileImageWrapper}
            onPress={() => routerAction.navigateToImagePicker(account.user.id)}
          >
            {account.user.image ? (
              <Image source={{uri: account.user.image}} style={styles.avatarImage} />
            ) : (
              <Image source={ProfileImage} style={styles.avatarImage} />
            )}
            <ValidationHint validation={avatarValidationHint} />
            <View style={styles.profileImageWrapper}>
              <Image source={AddPhoto} style={styles.addPhotoButton} />
            </View>
          </TouchableOpacity>
        </View>
        <AuthInputField
          value={userNameValue}
          onChangeText={(userNameValue) => {
            setUserName(userNameValue);
            callValidation([validateUserName(userNameValue)]);
          }}
          isEditable
          style={styles.username}
          textStyle={styles.profileName}
          validationHint={usernameValidationHint}
        />
      </View>
      <View style={styles.profileInnerContainer}>
        <View style={styles.profileInner}>
          <Text style={styles.profileInnerTitle}>Email</Text>
          <AuthInputField
            value={emailValue}
            onChangeText={(emailValue) => {
              setEmail(emailValue);
              callValidation([validateEmail(userNameValue)]);
            }}
            isEditable
            style={styles.username}
            textStyle={styles.profileInnerInfo}
            validationHint={emailValidationHint}
          />
        </View>
        <View style={styles.profileInner}>
          <Text style={styles.profileInnerTitle}>Phone number</Text>
          <AuthInputField
            value={phoneValue}
            onChangeText={(value) => setPhone(value)}
            isEditable
            textStyle={styles.profileInnerInfo}
            type="telephoneNumber"
            validationHint={phoneNumberValidationHint}
          />
        </View>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            if (!validateAll()) {
              return;
            }
            actions.updateUserProfile(createUpdateRequest());
          }}
        >
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#FF8C29', '#FF2D55']}
            style={styles.btn}
          >
            <Text style={styles.btnText}>Save</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </>
  );
};

const EditUserProfile: React.FC<EditUserProfileProps> = ({session}) => {
  // const [showPopUp] = useState(false);
  // const {t} = useTranslation('editProfile');

  return (
    <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
      <RequireLoadable data={session}>
        {({account}) => (
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContentContainer}
            showsVerticalScrollIndicator={false}
          >
            <EditFields account={account} />
          </ScrollView>
        )}
      </RequireLoadable>
      <Route path="/settings/:id/imagePickerPopUp">
        <ImagePickerPopUp />
      </Route>
    </KeyboardAvoidingView>
  );
};

export default () => (
  <RequireSession>{(session) => <EditUserProfile session={session} />}</RequireSession>
);
