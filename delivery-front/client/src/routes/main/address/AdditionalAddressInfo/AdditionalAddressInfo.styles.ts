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
    marginBottom: 35,
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
    marginTop: 20,
  },
  backBtn: {
    color: '#EE5B30',
    width: 12,
    height: 21,
  },
  btn: {
    position: 'absolute',
    left: '39.5%',
    bottom: 58,
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
  inputContainer: {
    paddingVertical: 30,
  },
  inputTitle: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 24,
    paddingVertical: 12,
    fontFamily: Fonts.SFProRoundedRegular,
  },
  currentAddressContainer: {
    marginHorizontal: 23,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#B9B9B9',
    justifyContent: 'center',
  },
  currentAddressDescription: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 24,
    lineHeight: 31,
    fontFamily: Fonts.SFProRoundedRegular,
  },
});

export default styles;
