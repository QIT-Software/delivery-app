import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  btn: {
    marginVertical: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  btnText: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 13,
    color: '#ffffff',
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
    marginHorizontal: 22,
    borderRadius: 10,
    padding: 20,
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
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 36,
    lineHeight: 43,
    textAlign: 'center',
  },
  modalSubTitle: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  inputContainer: {
    marginTop: 10,
  },
  orText: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
  },
  btnModal: {
    marginVertical: 10,
    borderRadius: 10,
  },
  bottomPopUpText: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  secondaryText: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: 'normal',
    color: '#AEAEAE',
  },
  press: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: 'bold',
    color: '#EE5B30',
  },
});

export default styles;
