import {Dimensions, StyleSheet, ViewStyle} from 'react-native';
import {Fonts} from 'resources/Fonts';

const titleWidth = (1 - 64 / (375 - 33 * 2)) * (Dimensions.get('window').width - 33 * 2);

const styles = StyleSheet.create({
  cuisinesContainer: {
    flex: 1,
    paddingTop: 30,
    marginBottom: -60,
    backgroundColor: '#FFFFFF',
  },
  titleContainer: {
    width: titleWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    fontFamily: Fonts.SFProRoundedRegular,
  },
  item: {
    marginBottom: 20,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 33,
  },
  setContainer: {
    // height: '52.5%',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  scroll: {
    paddingHorizontal: 10,
    paddingBottom: 135,
  },
  backBtnContainer: {
    width: 32,
  },
  backBtn: {
    color: '#EE5B30',
    width: 12,
    height: 21,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginVertical: 15,
    marginHorizontal: 20,
    paddingHorizontal: 5,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
    justifyContent: 'center',
  },
  tab: {
    borderRightWidth: 1,
    borderColor: '#EDEDED',
  },
  lastTab: {
    borderRightWidth: 0,
    borderColor: '#EDEDED',
  },
  tabTitle: {
    fontFamily: Fonts.SFProRoundedRegular,
    fontSize: 16,
    fontWeight: 'normal',
    marginHorizontal: 10,
    paddingVertical: 10,
  },
  tabTitleActive: {
    color: '#EE5B30',
    fontWeight: 'bold',
  },
  setsContainer: {
    marginBottom: 50,
  },

  ModalOuter: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 40,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    opacity: 1,
    marginHorizontal: 28,
    borderRadius: 10,
    height: '100%',
  },
  imageModalContainer: {
    height: 140,
    backgroundColor: '#ec738e',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'flex-end',
    paddingBottom: 15,
    paddingLeft: 15,
  },
  modalClose: {
    position: 'absolute',
    right: 10,
    top: 10,
  },

  setNumber: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
  },
  name: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 22,
    lineHeight: 26,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 0, height: 4},
    textShadowRadius: 4,
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

const tabTitleStyle = (isActive: boolean): ViewStyle => ({
  ...styles.tabTitle,
  ...(isActive ? styles.tabTitleActive : {}),
});

const tabStyle = (isLast: boolean): ViewStyle => ({
  ...styles.tab,
  ...(isLast ? styles.lastTab : {}),
});

export default {
  ...styles,
  tabTitleStyle,
  tabStyle,
};
