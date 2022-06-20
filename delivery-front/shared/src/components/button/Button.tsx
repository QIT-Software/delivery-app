import React from 'react';
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  ImageStyle,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import styles from './Button.styles';
import {Card} from 'components/index';
import FastImage from 'react-native-fast-image';

type VisualStyle = 'none' | 'solid' | 'border' | 'card';

interface ButtonProps extends ViewProps {
  style?: ViewStyle;
  title?: string;
  onPress?: () => void;
  visualStyle?: VisualStyle;
  wrapperStyle?: ViewStyle;
  textStyle?: TextStyle;
  leftImage?: string;
  renderLeftImage?: () => React.ReactElement;
  leftImageContainerStyle?: ViewStyle;
  leftImageStyle?: ImageStyle;
  rightImage?: ImageSourcePropType;
  renderRightImage?: () => React.ReactElement;
  rightImageContainerStyle?: ViewStyle;
  rightImageStyle?: ImageStyle;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  style,
  title,
  onPress,
  visualStyle,
  wrapperStyle,
  textStyle,
  leftImage,
  renderLeftImage,
  leftImageContainerStyle,
  leftImageStyle,
  rightImage,
  renderRightImage,
  rightImageContainerStyle,
  rightImageStyle,
  loading,
}) => {
  const Wrapper = ({
    style,
    children,
  }: {
    style: ViewStyle;
    children: React.ReactNode;
  }): React.ReactElement => {
    switch (visualStyle) {
      case 'card':
        return <Card style={style}>{children}</Card>;
      case 'border':
        return (
          <View style={[styles.borderedBtnBackground, styles.container, wrapperStyle]}>
            {children}
          </View>
        );
      case 'none':
        return (
          <View
            style={{
              ...style,
            }}
          >
            {children}
          </View>
        );
      case 'solid':
        return (
          <View style={[styles.solidBtnBackground, styles.container]}>{children}</View>
        );
      default:
        return (
          <View
            style={{
              ...style,
            }}
          >
            {children}
          </View>
        );
    }
  };

  const renderImage = (
    image: string | undefined,
    renderImage: (() => React.ReactElement) | undefined,
    imageContainerStyle: ViewStyle,
    imageStyle?: ImageStyle,
  ) => {
    return (
      (image || renderImage) && (
        <View style={imageContainerStyle}>
          {renderImage
            ? renderImage()
            : image && <FastImage source={{uri: image}} style={imageStyle} />}
        </View>
      )
    );
  };

  const getContainerStyle = (): ViewStyle | undefined => {
    switch (visualStyle) {
      case 'border':
        return styles.borderedBtnBackground;
      case 'solid':
        return styles.solidBtnBackground;
      default:
        return undefined;
    }
  };

  const renderFromRightImage = (
    image: ImageSourcePropType | undefined,
    renderImage: (() => React.ReactElement) | undefined,
    imageContainerStyle: ViewStyle,
    imageStyle?: ImageStyle,
  ) => {
    return (
      (image || renderImage) && (
        <View style={imageContainerStyle}>
          {renderImage
            ? renderImage()
            : image && (
                <Image
                  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                  // @ts-ignore
                  source={rightImage}
                  style={imageStyle}
                />
              )}
        </View>
      )
    );
  };

  return (
    <TouchableOpacity
      style={[
        {
          ...getContainerStyle,
          ...style,
        },
        styles.touchableOpacity,
      ]}
      onPress={onPress}
      activeOpacity={0.6}
      disabled={loading}
    >
      <Wrapper style={{...styles.wrapper, ...wrapperStyle}}>
        {loading ? (
          <View style={styles.loadingButtonMargin}>
            <ActivityIndicator />
          </View>
        ) : (
          <>
            {renderImage(
              leftImage,
              renderLeftImage,
              {
                ...leftImageContainerStyle,
                ...styles.leftImageContainer,
              },
              leftImageStyle,
            )}
            {title && (
              <Text
                style={{
                  ...styles.text,
                  ...textStyle,
                }}
              >
                {title}
              </Text>
            )}
            {renderFromRightImage(
              rightImage,
              renderRightImage,
              {
                ...rightImageContainerStyle,
                ...styles.rightImageContainer,
              },
              rightImageStyle,
            )}
          </>
        )}
      </Wrapper>
    </TouchableOpacity>
  );
};

export default Button;
