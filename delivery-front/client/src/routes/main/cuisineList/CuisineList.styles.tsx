import {Dimensions, StyleSheet} from 'react-native';
// import {Fonts} from 'resources/Fonts';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  cuisinesContainer: {
    flex: 1,
    paddingTop: 30,
    marginBottom: -60,
    // paddingHorizontal: 15,
  },
  input: {
    width: width - 50,
    marginTop: 20,
    marginHorizontal: 30,
    // marginBottom: 10,
  },
  titleContainer: {
    marginHorizontal: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    // fontFamily: Fonts.SFProRoundedRegular,
    fontSize: 34,
    lineHeight: 41,
  },
  cuisineBlock: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: 10,
    paddingHorizontal: 25,
    paddingBottom: 40,
  },
  item: {
    marginBottom: 20,
  },
  cuisineFlat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ModalOuter: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    opacity: 1,
    marginHorizontal: 46,
    borderRadius: 10,
  },
  modalTextContainer: {
    paddingVertical: 25,
  },
  modalTextMain: {
    textAlign: 'center',
    fontSize: 62,
    lineHeight: 74,
    color: '#000000',
    fontWeight: 'bold',
  },
  modalTextSecond: {
    fontSize: 17,
    lineHeight: 20,
    fontWeight: 'normal',
    textAlign: 'center',
  },
  inputModal: {
    backgroundColor: '#F1F1F3',
    color: '#A4A4A4',
    height: 44,
    borderRadius: 22,
    marginHorizontal: 21,
    marginVertical: 5,
  },
  inputModalText: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: 'normal',
    paddingHorizontal: 33,
  },
  btnModalContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 25,
    paddingHorizontal: 20,
  },
  modalCancel: {
    fontSize: 15,
  },
  btn: {
    // marginLeft: 21,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  btnText: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '600',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
  basketItem: {
    position: 'absolute',
    right: (width * 57) / 100,
    bottom: 0,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  press: {
    // backgroundColor: 'green',
    // position: 'absolute',
    // bottom: 40,
    // left: '45%',
  },
  favorites: {
    width: 23,
    height: 20,
  },
});

export default styles;
