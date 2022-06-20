import {StyleSheet} from 'react-native';
import {Fonts} from 'resources/Fonts';

const styles = StyleSheet.create({
  map: {
    flex: 1,
    height: '100%',
  },
  sa: {
    width: 50,
    height: 50,
  },
  bubbleContainer: {
    padding: 10,
  },
  bubbleInner: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 'bold',
    fontFamily: Fonts.SFProRoundedRegular,
  },
  img: {width: 130, height: 130},
  imgClient: {width: 25, height: 25},

  btn: {
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  btnOff: {
    backgroundColor: '#C4C4C4',
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  btnText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 8,
    color: '#ffffff',
  },
});

export default styles;
