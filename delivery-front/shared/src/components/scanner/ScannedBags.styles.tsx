import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#96B0FF80',
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  scrollViewContentContainerStyle: {
    paddingTop: 15,
    paddingBottom: 10,
  },
  absoluteEmptyContainer: {
    right: 0,
    left: 0,
  },
  absoluteTextEmptyStyle: {
    fontSize: 25,
    color: 'white',
    marginBottom: 20,
    alignSelf: 'center',
  },
  absoluteEmptyStyle: {
    alignSelf: 'center',
  },
});

export default styles;
