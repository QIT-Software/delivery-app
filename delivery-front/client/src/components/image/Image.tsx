import React from 'react';
import FastImage, {FastImageProps} from 'react-native-fast-image';
import {getHeaders} from 'api/SpoonAndForkApiUtils';

interface ImageProps extends FastImageProps {}

const Image: React.FC<ImageProps> = ({source, ...otherProps}) => (
  <FastImage
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

export default Image;
