import {StyleSheet} from 'react-native';

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
    marginHorizontal: 56,
    borderRadius: 10,
  },
  modalTextContainer: {
    paddingVertical: 25,
  },
  modalTextMain: {
    textAlign: 'center',
    fontSize: 36,
    lineHeight: 40,
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalTextSecond: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: 'normal',
    textAlign: 'center',
    marginHorizontal: 55,
  },
  modalTextThird: {
    fontSize: 28,
    lineHeight: 33,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 55,
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
    marginHorizontal: 46,
    marginVertical: 20,
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
