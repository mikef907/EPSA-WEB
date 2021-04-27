import React from 'react';

interface IProps {
  register: any;
  options: any;
  name: string;
}

const Select: React.FC<IProps> = ({ register, options, name, ...rest }) => {
  return (
    <select {...register(name)} {...rest}>
      {options.map((value: any) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default Select;
