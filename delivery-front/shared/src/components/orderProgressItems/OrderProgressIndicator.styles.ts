import {StyleSheet, Dimensions} from 'react-native';
import {Fonts} from 'resources/Fonts';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  clientContainer: {
    flexDirection: 'row',
  },
  courierContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },

  field: {
    marginBottom: 10,
  },

  fieldName: {
    fontSize: 12,
    color: '#C9C9C9',
  },

  fieldValue: {
    fontSize: 18,
    fontWeight: 'bold',
    width: 260,
  },

  navigationArrow: {
    width: 30,
    height: 30,
    marginRight: 5,
  },

  statusText: {
    paddingVertical: 16,
    paddingLeft: 16,
    fontSize: 20,
    fontWeight: '500',
    flex: 1,
    fontFamily: Fonts.SFProRoundedRegular,
  },

  centerMeButtonContainer: {
    borderLeftColor: '#F2F2F2',
    borderLeftWidth: 1,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 6,
    paddingTop: 5,
  },

  timeLabelText: {
    fontSize: 12,
    color: '#1F3887',
    paddingTop: 3,
  },

  textContainer: {
    flex: 5,
  },

  secondaryStatusTextContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },

  statusBarContainer: {
    paddingTop: 10,
    // flex: 1,
  },

  stepAdditionalInfoButtonContainer: {
    borderStyle: 'solid',
    borderTopWidth: 1,
    borderTopColor: '#cdcdcd',
    marginTop: 33.5 - 14,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  stepAdditionalInfoButton: {
    marginVertical: 11.75,
    width: (19 / 375) * width,
    height: ((19 / 375) * width) / 1.65625,
  },
});

export default styles;
