import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: '5%',
  },
  innerContainerSearchBar: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  innerContainerSuggestions: {
    flex: 9,
  },
  textSuggestions: {
    fontSize: 16,
    color: '#1d1d1d',
    paddingVertical: 3,
  },
  searchBarText: {
    fontSize: 16,
    borderBottomWidth: 0,
    color: '#000',
    paddingBottom: 0,
    marginBottom: 0,
  },
  nameContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: '2%',
  },
  contentContainerStyle: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
  closeButtonImg: {
    width: 15,
    height: 15,
  },
  searchInputContainer: {
    position: 'relative',
  },
  searchButton: {
    position: 'absolute',
    top: -30,
    right: 15,
  },
});

export default styles;
