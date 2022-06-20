import {Alert, AlertButton} from 'react-native';
import IAlertService, {AlertCallback, AdditionalButtons} from './IAlertService';
import i18next from 'i18next';

export default class AlertService implements IAlertService {
  // eslint-disable-next-line class-methods-use-this
  public showMessage(
    title: string,
    message: string,
    positiveButton?: string,
    onPositiveButtonPress?: AlertCallback,
    negativeButton?: string,
    onNegativeButtonPress?: AlertCallback,
    onDismiss?: AlertCallback,
    additionalButtons?: AdditionalButtons,
  ) {
    const buttons: AlertButton[] = [];
    if (positiveButton) {
      buttons.push({
        text: positiveButton,
        onPress: onPositiveButtonPress,
      });
    }

    if (negativeButton) {
      buttons.push({
        text: negativeButton,
        onPress: onNegativeButtonPress,
      });
    }

    if (additionalButtons) {
      buttons.push(
        ...additionalButtons.map(
          (b): AlertButton => ({
            text: b.text,
            onPress: b.onPress,
            style: undefined,
          }),
        ),
      );
    }

    Alert.alert(title, message, buttons.length > 0 ? buttons : undefined, {
      onDismiss,
    });
  }

  public showError(
    message: string,
    title?: string,
    positiveButton?: string,
    onPositiveButtonPress?: AlertCallback,
  ) {
    this.showMessage(
      title || i18next.t('Error'),
      message,
      positiveButton,
      onPositiveButtonPress,
    );
  }
}
