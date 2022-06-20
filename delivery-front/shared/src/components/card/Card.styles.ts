import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 0.2,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  courier: {
    position: 'absolute',
    bottom: 10,
  },
  shadow: {
    backgroundColor: 'transparent',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3,

    elevation: 18,
  },
});

export default styles;
