import {StyleSheet} from 'react-native';
import {Fonts} from 'resources/Fonts';

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10,
    width: 120,
    height: 160,
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    borderRadius: 15,
  },
  title: {
    fontFamily: Fonts.SFProRoundedRegular,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 12,
  },
});

export default styles;
