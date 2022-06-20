import React from 'react';
import {View, ViewStyle, ViewProps} from 'react-native';
import {Switch} from 'react-native-switch';
import styles from './LineProperty.styles';

type LinePropertyType = 'link' | 'switch';

interface LinePropertyProps extends ViewProps {
  functionalityType: LinePropertyType;
  leftElement: () => React.ReactNode;
  containerStyle?: ViewStyle;
  rightContainerStyle?: ViewStyle;
  switchState?: boolean;
  onPress?: () => void;
}

const LineProperty: React.FC<LinePropertyProps> = ({
  functionalityType,
  containerStyle,
  switchState,
  onPress,
}) => {
  const FunctionalComponent = (): React.ReactElement => {
    switch (functionalityType) {
      case 'link':
        return <View style={styles.rightImageContainer} />;
      case 'switch':
        return (
          <Switch
            value={switchState}
            onValueChange={onPress}
            backgroundActive="#EE5B30"
            backgroundInactive="#D4D1D1"
            renderActiveText={false}
            renderInActiveText={false}
            circleBorderWidth={0}
            innerCircleStyle={styles.switchContainer}
            circleSize={25}
            switchBorderRadius={30}
            disabled={false}
          />
        );
    }
  };

  return (
    <View
      style={{
        ...styles.container,
        ...containerStyle,
      }}
    >
      <FunctionalComponent />
    </View>
  );
};

export default LineProperty;
