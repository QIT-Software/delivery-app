import {StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  container: {
    paddingHorizontal: 15,
    paddingTop: getStatusBarHeight(),
  },
  image: {
    marginTop: '15%',
    width: 260,
    height: 180,
    alignSelf: 'center',
  },
  title: {
    margin: 20,
    fontSize: 22,
    textAlign: 'center',
    color: '#AEAEAE',
  },
  refreshButton: {
    marginTop: 20,
    marginHorizontal: 70,
  },
  btnDetails: {
    marginTop: 15,
  },
  detailsButton: {
    fontSize: 16,
    color: '#FCAA0D',
  },
});

export default styles;
