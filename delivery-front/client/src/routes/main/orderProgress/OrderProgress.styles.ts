import {StyleSheet} from 'react-native';
import {Fonts} from 'resources/Fonts';

const styles = StyleSheet.create({
  // region Bottom panel
  bottomPanelContainer: {
    height: 80,
    width: '70%',
    justifyContent: 'center',
    marginLeft: '15%',
    marginBottom: 30,
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
    fontSize: 14,
    fontFamily: Fonts.SFProRoundedRegular,
  },
  statusCardStatus: {
    fontSize: 26,
    color: '#FF5C40',
    fontWeight: '600',
    fontFamily: Fonts.SFProRoundedRegular,
  },
  qrCodeCard: {
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  qrCodeGradient: {
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // endregion
});

export {styles};
