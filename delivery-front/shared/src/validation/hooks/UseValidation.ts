import ValidationMessage from 'shared/src/validation/entities/ValidationMessage';
import IValidationMessages from '../validationMassage/IValidationMessages';
import IValidators from '../validators/IValidators';
import Validators from '../validators/Validators';
import ValidationMessages from '../validationMassage/ValidationMessages';
import {useTranslation} from 'react-i18next';
import {AlertService} from 'services';

export type ValidationFunction = () => ValidationMessage | undefined;
export type SetValidationHintFunction = (hint: string | undefined) => void;

type UseValidationResponse = {
  validateSummary: (functions: ValidationFunction[]) => boolean;
  validationMessages: IValidationMessages;
  validate: (
    functions: ValidationFunction[],
    setValidationHintFunction?: SetValidationHintFunction,
  ) => ValidationMessage | undefined;
  validators: IValidators;
  callValidation: (functions: ValidationFunction[]) => ValidationMessage[];
};

const callValidation = (functions: ValidationFunction[]) =>
  functions
    .map((f) => f())
    .filter((vm) => !!vm)
    .map((vm) => vm as ValidationMessage);

export const useValidation = (): UseValidationResponse => {
  const {t} = useTranslation('useValidation');

  return {
    validateSummary: (functions: ValidationFunction[]): boolean => {
      const validationMessages = callValidation(functions);
      if (validationMessages.length < 1) return true;

      const message = validationMessages.map((vm) => `- ${vm.message}`).join('\n');

      AlertService.showMessage(t('validation'), message);

      return false;
    },
    validate: (
      functions: ValidationFunction[],
      setValidationHintFunction?: SetValidationHintFunction,
    ) => {
      let message: ValidationMessage | undefined;

      // eslint-disable-next-line no-restricted-syntax
      for (const f of functions) {
        message = f();
        if (message) {
          break;
        }
      }

      if (setValidationHintFunction)
        setValidationHintFunction(message ? message.hint : undefined);

      return message;
    },
    validationMessages: ValidationMessages(),
    validators: Validators,
    callValidation,
  };
};
