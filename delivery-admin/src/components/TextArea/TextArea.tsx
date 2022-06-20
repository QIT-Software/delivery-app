import React from 'react';
import {StandardTextFieldProps, TextField as MaterialField} from '@material-ui/core';
import {useField} from 'formik';

interface FieldProps extends StandardTextFieldProps {
  helperText: string;
}

const TextArea: React.FC<FieldProps> = ({
  //
  label,
  placeholder,
  helperText,
  ...custom
}) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const [field, meta] = useField(custom);
  return (
    <MaterialField
      multiline
      rows={4}
      error={!!(meta.touched && meta.error)}
      helperText={meta.touched && meta.error}
      label={label}
      placeholder={placeholder}
      {...field}
      {...custom}
    />
  );
};

export default TextArea;
