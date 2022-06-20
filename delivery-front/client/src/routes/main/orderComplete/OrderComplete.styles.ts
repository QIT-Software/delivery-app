import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  cartContainer: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 33,
    marginBottom: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    lineHeight: 38,
    textAlign: 'center',
  },
  thanks: {
    marginTop: 110,
  },
  thanksTitle: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 36,
    lineHeight: 43,
    textAlign: 'center',
    marginBottom: 8,
  },
  thanksText: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
  },
  rateContainer: {
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'center',
  },
  star: {
    width: 40,
    height: 40,
    marginRight: 10,
    // tintColor: '#FF8C29',
    overlayColor: '#FF8C29',
  },
  starLast: {
    width: 40,
    height: 40,
  },
  inputPopUp: {
    paddingBottom: 80,
    paddingTop: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginHorizontal: 50,
    marginVertical: 50,
    paddingLeft: 10,
  },
  backBtn: {
    color: '#EE5B30',
    width: 12,
    height: 21,
  },
  btn: {
    marginHorizontal: 50,
    borderRadius: 10,
  },
  btnText: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 13,
    color: '#ffffff',
  },
});

export default styles;
