import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  safeArea: {},
  container: {
    flex: 1,
  },
  textInputContainer: {
    fontSize: 16,
  },
  text: {
    fontSize: 16,
    color: '#1F3887',
  },
  addressContainer: {
    backgroundColor: 'white',
  },
});

export const googlePlacesAutocompleteStyles = {
  container: {
    flex: 1,
    // backgroundColor: '#FFF',
    position: 'relative',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  textInputContainer: {
    height: 60,
    backgroundColor: 'rgba(0,0,0,0)',
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  textInput: {
    flex: 1,
    height: 44,
    color: '#A4A4A4',
    fontSize: 16,
    backgroundColor: '#F1F1F3',
    borderRadius: 22,
  },
  description: {
    fontWeight: 'bold',
    color: '#333',
  },
  predefinedPlacesDescription: {
    color: '#333',
  },
  listView: {
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
  },
};

export default styles;
