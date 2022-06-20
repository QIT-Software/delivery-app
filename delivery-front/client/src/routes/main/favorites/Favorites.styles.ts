import {Dimensions, StyleSheet} from 'react-native';
import {Fonts} from 'resources/Fonts';

const titleWidth = (1 - 30 / (375 - 28 * 2)) * (Dimensions.get('window').width - 28 * 2);

const styles = StyleSheet.create({
  favoritesContainer: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#FFFFFF',
    marginBottom: -60,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 33,
    marginBottom: 20,
    width: '70%',
    justifyContent: 'space-between',
  },
  titleContainer: {
    width: titleWidth,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontFamily: Fonts.SFProRoundedRegular,
    fontWeight: 'bold',
    fontSize: 32,
    lineHeight: 38,
  },
  backBtn: {
    color: '#EE5B30',
    width: 12,
    height: 21,
  },
  favoritesSetsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  favoritesSetsTitle: {
    fontFamily: Fonts.SFProRoundedRegular,
    fontWeight: '600',
    fontSize: 22,
  },
  slider: {
    marginTop: 10,
  },
  border: {
    borderRadius: 10,
  },
  basket: {
    bottom: -60,
  },
  basketItem: {
    position: 'absolute',
    left: '37.2%',
    bottom: 0,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
