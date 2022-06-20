import React from 'react';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

// TODO: Add types to DatePicker
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DatePicker: React.FC<any> = ({field, form, ...other}) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        name={field.name}
        value={field.value}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
        onChange={(date) => form.setFieldValue(field.name, date, false)}
        {...other}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
