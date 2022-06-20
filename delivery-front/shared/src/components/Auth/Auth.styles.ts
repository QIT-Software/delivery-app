import {Dimensions, StyleSheet} from 'react-native';

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 30,
    paddingBottom: 20,
    justifyContent: 'space-between',
  },
  inputsContainer: {
    marginBottom: 10,
  },
  centeredItems: {
    alignItems: 'center',
  },
  backButton: {
    marginBottom: height * 0.05,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 36,
    textAlign: 'center',
    color: '#000000',
    marginBottom: 10,
  },

  addressValue: {
    color: '#96b7ef',
  },
  text: {
    fontWeight: '500',
    fontSize: 14,
    textAlign: 'center',
    color: '#555555',
    marginBottom: height * 0.045,
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 75,
    paddingHorizontal: 20,
  },
  btn: {
    borderRadius: 25,
    marginBottom: 20,
    marginTop: 10,
  },
  btnText: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 13,
    color: '#ffffff',
  },

  inputsPopUp: {
    marginBottom: 10,
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

  bottomPopUpContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  bottomPopUpText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainText: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '500',
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
  Main: {
    marginBottom: 40,
  },
  popUpContainer: {
    alignItems: 'center',
    marginBottom: 22,
  },
  textMainPopUp: {
    textAlign: 'center',
    marginTop: 18,
    fontSize: 36,
    lineHeight: 43,
    fontWeight: 'bold',
    color: '#000000',
  },
  textPopUp: {
    fontSize: 14,
    lineHeight: 17,
    fontWeight: 'normal',
    color: '#000000',
  },
});

export default styles;
