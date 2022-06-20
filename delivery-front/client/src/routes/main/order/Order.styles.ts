import {Dimensions, StyleSheet} from 'react-native';
import {Fonts} from 'resources/Fonts';

const titleWidth = (1 - 30 / (375 - 28 * 2)) * (Dimensions.get('window').width - 28 * 2);

const styles = StyleSheet.create({
  orderContainer: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#FFFFFF',
    marginBottom: -60,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 33,
    marginBottom: 20,
    width: '70%',
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
  length: {
    marginHorizontal: 23,
  },
  scroll: {
    paddingHorizontal: 10,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#B9B9B9',
  },
  backBtn: {
    color: '#EE5B30',
    width: 12,
    height: 21,
  },
  add: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 10,
    paddingTop: 8,
    fontFamily: Fonts.SFProRoundedRegular,
  },
  plus: {
    color: '#EE5B30',
  },
  subTotalContainer: {
    paddingHorizontal: 33,
    paddingVertical: 35,
  },
  subTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subTotalText: {
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 24,
    fontFamily: Fonts.SFProRoundedRegular,
  },
  deliveryFee: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deliveryFeeText: {
    color: '#B9B9B9',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    fontFamily: Fonts.SFProRoundedRegular,
  },
  totalContainer: {
    marginHorizontal: 23,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#B9B9B9',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalText: {
    marginHorizontal: 10,
    fontWeight: '500',
    fontSize: 26,
    lineHeight: 31,
    fontFamily: Fonts.SFProRoundedRegular,
  },
  bottomContainer: {
    paddingHorizontal: 23,
    paddingTop: 28,
  },
  bottomTextMain: {
    color: '#828282',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 21,
    fontFamily: Fonts.SFProRoundedRegular,
  },
  bottomContainerInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingLeft: 20,
  },
  innerText: {
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 24,
    width: '70%',
    fontFamily: Fonts.SFProRoundedRegular,
  },
  changeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerChange: {
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 24,
    color: '#EE5B30',
    fontFamily: Fonts.SFProRoundedRegular,
  },
  btn: {
    position: 'absolute',
    left: '39.5%',
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
