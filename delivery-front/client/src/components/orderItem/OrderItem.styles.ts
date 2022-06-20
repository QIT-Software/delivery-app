import {StyleSheet} from 'react-native';
import {Fonts} from 'resources/Fonts';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    // paddingHorizontal: 10,
  },
  text: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    fontFamily: Fonts.SFProRoundedRegular,
  },
});

export default styles;
