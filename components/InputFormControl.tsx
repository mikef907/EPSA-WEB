import { FormControl, TextField } from '@material-ui/core';
import React from 'react';
import { Controller } from 'react-hook-form';

interface IProps {
  control: any;
  name: string;
  label: string;
  defaultValue?: string;
  rules?: any;
  type?: string;
  inputProps?: any;
  fullWidth?: boolean;
  inputLabelProps?: any;
}

const InputFormControl: React.FC<IProps> = ({
  control,
  label,
  name,
  defaultValue = '',
  type = 'text',
  fullWidth = true,
  rules = undefined,
  inputProps = undefined,
  inputLabelProps = { shrink: true },
}) => {
  return (
    <FormControl fullWidth={fullWidth}>
      <Controller
        name={name}
        defaultValue={defaultValue}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label={label}
            type={type}
            InputLabelProps={inputLabelProps}
            inputProps={inputProps}
            error={!!error}
            helperText={error ? error.message : null}
          ></TextField>
        )}
      />
    </FormControl>
  );
};

export default InputFormControl;
