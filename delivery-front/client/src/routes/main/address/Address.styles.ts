import {Dimensions, StyleSheet} from 'react-native';
import {Fonts} from 'resources/Fonts';

const titleWidth = (1 - 18 / (375 - 28 * 2)) * (Dimensions.get('window').width - 28 * 2);

const styles = StyleSheet.create({
  addressContainer: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 28,
    backgroundColor: '#FFFFFF',
    marginBottom: -60,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    marginBottom: 10,
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
  inputPopUp: {
    width: '100%',
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F1F1F3',
    paddingTop: 13,
    paddingHorizontal: 28,
    color: '#98b8ef',
    marginBottom: 10,
  },
  scroll: {
    borderTopWidth: 1,
    borderColor: '#EDEDED',
  },
  modal: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    bottom: 320,
    right: 30,
    width: '85%',
  },
  settingsInner: {
    flexDirection: 'row',
    marginBottom: 26,
    paddingHorizontal: 40,
    justifyContent: 'space-between',
    marginTop: -200,
  },
  settingsInnerTitle: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: Fonts.SFProRoundedRegular,
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
    fontFamily: Fonts.SFProRoundedRegular,
  },
  btn: {
    position: 'absolute',
    left: '46.5%',
    bottom: 30,
    backgroundColor: '#fff',
    borderRadius: 50,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgb(214, 214, 214)',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.85,
    shadowRadius: 8,
    elevation: 4,
  },
  btnText: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 13,
    color: '#ffffff',
    fontFamily: Fonts.SFProRoundedRegular,
  },
});

export default styles;
