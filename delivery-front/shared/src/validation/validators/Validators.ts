import IValidators from './IValidators';
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
import {
  MaskService,
  TextInputMaskOptionProp,
  TextInputMaskTypeProp,
} from 'react-native-masked-text';

const Validators: IValidators = {
  validateEmail(email: string) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const dogIconCount = email.match(/@/g);
    const isValid = pattern.test(email) && dogIconCount && dogIconCount.length === 1;

    return isValid ? undefined : EmailValidationResult.invalid;
  },

  validateConfirmPasswordMatch(password: string, confirmPassword: string) {
    const isValid = password === confirmPassword;
    return isValid ? undefined : ConfirmPasswordMatchResult.notMatch;
  },

  validatePhoneNumber(phone: string) {
    const pattern = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/; // 10-14 numbers (may start with +)
    const isValid = pattern.test(phone);
    return isValid ? undefined : PhoneValidationResult.doesNotMatch;
  },

  validateNumber(value: string) {
    const pattern = /^[$]?[0-9]*[.,]?[0-9]+$/; // only numbers
    const isValid = pattern.test(value);
    return isValid ? undefined : NumberValidationResult.notNumber;
  },

  validateLength(length: number, minLength: number, maxLength: number) {
    const minL = length >= minLength;
    const maxL = minL && length <= maxLength;
    if (!minL) return LengthValidationResult.tooShort;
    if (!maxL) return LengthValidationResult.tooLong;
    return undefined;
  },

  validateMaskInput(
    value: string,
    maskType: TextInputMaskTypeProp,
    maskOptions: TextInputMaskOptionProp,
  ) {
    const isValid = MaskService.isValid(maskType, value, maskOptions);
    return isValid ? undefined : MaskInputValidationResult.invalid;
  },

  validateTime(time: string) {
    const pattern = /^([01]\d|2[0-3]):([0-5]\d)\s(AM|PM)$/; // HH:MM AM
    const isValid = pattern.test(time);
    return isValid ? undefined : TimeValidationResult.nonExistentTime;
  },

  validateBirthday(birthday: string) {
    const pattern = /(((0)[0-9])|((1)[0-2]))(\/)([0-4][0-9]|(3)[0-1])(\/)\d{4}$/;
    const isValid = pattern.test(birthday);
    return isValid ? undefined : BirthdayValidationResult.invalid;
  },

  validateWorkHours(workHours: string) {
    const pattern = /^([01]\d|2[0-3]):([0-5]\d)-([01]\d|2[0-3]):([0-5]\d)$/; // HH:MM-HH:MM
    const isValid = pattern.test(workHours);
    return isValid ? undefined : WorkHoursValidationResult.nonWorkingHours;
  },

  validateName(name: string) {
    // eslint-disable-next-line no-useless-escape
    const pattern = /^[a-zA-Z][a-zA-Z0-9-_\.]/; // name in Latin characters, must begin with a letter (may include numbers)
    const isValid = pattern.test(name);
    return isValid ? undefined : NameValidationResult.inappropriateCharacters;
  },

  empty(string: string) {
    const pattern = /^\s*$/; // empty string
    const isValid = pattern.test(string);
    return !isValid ? undefined : EmptyStringResult.empty;
  },

  exists(condition: boolean) {
    return !condition ? ExistsResult.notExists : undefined;
  },

  validatePayPal(amountTotal: number, payout: number) {
    const paymentVerification = payout + 0.25 > amountTotal; // check if the amount the user with the commission wants to withdraw is more than the amount on his current wallet
    return !paymentVerification ? undefined : PayPalValidationResult.invalid;
  },
};

export default Validators;
