import React from 'react';
import styles from './ModalPopUp.styles';
import {Modal, View} from 'react-native';

const ModalPopUp: React.FC = ({children}) => {
  return (
    <Modal animationType="slide" transparent>
      <View style={styles.ModalOuter}>
        <View style={styles.modalContainer}>{children}</View>
      </View>
    </Modal>
  );
};

export default ModalPopUp;
