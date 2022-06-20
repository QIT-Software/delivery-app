import {Dimensions, StyleSheet} from 'react-native';

const titleWidth = (1 - 34 / (375 - 33 * 2)) * (Dimensions.get('window').width - 33 * 2);

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  image: {
    color: '#333333',
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    marginBottom: 20,
    paddingHorizontal: 33,
  },
  backBtn: {
    width: 21,
    height: 21,
    zIndex: 100,
  },
  orderDetailsContainer: {
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
  decline: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  btnContainer: {
    alignItems: 'flex-end',
  },
  btn: {
    // marginLeft: 21,
    borderRadius: 25,
    paddingVertical: 2,
    paddingHorizontal: 25,
    marginRight: 10,
    width: 180,
  },
  btnText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
  titleContainer: {
    width: titleWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    lineHeight: 38,
  },
  waitingCourier: {
    marginVertical: 30,
  },
  waitingCourierValue: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5f5c5c',
  },
  courierContainer: {
    marginTop: 30,
    marginLeft: 10,
  },
  courierContainerInner: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 25,
  },
  userPick: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  courierInfo: {
    marginLeft: 16,
  },
  courierName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 5,
  },
  courierPhoneNumber: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#333333',
  },
});

export default styles;
