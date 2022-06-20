import {Dimensions, StyleSheet} from 'react-native';
import {Fonts} from 'resources/Fonts';

const titleWidth = (1 - 30 / (375 - 28 * 2)) * (Dimensions.get('window').width - 28 * 2);

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#FFFFFF',
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 33,
    width: '69%',
    justifyContent: 'space-between',
  },
  titleContainer: {
    width: titleWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    lineHeight: 38,
  },
  backBtn: {
    color: '#EE5B30',
    width: 12,
    height: 21,
  },
  profileInnerContainer: {
    paddingHorizontal: 30,
  },
  profileInner: {
    marginBottom: 26,
  },
  profileInnerDocuments: {
    marginBottom: 26,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileInnerTitle: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
  },
  profileInnerInfo: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 24,
    lineHeight: 29,
    color: '#EE5B30',
    marginTop: 5,
  },
  profileInnerInfoDocument: {
    flexDirection: 'row',
    marginTop: 10,
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
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 24,
  },
  logoutContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
  logoutText: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 31,
    lineHeight: 26,
    color: '#E20000',
  },
  imageAdd: {
    marginRight: 15,
  },
  editBtn: {
    color: '#EE5B30',
    width: 21,
    height: 21,
  },
  btn: {
    // marginLeft: 21,
    borderRadius: 10,
    // paddingHorizontal: 20,
    width: 100,
    marginTop: 15,
  },
  btnText: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '600',
    textAlign: 'center',
    margin: 8,
    color: '#ffffff',
  },
  statusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusTitle: {
    fontSize: 19,
    fontWeight: '600',
    color: '#FCAA0D',
    fontFamily: Fonts.SFProRoundedRegular,
  },
  statusComment: {
    fontSize: 16,
    color: 'red',
    fontFamily: Fonts.SFProRoundedRegular,
  },
  rejectStatus: {
    color: '#EE5B30',
  },
  statusText: {
    paddingBottom: 10,
    marginTop: -3,
  },
  commentContainer: {
    width: '80%',
    alignItems: 'center',
  },
});

export default styles;
