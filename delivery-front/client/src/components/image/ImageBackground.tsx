import React from 'react';
import {
  ImageBackground as RNImageBackground,
  ImageBackgroundProps as RNImageBackgroundProps,
} from 'react-native';
import {getHeaders} from 'api/SpoonAndForkApiUtils';

interface ImageBackgroundProps extends RNImageBackgroundProps {}

const ImageBackground: React.FC<ImageBackgroundProps> = ({source, ...otherProps}) => (
  <RNImageBackground
    {...otherProps}
    source={
      typeof source === 'number'
        ? source
        : {
            ...source,
            headers: {
              ...getHeaders(),
            },
          }
    }
  />
);

export default ImageBackground;
