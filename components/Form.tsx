import React from 'react';
import { useForm } from 'react-hook-form';

interface IProps {
  defaultValues: any;
  onSubmit: any;
}

const Form: React.FC<IProps> = ({ defaultValues, children, onSubmit }) => {
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(children, (child: any) => {
        return child?.props?.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                key: child.props.name,
              },
            })
          : child;
      })}
    </form>
  );
};

export default Form;
