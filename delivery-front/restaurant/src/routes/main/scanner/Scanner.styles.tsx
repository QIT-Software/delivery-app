import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#052DA8',
  },
  camera: {
    flex: 1,
    backgroundColor: 'black',
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  headlineContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    left: 0,
    right: 0,
    paddingVertical: 12,
  },
  headline: {
    fontFamily: 'Poppins',
    fontSize: 20,
    color: '#052DA8',
  },
  scanBags: {
    backgroundColor: 'white',
    flex: 1,
  },
  button: {
    justifyContent: 'flex-end',
    margin: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  buttonsContainer: {
    margin: 15,
  },
  scannedBags: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  cameraStyle: {
    height: '100%',
  },
  containerStyle: {
    overflow: 'hidden',
  },
});

export default styles;
