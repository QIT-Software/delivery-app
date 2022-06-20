import {StyleSheet} from 'react-native';
import {Fonts} from 'resources/Fonts';

const styles = StyleSheet.create({
  titleModalContainer: {
    padding: 20,
    flexDirection: 'row',
    marginTop: 10,
  },
  titleModal: {
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 24,
    fontFamily: Fonts.SFProRoundedRegular,
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
    fontFamily: Fonts.SFProRoundedRegular,
  },
  ingredientsModalContainer: {
    padding: 20,
  },
  ingredientsModalTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 19,
    fontFamily: Fonts.SFProRoundedRegular,
  },
  ingredientsModal: {
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'justify',
    fontFamily: Fonts.SFProRoundedRegular,
  },
  dishImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginRight: 10,
  },
});

export default styles;
