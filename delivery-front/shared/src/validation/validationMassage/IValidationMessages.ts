import {ValidatorResult} from '../validators/IValidators';
import {
  EmailValidationResult,
  ConfirmPasswordMatchResult,
  PhoneValidationResult,
  NumberValidationResult,
  LengthValidationResult,
  TimeValidationResult,
  WorkHoursValidationResult,
  NameValidationResult,
  EmptyStringResult,
  ExistsResult,
  MaskInputValidationResult,
  BirthdayValidationResult,
  PayPalValidationResult,
} from '../entities/ValidationsResults';
import ValidationMessage from 'shared/src/validation/entities/ValidationMessage';

type ValidationMessageResult = ValidationMessage | undefined;

export default interface IValidationMessages {
  email(result: ValidatorResult<EmailValidationResult>): ValidationMessageResult;
  confirmPasswordMatch(
    fieldPlaceholder: string,
    result: ValidatorResult<ConfirmPasswordMatchResult>,
  ): ValidationMessageResult;
  phoneNumber(
    fieldPlaceholder: string,
    result: ValidatorResult<PhoneValidationResult>,
  ): ValidationMessageResult;
  numberValidation(
    fieldPlaceholder: string,
    result: ValidatorResult<NumberValidationResult>,
  ): ValidationMessageResult;
  lengthValidation(
    fieldPlaceholder: string,
    result: ValidatorResult<LengthValidationResult>,
  ): ValidationMessageResult;
  mask(
    fieldPlaceholder: string,
    result: ValidatorResult<MaskInputValidationResult>,
  ): ValidationMessageResult;
  timeValidation(
    fieldPlaceholder: string,
    result: ValidatorResult<TimeValidationResult>,
  ): ValidationMessageResult;
  workHours(
    fieldPlaceholder: string,
    result: ValidatorResult<WorkHoursValidationResult>,
  ): ValidationMessageResult;
  name(
    fieldPlaceholder: string,
    result: ValidatorResult<NameValidationResult>,
  ): ValidationMessageResult;
  empty(
    fieldPlaceholder: string,
    result: ValidatorResult<EmptyStringResult>,
  ): ValidationMessageResult;
  notExists(
    fieldPlaceholder: string,
    result: ValidatorResult<ExistsResult>,
  ): ValidationMessageResult;
  avatarNotExists(result: ValidatorResult<ExistsResult>): ValidationMessageResult;
  birthday(result: ValidatorResult<BirthdayValidationResult>): ValidationMessageResult;
  payPalValidation(
    fieldPlaceholder: string,
    result: ValidatorResult<PayPalValidationResult>,
  ): ValidationMessageResult;
}
