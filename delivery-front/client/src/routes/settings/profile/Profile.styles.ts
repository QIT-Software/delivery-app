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
    fontFamily: Fonts.SFProRoundedRegular,
  },
  backBtn: {
    color: '#EE5B30',
    width: 12,
    height: 21,
  },
  editBtn: {
    color: '#EE5B30',
    width: 21,
    height: 21,
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
    // marginLeft: 30,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 26,
    lineHeight: 28,
    marginLeft: 25,
    fontFamily: Fonts.SFProRoundedRegular,
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
    fontFamily: Fonts.SFProRoundedRegular,
  },
  goBtn: {
    color: '#EE5B30',
    width: 12,
    height: 21,
    transform: [{rotate: '180deg'}],
  },
});

export default styles;
