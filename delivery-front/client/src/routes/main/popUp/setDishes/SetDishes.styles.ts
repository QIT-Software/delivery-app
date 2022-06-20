import {StyleSheet} from 'react-native';
import {Fonts} from 'resources/Fonts';

const styles = StyleSheet.create({
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
  imageModal: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  image: {
    width: 25,
    height: 25,
  },
  modalClose: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  name: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 22,
    lineHeight: 26,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 0, height: 4},
    textShadowRadius: 4,
    fontFamily: Fonts.SFProRoundedRegular,
  },
});

export default styles;
