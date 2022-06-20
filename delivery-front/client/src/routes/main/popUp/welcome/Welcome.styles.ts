import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
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
    width: width - 135,
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
    paddingHorizontal: 40,
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
});

export default styles;
