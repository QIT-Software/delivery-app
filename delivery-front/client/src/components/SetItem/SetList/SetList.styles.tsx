import {StyleSheet} from 'react-native';
import {Fonts} from 'resources/Fonts';

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    marginHorizontal: 25,
    borderBottomWidth: 0.5,
  },
  noBorder: {
    marginTop: 25,
    marginHorizontal: 25,
  },
  name: {
    fontSize: 18,
    lineHeight: 21,
    color: '#000000',
    fontWeight: '500',
    fontFamily: Fonts.SFProDisplayRegular,
  },
  calories: {
    fontSize: 12,
    lineHeight: 14,
    color: '#B5B5B5',
    fontWeight: 'normal',
    paddingBottom: 12,
    fontFamily: Fonts.SFProDisplayRegular,
  },
  ModalOuter: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    position: 'absolute',
    top: -10,
    backgroundColor: '#FFFFFF',
    opacity: 1,
    marginHorizontal: 28,
    marginTop: 100,
    borderRadius: 10,
  },
  imageModalContainer: {
    height: 180,
    backgroundColor: '#ec738e',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalClose: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  titleModalContainer: {
    padding: 20,
  },
  titleModal: {
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 24,
  },
  caloriesModal: {
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 17,
    color: '#B5B5B5',
    marginTop: 5,
  },
  descriptionModalContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  descriptionModal: {
    fontWeight: 'normal',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'justify',
  },
  ingredientsModalContainer: {
    padding: 20,
  },
  ingredientsModalTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 19,
  },
  ingredientsModal: {
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'justify',
  },
});

export default styles;
