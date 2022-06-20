import {StyleSheet} from 'react-native';
import {Fonts} from 'resources/Fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  setTitleContainer: {
    height: 95,
    backgroundColor: '#ec738e',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'flex-end',
    paddingBottom: 15,
    paddingLeft: 30,
  },
  bg: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  setNumber: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    fontFamily: Fonts.SFProRoundedRegular,
  },
  name: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 22,
    lineHeight: 26,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 0, height: 4},
    textShadowRadius: 4,
    fontFamily: Fonts.SFProRoundedRegular,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
    marginHorizontal: 25,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 22,
    lineHeight: 27,
    marginHorizontal: 10,
    color: '#000000',
    fontFamily: Fonts.SFProRoundedRegular,
  },
  price: {
    fontSize: 32,
    lineHeight: 38,
    color: '#000000',
    fontFamily: Fonts.SFProRoundedRegular,
  },
  priceCur: {
    fontSize: 20,
    color: '#000000',
    fontFamily: Fonts.SFProRoundedRegular,
  },
  btn: {
    marginHorizontal: 25,
    borderRadius: 10,
  },
  btnText: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '600',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    fontFamily: Fonts.SFProRoundedRegular,
  },
  btnOpacity: {
    marginBottom: 20,
  },
  ModalOuter: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 40,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    opacity: 1,
    marginHorizontal: 28,
    borderRadius: 10,
    height: '100%',
  },
  imageModalContainer: {
    height: 140,
    backgroundColor: '#ec738e',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'flex-end',
    paddingBottom: 15,
    paddingLeft: 15,
  },
  modalClose: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  setVariables: {
    position: 'absolute',
    flexDirection: 'row',
    right: 0,
    top: 0,
    alignItems: 'center',
  },
  setVariablesImage: {
    marginRight: 10,
    marginTop: 10,
    width: 40,
    height: 40,
  },
});

export default styles;
