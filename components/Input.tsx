import React from 'react';

interface IProps {
  register: any;
  name: string;
}

const Input: React.FC<IProps> = ({ register, name, ...rest }) => {
  return <input {...register(name)} {...rest} />;
};
