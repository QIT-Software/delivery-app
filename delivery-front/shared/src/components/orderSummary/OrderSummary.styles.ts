import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
  },
  headerText: {
    fontSize: 26,
    lineHeight: 39,
    color: '#1F3887',
    paddingTop: 16,
    paddingBottom: 11,
  },
  orderInfoList: {
    width: '100%',
  },
  infoContainer: {
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  CourierTipsContainer: {
    marginBottom: 12,
    paddingHorizontal: 20,
    alignItems: 'stretch',
  },
  infoContainerTitle: {
    fontSize: 16,
  },
  date: {
    marginBottom: 10,
    color: '#1F3887',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 16,
  },
  dateText: {
    color: '#1F3887',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 16,
  },
  detailsAlignment: {
    justifyContent: 'space-between',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginBottom: 20,
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: `#48cb10`,
  },
  courierInfoContainer: {
    marginRight: 10,
  },
  courierTitle: {
    color: `#B1B1B1`,
    fontSize: 10,
    lineHeight: 15,
  },
  courierName: {},
});

export default styles;
