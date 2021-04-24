import { InputLabel, NativeSelect } from '@material-ui/core';
import React from 'react';
import { CODES } from '../constants';

interface IProps {
  name: string;
  inputRef: any;
  error: boolean;
}

const LanguagePicker: React.FC<IProps> = ({ name, inputRef, error }) => {
  return (
    <>
      <InputLabel htmlFor="language-label" shrink={true}>
        Language
      </InputLabel>
      <NativeSelect
        inputProps={{
          id: 'language-label',
        }}
        name={name}
        inputRef={inputRef}
        error={error}
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
