import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F1F1F3',
    paddingTop: 14,
    paddingHorizontal: 28,
    paddingBottom: 13,
    color: '#000',
  },

  textInput: {
    paddingVertical: 0,
    margin: 0,
    padding: 0,
  },

  placeholder: {
    padding: 0,
    margin: 0,
    color: '#A4A4A4',
  },

  showHidePasswordContainer: {
    position: 'absolute',
    right: 12,
    width: 15,
    height: '100%',
    alignItems: 'flex-start',
  },

  pass: {
    marginTop: 16,
    marginLeft: -15,
  },
});

export default styles;
