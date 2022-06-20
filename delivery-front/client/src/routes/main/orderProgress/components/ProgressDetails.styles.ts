import {StyleSheet, TextStyle} from 'react-native';
import {Fonts} from 'resources/Fonts';

const baseStyles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    alignSelf: 'center',
    fontWeight: '600',
    marginBottom: 8,
    fontSize: 15,
    fontFamily: Fonts.SFProRoundedRegular,
  },
  itemContainer: {
    marginVertical: 5,
    flexDirection: 'row',
  },
  itemValue: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    fontFamily: Fonts.SFProRoundedRegular,
  },
  itemState1: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: Fonts.SFProRoundedRegular,
    color: '#1BADF8',
  },
  itemState2: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: Fonts.SFProRoundedRegular,
    color: '#EE5B30',
  },
  itemStatus: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: Fonts.SFProRoundedRegular,
  },
});

const itemStatus = (color: string): TextStyle => ({
  ...baseStyles.itemStatus,
  color,
});

const styles = {
  ...baseStyles,
  itemStatus,
};

export {styles};
