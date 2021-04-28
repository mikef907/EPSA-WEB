import { InputLabel, NativeSelect } from '@material-ui/core';
import React from 'react';
import { UseFormRegister, ValidationRule } from 'react-hook-form';
import { CODES } from '../constants';

interface IProps {
  field: any;
}

const LanguagePicker: React.FC<IProps> = ({ field }) => {
  return (
    <>
      <InputLabel htmlFor="language-label" shrink={true}>
        Language
      </InputLabel>
      <NativeSelect
        inputProps={{
          id: 'language-label',
        }}
        {...field}
      >
        {CODES.sort((a, b) => (a.name > b.name ? 1 : -1)).map((_) => (
          <option key={_.code} value={_.code}>
            {_.name}
          </option>
        ))}
      </NativeSelect>
    </>
  );
};

export default LanguagePicker;
