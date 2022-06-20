import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingBottom: '5%',
    width: '100%',
  },
  textInput: {
    paddingVertical: 0,
    margin: 0,
    fontSize: 14,
    borderBottomWidth: 1,
    color: '#0433BF',
    padding: 0,
  },

  textInputEmpty: {
    borderBottomColor: '#90B3DD',
  },

  textInputFull: {
    borderBottomColor: '#0433BF',
  },

  placeholder: {
    fontSize: 14,
    padding: 0,
    margin: 0,
  },
});

export default styles;
