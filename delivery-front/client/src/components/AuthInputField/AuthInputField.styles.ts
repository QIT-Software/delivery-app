import {StyleSheet} from 'react-native';
import {Fonts} from 'resources/Fonts';

const styles = StyleSheet.create({
  container: {
    paddingBottom: '4%',
    width: '100%',
  },

  textInput: {
    fontFamily: Fonts.SFProRoundedRegular,
    paddingVertical: 0,
    margin: 0,
    borderBottomWidth: 1,
    color: '#EE5B30',
    padding: 0,
  },

  textInputEmpty: {
    borderBottomColor: '#90B3DD',
  },

  textInputFull: {
    fontFamily: Fonts.SFProRoundedRegular,
    borderBottomColor: '#EE5B30',
  },

  placeholder: {
    fontFamily: Fonts.SFProRoundedRegular,
    fontSize: 16,
    padding: 0,
    margin: 0,
  },

  showHidePasswordContainer: {
    position: 'absolute',
    right: 12,
    width: 15,
    height: '100%',
    alignItems: 'flex-start',
  },

  pass: {
    marginTop: 7,
  },
});

export default styles;
