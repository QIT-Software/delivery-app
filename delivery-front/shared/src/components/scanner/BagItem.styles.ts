import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  bagContainer: {
    borderRadius: 15,
    height: 50,
    marginBottom: 12,
    backgroundColor: '#E1E4FFB0',
  },
  bag: {
    paddingTop: 14,
    paddingLeft: 20,
    position: 'absolute',
    color: '#48598B',
    fontFamily: 'Poppins',
    fontSize: 18,
    alignSelf: 'flex-start',
  },
  deleteBag: {
    position: 'absolute',
    alignSelf: 'flex-end',
    padding: 20,
    left: '80%',
  },
});

export default styles;
