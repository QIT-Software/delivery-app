import React from 'react';
import styles from './OrderComplete.styles';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useRouterActions} from 'state/client/hooks/UseActions';
// // import {RateStar, RateStarEmpty} from 'routes/main/assets';
// import {AirbnbRating} from 'react-native-ratings';

const OrderComplete: React.FC = () => {
  const routerActions = useRouterActions();
  // const [rating, useRating] = useState(3);

  return (
    <View style={styles.cartContainer}>
      <View style={styles.thanks}>
        <Text style={styles.thanksTitle}>Thank you</Text>
        <Text style={styles.thanksText}>All your delivers are complete.</Text>
        <Text style={styles.thanksText}>Please, rate the delivery.</Text>
      </View>
      <View style={styles.rateContainer}>
        {/* <AirbnbRating */}
        {/*  starStyle={styles.star} */}
        {/*  showRating={false} */}
        {/*  selectedColor="#FF8C29" */}
        {/*  onFinishRating={(star) => { */}
        {/*    return useRating(star); */}
        {/*  }} */}
        {/* /> */}
      </View>
      <TextInput style={styles.inputPopUp} placeholder="Leave a comment" />
      <TouchableOpacity onPress={() => routerActions.navigateToMain()}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#FF8C29', '#FF2D55']}
          style={styles.btn}
        >
          <Text style={styles.btnText}>To Menu</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default OrderComplete;
