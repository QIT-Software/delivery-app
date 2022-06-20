import {Dimensions, StyleSheet} from 'react-native';

const titleWidth = (1 - 44 / (375 - 33 * 2)) * (Dimensions.get('window').width - 33 * 2);

const styles = StyleSheet.create({
  settingsContainer: {
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
    width: '90%',
    justifyContent: 'space-between',
  },
  backBtn: {
    color: '#EE5B30',
    width: 12,
    height: 21,
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
  cardsListContainer: {
    paddingVertical: 27,
    paddingHorizontal: 22,
  },
  cardsListInner: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 24,
    paddingBottom: 12,
  },
  cardContainer: {
    paddingHorizontal: 18,
    marginTop: 58,
    backgroundColor: '#FFCABA',
    borderRadius: 25,
    height: 200,
    paddingTop: 25,
    paddingBottom: 15,
  },
  inputCard: {
    marginBottom: 10,
    paddingHorizontal: '27%',
  },
  cardInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputCardInfo: {
    width: '48%',
    paddingHorizontal: '12%',
  },
  btn: {
    marginVertical: 33,
    borderRadius: 10,
  },
  btnText: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 13,
    color: '#ffffff',
  },
});

export default styles;
