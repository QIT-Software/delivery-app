import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  press: {},
  basketQuantity: {
    position: 'absolute',
    right: '37%',
    top: '43%',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  basketQuantityValue: {
    color: '#EE5B30',
    fontSize: 18,
    fontWeight: 'bold',
  },
  basket: {
    zIndex: 200,
    position: 'absolute',
    left: '40%',
    bottom: 30,
    backgroundColor: '#fff',
    borderRadius: 50,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.85,
    shadowRadius: 8,
    elevation: 4,
  },
  basketQuantityValueActive: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  basketActive: {
    position: 'absolute',
    left: '40%',
    bottom: 30,
    backgroundColor: '#EE5B30',
    borderRadius: 50,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {
      width: 4,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  img: {
    width: 35,
    height: 40,
  },
});

export default styles;
