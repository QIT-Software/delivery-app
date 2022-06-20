import {StyleSheet} from 'react-native';

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
    marginHorizontal: 15,
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  field: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  setInfoContainer: {},
  fieldName: {
    fontSize: 14,
    color: '#333333',
  },
  fieldValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginLeft: 5,
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
  fieldSet: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fieldSetName: {
    fontSize: 18,
    color: '#333333',
  },
  fieldSetValue: {
    fontSize: 18,
    color: '#333333',
  },
  orderStatus: {
    marginVertical: 18,
  },
  orderStatusValue: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
  },
  decline: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  btn: {
    // marginLeft: 21,
    borderRadius: 25,
    paddingHorizontal: 25,
    marginRight: 10,
  },
  btnText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});

export default styles;
