import {StyleSheet} from 'react-native';
import {Fonts} from 'resources/Fonts';

const styles = StyleSheet.create({
  // region Bottom panel
  bottomPanelContainer: {
    flexDirection: 'row',
  },
  statusCard: {
    flex: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  statusCardContainer: {
    backgroundColor: '#ffffff',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusCardValue: {
    fontSize: 13,
  },
  statusCardStatus: {
    fontSize: 20,
    fontFamily: Fonts.SFProRoundedRegular,
    fontWeight: '600',
  },
  fillCard: {
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  fillGradient: {
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fillGray: {
    backgroundColor: '#C4C4C4',
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // endregion
});

export {styles};
