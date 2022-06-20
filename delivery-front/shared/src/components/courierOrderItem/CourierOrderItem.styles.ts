import {StyleSheet} from 'react-native';
import {Fonts} from 'resources/Fonts';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  idContainer: {
    justifyContent: 'center',
    width: 100,
  },
  addressContainer: {
    marginLeft: 8,
    justifyContent: 'space-between',
  },
  idInner: {
    fontFamily: Fonts.SFProRoundedRegular,
    fontWeight: '600',
    fontSize: 20,
  },
  imageContainer: {
    justifyContent: 'center',
  },
  touch: {
    zIndex: 101,
  },
});

export default styles;
