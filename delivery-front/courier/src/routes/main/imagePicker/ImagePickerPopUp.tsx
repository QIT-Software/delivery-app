import React from 'react';
import styles from './ImagePickerPopUp.styles';
import {useImagePickerActions} from 'state/courier/hooks/UseActions';
import {useRouterActions} from 'state/hooks/UseActions';
import showImagePicker from 'utils/ImagePickerUtil';
import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const ImagePickerPopUp: React.FC = () => {
  const actions = useImagePickerActions();
  const routerActions = useRouterActions();
  const avatarPress = async (options: 'camera' | 'gallery') => {
    const result = await showImagePicker(options);
    if (!result.cancelled) {
      await actions.addImageToUser(result.uri);
    }
  };
  return (
    <Modal animationType="fade" transparent>
      <TouchableWithoutFeedback onPress={() => routerActions.goBack()}>
        <View style={styles.modalOuter}>
          <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => avatarPress('camera')}>
              <Text style={styles.buttonText}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => avatarPress('gallery')}>
              <Text style={styles.buttonText}>Gallery</Text>
            </TouchableOpacity>
          </View>
          {/* <View style={styles.cancelButton}> */}
          {/*  <TouchableOpacity onPress={() => routerActions.goBack()}> */}
          {/*    <Text style={styles.cancelText}>Cancel</Text> */}
          {/*  </TouchableOpacity> */}
          {/* </View> */}
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ImagePickerPopUp;
