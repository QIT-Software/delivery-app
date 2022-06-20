import {
  ViewProps,
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  Image as RNImage,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SetList from './SetList/SetList';
import React, {useState} from 'react';
import styles from './SetItem.styles';
import {PlusSet, MinusSet} from './assets';
import Set from 'entities/Set';
import {useRouterActions, useSaveInfoActions} from 'state/client/hooks/UseActions';
import {useSelector} from 'react-redux';
import State from 'state/client/entities/State';
import SelectedSetInfo from 'entities/SelectedSetsInfo';
import ImageBackground from '../../components/image/ImageBackground';
import Image from '../../components/image/Image';
import {useTranslation} from 'react-i18next';

interface SetItemProps extends ViewProps {
  set: Set;
  index: number;
  blockStyle?: ViewStyle;
}

export const SetItem: React.FC<SetItemProps> = ({set, index}) => {
  const [quantity, setQuantity] = useState(1);

  const {t} = useTranslation('cuisineSets');

  const routerActions = useRouterActions();

  const saveInfoActions = useSaveInfoActions();
  const {info} = useSelector((state: State) => state);

  const newSelectedSetsInfo = info.selectedSetsInfo;

  const dayNumber = (day: string) => {
    switch (day) {
      case 'Sunday': {
        const num = 0;
        return num;
      }
      case 'Monday': {
        const num = 1;
        return num;
      }
      case 'Tuesday': {
        const num = 2;
        return num;
      }
      case 'Wednesday': {
        const num = 3;
        return num;
      }
      case 'Thursday': {
        const num = 5;
        return num;
      }
      case 'Friday': {
        const num = 5;
        return num;
      }
      case 'Saturday': {
        const num = 6;
        return num;
      }
    }
    return true;
  };

  const saveSelectedSetInfo = () => {
    let changed = false;

    const date = set.day;

    const today = new Date();

    let numberOfDays: number = 0;

    const gap: number = +dayNumber(date) - today.getDay();

    if (gap > 0) {
      numberOfDays = gap;
    } else {
      numberOfDays = gap + 7;
    }

    const info = newSelectedSetsInfo.map((item: SelectedSetInfo) => {
      if (item.set.id === set.id) {
        changed = true;
        return {...item, quantity};
      }
      return item;
    });

    if (!changed) {
      info.push({set, quantity, numberOfDays});
    }

    saveInfoActions.saveSelectedSetInfo(info);
  };
  const {imageId} = set;
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{uri: imageId}}
        imageStyle={styles.bg}
        style={styles.setTitleContainer}
      >
        <View style={styles.setVariables}>
          {set.statuses.map((item) => {
            return (
              <>
                <Image source={{uri: item.imageId}} style={styles.setVariablesImage} />
              </>
            );
          })}
        </View>
        <Text style={styles.setNumber}>
          {t('set')} {index + 1}
        </Text>
        <Text style={styles.name}>{set.name}</Text>
      </ImageBackground>
      <View>
        <TouchableOpacity onPress={() => routerActions.navigateToDishPopUp(set.id)}>
          {set.dishes.map((d) => (
            <SetList key={d.id} setMenu={d} />
          ))}
          {/* <FlatList */}
          {/*  data={set.dishes} */}
          {/*  numColumns={1} */}
          {/*  keyExtractor={(item) => item.id} */}
          {/*  renderItem={({item}) => <SetList setMenu={item} />} */}
          {/* /> */}
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => {
              if (quantity > 1) {
                setQuantity(quantity - 1);
              }
            }}
          >
            <RNImage source={MinusSet} />
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity
            onPress={() => {
              setQuantity(quantity + 1);
            }}
          >
            <RNImage source={PlusSet} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.price}>
            {set.priceCents / 100} <Text style={styles.priceCur}>aed</Text>
          </Text>
        </View>
      </View>
      <View style={styles.btnOpacity}>
        <TouchableOpacity onPress={() => saveSelectedSetInfo()}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#FF8C29', '#FF2D55']}
            style={styles.btn}
          >
            <Text style={styles.btnText}>{t('toCart')}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};
