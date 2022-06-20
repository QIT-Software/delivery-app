import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    overflow: 'hidden',
    paddingHorizontal: 40,
    paddingVertical: 12,
    minWidth: 200,
  },

  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingButtonMargin: {
    marginVertical: 3.5,
  },

  text: {
    color: '#FFFFFF',
    fontSize: 18,
    lineHeight: 25,
    textAlign: 'center',
  },

  solidBtnBackground: {
    backgroundColor: '#FCAA0D',
  },

  borderedBtnBackground: {
    borderWidth: 1,
    borderColor: '#FFFFFF',
    backgroundColor: 'transparent',
  },
  leftImageContainer: {
    marginHorizontal: 5,
  },

  rightImageContainer: {
    marginHorizontal: 5,
  },

  touchableOpacity: {
    backgroundColor: 'transparent',
  },
});

export default styles;
