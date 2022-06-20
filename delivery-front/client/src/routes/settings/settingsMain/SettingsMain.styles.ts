import {Dimensions, StyleSheet} from 'react-native';
import {Fonts} from 'resources/Fonts';

const titleWidth = (1 - 28 / (375 - 33 * 2)) * (Dimensions.get('window').width - 33 * 2);

const styles = StyleSheet.create({
  settingsContainer: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 18,
    marginBottom: 20,
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
  settingsInnerContainer: {
    paddingVertical: 58,
    paddingHorizontal: 22,
  },
  settingsInner: {
    flexDirection: 'row',
    marginBottom: 26,
    justifyContent: 'space-between',
  },
  goBtn: {
    color: '#EE5B30',
    width: 12,
    height: 21,
    transform: [{rotate: '180deg'}],
  },
  backBtn: {
    color: '#EE5B30',
    width: 12,
    height: 21,
  },
  settingsInnerTitle: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 24,
    fontFamily: Fonts.SFProRoundedRegular,
  },
  settingsInnerLogOut: {
    flexDirection: 'row',
    marginTop: 70,
    justifyContent: 'space-between',
  },
});

export default styles;
