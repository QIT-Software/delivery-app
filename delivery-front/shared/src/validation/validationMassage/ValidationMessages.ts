import {
  EmailValidationResult,
  ConfirmPasswordMatchResult,
  LengthValidationResult,
  NumberValidationResult,
  PhoneValidationResult,
  TimeValidationResult,
  WorkHoursValidationResult,
  NameValidationResult,
  EmptyStringResult,
  ExistsResult,
  MaskInputValidationResult,
  BirthdayValidationResult,
  PayPalValidationResult,
} from '../entities/ValidationsResults';
import {ValidatorResult} from '../validators/IValidators';
import ValidationMessage from 'shared/src/validation/entities/ValidationMessage';
import IValidationMessages from './IValidationMessages';
import {useTranslation} from 'react-i18next';

const ValidationMessages = (): IValidationMessages => {
  const {t} = useTranslation('validationMassage');
  // massages
  const invalidEmailAddressFormat = t('validErrInvalidEmail');
  const confirmPasswordNotMatch = t('confirmPasswordNotMatch');
  const birthdayFormat = t('dateValidationResult');
  const minLengthValidationFormat = t('minLengthValidationFormat');
  const maxLengthValidationFormat = t('maxLengthValidationFormat');
  const numberValidationFormat = t('numberValidationFormat');
  const phoneNumberFormat = t('phoneNumberFormat');
  const timeValidationFormat = t('timeValidationFormat');
  const workHoursFormat = t('workHoursFormat');
  const nameFormat = t('nameFormat');
  const emptyFormat = t('emptyFormat');
  const notExistsFormat = t('notExistsFormat');
  const payPalInvalidFormat = t('payPalInvalidFormat');
  // hints
  const invalidEmailAddressHint = t('validErrInvalidEmailHint');
  const confirmPasswordNotMatchHint = t('confirmPasswordNotMatchHint');
  const birthdayHint = t('dateValidationResultHint');
  const minLengthValidationHint = t('minLengthValidationHint');
  const maxLengthValidationHint = t('maxLengthValidationHint');
  const numberValidationHint = t('numberValidationHint');
  const phoneNumberHint = t('phoneNumberHint');
  const timeValidationHint = t('timeValidationHint');
  const workHoursHint = t('workHoursHint');
  const nameHint = t('nameHint');
  const emptyHint = t('emptyHint');
  const notExistsHint = t('notExistsHint');
  const payPalInvalidHint = t('payPalInvalidHint');

  return {
    email(result: ValidatorResult<EmailValidationResult>) {
      if (result === undefined) return undefined;
      switch (result) {
        case EmailValidationResult.invalid: {
          return new ValidationMessage(
            invalidEmailAddressFormat,
            invalidEmailAddressHint,
          );
        }
      }
    },

    confirmPasswordMatch(
      fieldPlaceholder: string,
      result: ValidatorResult<ConfirmPasswordMatchResult>,
    ) {
      if (result === undefined) return undefined;
      switch (result) {
        case ConfirmPasswordMatchResult.notMatch: {
          return new ValidationMessage(
            `${fieldPlaceholder} ${confirmPasswordNotMatch}`,
            `${fieldPlaceholder} ${confirmPasswordNotMatchHint}`,
          );
        }
      }
    },

    mask(fieldPlaceholder: string, result: ValidatorResult<MaskInputValidationResult>) {
      if (result === undefined) return undefined;
      switch (result) {
        case MaskInputValidationResult.invalid: {
          return new ValidationMessage(
            `${fieldPlaceholder} ${birthdayFormat}`,
            `${fieldPlaceholder} ${birthdayHint}`,
          );
        }
      }
    },

    lengthValidation(
      fieldPlaceholder: string,
      result: ValidatorResult<LengthValidationResult>,
    ) {
      if (result === undefined) return undefined;
      switch (result) {
        case LengthValidationResult.tooShort: {
          return new ValidationMessage(
            `${fieldPlaceholder} ${minLengthValidationFormat}`,
            `${fieldPlaceholder} ${minLengthValidationHint}`,
          );
        }
        case LengthValidationResult.tooLong: {
          return new ValidationMessage(
            `${fieldPlaceholder} ${maxLengthValidationFormat}`,
            `${fieldPlaceholder} ${maxLengthValidationHint}`,
          );
        }
      }
    },

    numberValidation(
      fieldPlaceholder: string,
      result: ValidatorResult<NumberValidationResult>,
    ) {
      if (result === undefined) return undefined;
      switch (result) {
        case NumberValidationResult.notNumber: {
          return new ValidationMessage(
            `${fieldPlaceholder} ${numberValidationFormat}`,
            `${fieldPlaceholder} ${numberValidationHint}`,
          );
        }
      }
    },

    phoneNumber(
      fieldPlaceholder: string,
      result: ValidatorResult<PhoneValidationResult>,
    ) {
      if (result === undefined) return undefined;
      switch (result) {
        case PhoneValidationResult.doesNotMatch: {
          return new ValidationMessage(
            `${fieldPlaceholder} ${phoneNumberFormat}`,
            `${fieldPlaceholder} ${phoneNumberHint}`,
          );
        }
      }
    },

    timeValidation(
      fieldPlaceholder: string,
      result: ValidatorResult<TimeValidationResult>,
    ) {
      if (result === undefined) return undefined;
      switch (result) {
        case TimeValidationResult.nonExistentTime: {
          return new ValidationMessage(
            `${fieldPlaceholder} ${timeValidationFormat}`,
            `${fieldPlaceholder} ${timeValidationHint}`,
          );
        }
      }
    },

    workHours(
      fieldPlaceholder: string,
      result: ValidatorResult<WorkHoursValidationResult>,
    ) {
      if (result === undefined) return undefined;
      switch (result) {
        case WorkHoursValidationResult.nonWorkingHours: {
          return new ValidationMessage(
            `${fieldPlaceholder} ${workHoursFormat}`,
            `${fieldPlaceholder} ${workHoursHint}`,
          );
        }
      }
    },

    name(fieldPlaceholder: string, result: ValidatorResult<NameValidationResult>) {
      if (result === undefined) return undefined;
      switch (result) {
        case NameValidationResult.inappropriateCharacters: {
          return new ValidationMessage(
            `${fieldPlaceholder} ${nameFormat}`,
            `${fieldPlaceholder} ${nameHint}`,
          );
        }
      }
    },

    empty(fieldPlaceholder: string, result: ValidatorResult<EmptyStringResult>) {
      if (result === undefined) return undefined;
      switch (result) {
        case EmptyStringResult.empty: {
          return new ValidationMessage(
            `${fieldPlaceholder} ${emptyFormat}`,
            `${fieldPlaceholder} ${emptyHint}`,
          );
        }
      }
    },

    notExists(fieldPlaceholder: string, result: ValidatorResult<ExistsResult>) {
      if (result === undefined) return undefined;
      switch (result) {
        case ExistsResult.notExists: {
          return new ValidationMessage(
            `${fieldPlaceholder} ${notExistsFormat}`,
            `${fieldPlaceholder} ${notExistsHint}`,
          );
        }
      }
    },

    avatarNotExists(result: ValidatorResult<ExistsResult>) {
      if (result === undefined) return undefined;
      switch (result) {
        case ExistsResult.notExists: {
          return new ValidationMessage(t('avatarNotExist'), t('avatarNotExistHint'));
        }
      }
    },

    birthday(result: ValidatorResult<BirthdayValidationResult>) {
      if (result === undefined) return undefined;
      switch (result) {
        case BirthdayValidationResult.invalid: {
          return new ValidationMessage(birthdayFormat, birthdayHint);
        }
      }
    },

    payPalValidation(
      fieldPlaceholder: string,
      result: ValidatorResult<PayPalValidationResult>,
    ) {
      if (result === undefined) return undefined;
      switch (result) {
        case PayPalValidationResult.invalid: {
          return new ValidationMessage(
            `${fieldPlaceholder} ${payPalInvalidFormat}`,
            `${fieldPlaceholder} ${payPalInvalidHint}`,
          );
        }
      }
    },
  };
};

export default ValidationMessages;
