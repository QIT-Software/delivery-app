import {Dimensions, StyleSheet} from 'react-native';

const titleWidth = (1 - 16 / (375 - 33 * 2)) * (Dimensions.get('window').width - 33 * 2);

const styles = StyleSheet.create({
  notificationContainer: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 18,
    marginBottom: 20,
    width: '83%',
    justifyContent: 'space-between',
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
  backBtn: {
    color: '#EE5B30',
    width: 12,
    height: 21,
  },
  notificationInnerContainer: {
    marginTop: 56,
    paddingHorizontal: 22,
  },
  notificationInner: {
    flexDirection: 'row',
    marginBottom: 26,
    justifyContent: 'space-between',
  },
  notificationInnerTitle: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 24,
  },
  notificationHeaderContainer: {
    paddingVertical: 45,
    alignItems: 'center',
  },
  notificationImage: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginBottom: 10,
  },
  notificationName: {
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 24,
  },
});

export default styles;
