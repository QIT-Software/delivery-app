import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  titleContainer: {
    alignItems: 'center',
  },
  scroll: {
    paddingHorizontal: 10,
  },
  ordersContainer: {
    flex: 1,
    // paddingVertical: 30,
    paddingHorizontal: 15,
    marginTop: 20,
  },
  input: {
    width: width - 50,
    marginTop: 20,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 34,
    color: '#333333',
    marginVertical: 15,
  },
  cuisineBlock: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: 10,
    paddingHorizontal: 10,
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
  // btn: {
  //   // marginLeft: 21,
  //   borderRadius: 10,
  //   paddingHorizontal: 20,
  // },
  btnText: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '600',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
  blockStyle: {
    marginBottom: 10,
  },
});

export default styles;
