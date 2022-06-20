import ImageCropPicker, {Options, Image} from 'react-native-image-crop-picker';

type CancelledResponse = {
  cancelled: true;
};

type SuccessfulResponse = {
  cancelled: false;
  uri: string;
};

type ShowImagePickerResponse = SuccessfulResponse | CancelledResponse;

const processSuccessfulResponse = (result: Image | Image[]): SuccessfulResponse => {
  if (Array.isArray(result)) {
    return {
      cancelled: false,
      uri: result[0].path,
    };
  }

  return {
    cancelled: false,
    uri: result.path,
  };
};

const showImagePicker = async (
  pickOptions: 'camera' | 'gallery',
): Promise<ShowImagePickerResponse> => {
  const options: Options = {
    writeTempFile: true,
    width: 300,
    height: 400,
    cropping: true,
  };

  switch (pickOptions) {
    case 'camera': {
      try {
        const result = await ImageCropPicker.openCamera(options);
        return processSuccessfulResponse(result);
      } catch (e) {
        return {cancelled: true};
      }
    }
    case 'gallery': {
      try {
        const result = await ImageCropPicker.openPicker(options);
        return processSuccessfulResponse(result);
      } catch (e) {
        return {cancelled: true};
      }
    }
  }
};

export default showImagePicker;
