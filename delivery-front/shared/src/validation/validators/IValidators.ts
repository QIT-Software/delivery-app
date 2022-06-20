import {
  EmailValidationResult,
  ConfirmPasswordMatchResult,
  PhoneValidationResult,
  NumberValidationResult,
  LengthValidationResult,
  TimeValidationResult,
  NameValidationResult,
  WorkHoursValidationResult,
  EmptyStringResult,
  ExistsResult,
  MaskInputValidationResult,
  BirthdayValidationResult,
  PayPalValidationResult,
} from '../entities/ValidationsResults';
import {TextInputMaskOptionProp, TextInputMaskTypeProp} from 'react-native-masked-text';

export type ValidatorResult<T> = T | undefined;

export default interface IValidators {
  validateEmail(email: string): ValidatorResult<EmailValidationResult>;
  validateConfirmPasswordMatch(
    password: string,
    confirmPassword: string,
  ): ValidatorResult<ConfirmPasswordMatchResult>;
  validatePhoneNumber(phone: string): ValidatorResult<PhoneValidationResult>;
  validateNumber(number: string): ValidatorResult<NumberValidationResult>;
  validateLength(
    length: number,
    minLength: number,
    maxLength: number,
  ): ValidatorResult<LengthValidationResult>;
  validateMaskInput(
    value: string,
    maskType: TextInputMaskTypeProp,
    maskOptions: TextInputMaskOptionProp,
  ): ValidatorResult<MaskInputValidationResult>;
  validateTime(time: string | undefined): ValidatorResult<TimeValidationResult>;
  validateBirthday(
    birthday: string | undefined,
  ): ValidatorResult<BirthdayValidationResult>;
  validateWorkHours(workHours: string): ValidatorResult<WorkHoursValidationResult>;
  validateName(name: string): ValidatorResult<NameValidationResult>;
  empty(string: string | undefined | Date): ValidatorResult<EmptyStringResult>;
  exists(condition: boolean): ValidatorResult<ExistsResult>;
  validatePayPal(
    amountTotal: number,
    payout: number,
  ): ValidatorResult<PayPalValidationResult>;
}
