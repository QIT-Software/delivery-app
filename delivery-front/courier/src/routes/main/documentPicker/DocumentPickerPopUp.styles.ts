import {StyleSheet} from 'react-native';
import {Fonts} from 'resources/Fonts';

const styles = StyleSheet.create({
  modalOuter: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#FFFFFF',
    opacity: 1,
    marginHorizontal: 75,
    borderRadius: 10,
  },
  button: {
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  buttonText: {
    textAlign: 'center',
    marginVertical: 15,
    fontFamily: Fonts.SFProRoundedRegular,
    fontSize: 20,
  },
  cancelButton: {
    marginTop: 10,
  },
  cancelText: {
    textAlign: 'center',
    marginVertical: 5,
    color: '#BFBFBF',
    fontWeight: 'bold',
    fontFamily: Fonts.SFProRoundedRegular,
    fontSize: 20,
  },
});

export default styles;
