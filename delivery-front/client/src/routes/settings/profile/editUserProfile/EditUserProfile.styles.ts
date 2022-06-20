import {StyleSheet} from 'react-native';
import {Fonts} from 'resources/Fonts';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EE5B30',
  },
  imagePlaceholder: {
    flex: 1,
  },
  keyboardAvoidingView: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  username: {
    paddingBottom: 0,
    marginRight: 20,
  },
  saveButton: {
    marginBottom: 10,
    borderColor: '#EE5B30',
  },
  saveButtonTextStyle: {
    fontFamily: Fonts.SFProRoundedRegular,
    color: '#EE5B30',
    fontSize: 18,
  },
  scrollView: {
    flex: 1,
    // paddingHorizontal: 35,
    paddingVertical: 27,
  },
  scrollViewContentContainer: {
    flexGrow: 1,
  },

  userHeaderContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  setProfileImageWrapper: {
    borderRadius: 50,
  },

  avatarImage: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginBottom: 10,
    borderColor: '#EE5B30',
    borderWidth: 2,
  },
  addPhotoButton: {
    width: 26,
    height: 26,
  },
  profileImageWrapper: {
    position: 'absolute',
    bottom: 5,
    left: 60,
    overflow: 'visible',
  },

  avatarContainer: {},

  userInputText: {
    fontSize: 26,
    fontFamily: Fonts.SFProRoundedRegular,
    borderBottomColor: '#EE5B30',
    borderBottomWidth: 1,
    padding: 0,
    margin: 0,
    color: '#EE5B30',
  },

  userNameContainer: {
    flex: 3,
    justifyContent: 'center',
    paddingLeft: '10%',
  },

  userInfoInputText: {
    fontFamily: Fonts.SFProRoundedRegular,
    paddingVertical: 0,
    margin: 0,
    fontSize: 22,
    color: '#EE5B30',
    borderBottomColor: '#EE5B30',
    borderBottomWidth: 1,
  },

  editableText: {
    fontSize: 22,
    fontFamily: Fonts.SFProRoundedRegular,
    color: '#EE5B30',
    borderBottomColor: '#EE5B30',
  },

  userInfoContainer: {
    flex: 4,
    flexDirection: 'column',
  },

  validationHint: {
    color: 'red',
    fontSize: 10,
  },
  button: {
    borderColor: '#EE5B30',
  },
  profileInnerContainer: {
    paddingHorizontal: 30,
  },
  profileInner: {
    marginBottom: 26,
  },
  profileInnerTitle: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    fontFamily: Fonts.SFProRoundedRegular,
  },
  profileInnerInfo: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 24,
    lineHeight: 29,
    color: '#EE5B30',
    marginTop: 5,
    fontFamily: Fonts.SFProRoundedRegular,
  },
  profilePasswordInnerInfo: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 40,
    lineHeight: 40,
    color: '#EE5B30',
    marginTop: 5,
  },
  profilePasswordInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pass: {
    marginTop: 16,
    marginLeft: -15,
  },
  profileHeaderContainer: {
    paddingVertical: 25,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: '25%',
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontWeight: '500',
    fontSize: 26,
    lineHeight: 28,
    textAlign: 'left',
    marginLeft: 25,
    width: '70%',
    fontFamily: Fonts.SFProRoundedRegular,
  },
  btn: {
    borderRadius: 25,
    marginBottom: 20,
    marginTop: 10,
    marginHorizontal: 30,
  },
  btnText: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 13,
    color: '#ffffff',
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 33,
    justifyContent: 'center',
    paddingBottom: 10,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    lineHeight: 38,
    fontFamily: Fonts.SFProRoundedRegular,
  },
});

export default styles;
