import {StyleSheet, Dimensions} from 'react-native';
// import {Fonts} from 'resources/Fonts';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  cuisineItemContainer: {
    height: (width - 70) / 2,
    // height: 151,
    borderRadius: 15,
    backgroundColor: '#ec738e',
    justifyContent: 'flex-end',
    paddingVertical: 20,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.55,
    shadowRadius: 10,
    elevation: 10,
  },
  bg: {
    borderRadius: 15,
  },
  containerWidthDefault: {
    width: (width - 70) / 2,
  },
  containerWidthFull: {
    width: width - 50,
  },
  text: {
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.15)',
    textShadowOffset: {width: 0, height: 4},
    textShadowRadius: 4,
  },
  fields: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  field: {
    height: 20,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 9,
  },
  nationality: {
    fontWeight: 'bold',
    fontSize: 22,
    lineHeight: 26,
  },
  count: {
    fontSize: 14,
    lineHeight: 17,
    marginVertical: 2,
  },
  rating: {
    fontSize: 12,
    lineHeight: 14,
    marginLeft: 2,
    marginVertical: 4,
  },
});

export default styles;
