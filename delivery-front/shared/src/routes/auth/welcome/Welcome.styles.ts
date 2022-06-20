import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
    resizeMode: 'cover',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 80,
  },
  btn: {
    marginHorizontal: 20,
    borderRadius: 25,
    marginBottom: 20,
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
