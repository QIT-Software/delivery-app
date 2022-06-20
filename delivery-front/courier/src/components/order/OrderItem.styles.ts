import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  field: {
    marginBottom: 10,
  },
  addressesContainer: {},
  fieldName: {
    fontSize: 12,
    color: '#acacac',
  },
  fieldValue: {
    width: width - 180,
    fontSize: 18,
    fontWeight: 'bold',
  },
  fieldDistanceName: {
    fontWeight: '500',
    fontSize: 12,
    width: 85,
  },
  fieldDistanceValue: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default styles;
