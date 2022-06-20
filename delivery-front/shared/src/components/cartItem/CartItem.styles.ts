import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  cartContainer: {
    padding: 15,
  },
  bg: {
    borderRadius: 10,
  },
  setNumber: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
  },
  name: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 22,
    width: '80%',
    lineHeight: 26,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 0, height: 4},
    textShadowRadius: 4,
  },
  calories: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 14,
    color: '#FFFFFF',
    marginVertical: 5,
  },
  bottomContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 17,
    lineHeight: 20,
    marginHorizontal: 10,
    color: '#FFFFFF',
  },
  quantityItem: {
    width: 25,
    height: 25,
  },
  price: {
    fontSize: 20,
    lineHeight: 24,
    color: '#FFFFFF',
  },
  priceCur: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  btn: {
    marginHorizontal: 25,
    borderRadius: 10,
  },
  btnText: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '600',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
  btnOpacity: {
    marginBottom: 20,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default styles;
