import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {},

  wrapper: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: '5%',
  },

  leftInnerContainer: {
    flex: 4,
    justifyContent: 'center',
  },

  rightInnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  rightImageContainer: {
    alignItems: 'flex-end',
  },

  linkImgWrapper: {
    flex: 1,
  },

  switchContainer: {
    height: '90%',
    width: '45%',
  },
});

export default styles;
