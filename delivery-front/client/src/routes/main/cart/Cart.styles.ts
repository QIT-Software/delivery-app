import {Dimensions, StyleSheet} from 'react-native';

const titleWidth = (1 - 18 / (375 - 33 * 2)) * (Dimensions.get('window').width - 33 * 2);

const styles = StyleSheet.create({
  cartContainer: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    marginBottom: -60,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 18,
    marginBottom: 20,
    width: '65%',
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
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingVertical: 10,
  },
  backBtn: {
    color: '#EE5B30',
    width: 12,
    height: 21,
  },
  btn: {
    position: 'absolute',
    left: '43%',
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
  // btnText: {
  //   fontSize: 18,
  //   lineHeight: 21,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  //   margin: 13,
  //   color: '#ffffff',
  // },
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
