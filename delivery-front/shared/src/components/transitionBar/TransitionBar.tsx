import React from 'react';
import {
  Image,
  // ImageBackground,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import styles from './TransitionBar.styles';
import MenuComponent from 'entities/MenuComponent';
import {SvgXml} from 'react-native-svg';
import {isCourier, isClient, isRestaurant} from 'app/Config';

interface TransitionBarProps {
  style?: ViewStyle;
  components: MenuComponent[];
}

const TransitionBar: React.FC<TransitionBarProps> = ({style, components}) => {
  const xml = `
  <svg width="375" height="87" viewBox="0 0 375 87" fill="none" xmlns="http://www.w3.org/2000/svg"  preserveAspectRatio="none">
<g filter="url(#filter0_d)">
<path d="M102.244 1.0001H-5V86H380V1.0001L345.818 1.00005C320.681 1 293.231 0.999949 260.907 1.00009C222.786 1.00026 234.213 47.8038 188.013 47.8038C136.615 47.8038 157.521 1.0001 102.244 1.0001Z" fill="white" stroke="#EEEEEE" stroke-width="2"/>
</g>
<defs>
<filter id="filter0_d" x="0" y="0" width="483" height="87" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
<feOffset dy="-4"/>
<feGaussianBlur stdDeviation="23"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
</filter>
</defs>
</svg>
`;

  const {width} = useWindowDimensions();

  const renderComponent = (
    status: boolean,
    title: string,
    emptyImage: ImageSourcePropType,
    activeImage: ImageSourcePropType,
    navigateAction?: () => void,
  ) => (
    <TouchableOpacity
      style={styles.item}
      onPress={navigateAction ? () => navigateAction() : () => null}
    >
      <View style={styles.menuItemImgContainer}>
        {!status ? (
          <Image style={styles.img} source={emptyImage} />
        ) : (
          <Image style={styles.img} source={activeImage} />
        )}
      </View>
      <Text style={!status ? styles.menuItemText : styles.menuItemTextActive}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <>
      {(isCourier() || isRestaurant()) && (
        <View style={{...styles.containerCourier, ...style}}>
          {components.map((item) =>
            renderComponent(
              item.status,
              item.title,
              item.emptyImage,
              item.activeImage,
              item.navigateAction,
            ),
          )}
        </View>
      )}
      {isClient() && (
        <>
          <SvgXml xml={xml} width={width} height="88" style={styles.container1} />
          <View style={{...styles.container, ...style}}>
            {components.map((item) =>
              renderComponent(
                item.status,
                item.title,
                item.emptyImage,
                item.activeImage,
                item.navigateAction,
              ),
            )}
          </View>
        </>
      )}
    </>
  );
};

export default TransitionBar;
