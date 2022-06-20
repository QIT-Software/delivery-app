export type AlertCallback = () => void;

export type AdditionalButtons = {text: string; onPress?: AlertCallback}[];

export default interface IAlertService {
  showMessage(
    title: string,
    message: string,
    positiveButton?: string,
    onPositiveButtonPress?: AlertCallback,
    negativeButton?: string,
    onNegativeButtonPress?: AlertCallback,
    onDismiss?: AlertCallback,
    additionalButtons?: AdditionalButtons,
  ): void;

  showError(
    message: string,
    title?: string,
    positiveButton?: string,
    onPositiveButtonPress?: AlertCallback,
  ): void;
}
