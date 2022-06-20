import {Dimensions, StyleSheet} from 'react-native';

const titleWidth = (1 - 64 / (375 - 33 * 2)) * (Dimensions.get('window').width - 33 * 2);

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
    marginBottom: 14,
    paddingHorizontal: 33,
  },
  backBtn: {
    width: 21,
    height: 21,
    zIndex: 100,
  },
  basket: {
    width: 21,
    height: 21,
    zIndex: 100,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 10,
  },
  orderDetails: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  buttonsContainer: {},
  button: {
    width: '100%',
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 18,
  },
  titleContainer: {
    width: titleWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainerInner: {
    alignItems: 'center',
  },
  orderId: {
    fontWeight: '600',
    fontSize: 14,
  },
  orderIdValue: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  orderDetailsFields: {
    marginBottom: 20,
  },
  orderDetailsField: {
    marginBottom: 5,
  },
  orderDetailsFieldName: {
    fontSize: 12,
    color: '#C9C9C9',
  },
  orderDetailsFieldContainer: {
    flexDirection: 'row',
  },
  orderDetailsFieldValue: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  orderList: {
    fontWeight: '600',
    fontSize: 18,
  },
  orderListContainer: {
    marginBottom: 20,
  },
  orderListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderListItemText: {
    fontWeight: '600',
    fontSize: 18,
    paddingVertical: 8,
  },
  setDescription: {
    borderBottomColor: '#DEDEDE',
    borderBottomWidth: 1,
  },
  totalField: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  totalFieldName: {
    fontWeight: '600',
    fontSize: 18,
  },
  totalFieldValue: {
    fontWeight: 'bold',
    fontSize: 26,
  },
  orderDetailsContainer: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 34,
    color: '#333333',
    marginVertical: 15,
  },
});

export default styles;
