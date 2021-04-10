import NextLink from 'next/link';
import { Link as MatLink } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';
import { Children } from 'react';

interface IProps {
  href: string;
  color?:
    | 'inherit'
    | 'initial'
    | 'primary'
    | 'secondary'
    | 'textPrimary'
    | 'textSecondary'
    | 'error'
    | undefined;
  variant?: 'inherit' | Variant | undefined;
  as?: string;
}

const Link: React.FC<IProps> = ({
  href,
  color = 'primary',
  variant = 'inherit',
  as,
  children,
}) => {
  return (
    <NextLink href={href} as={as} passHref>
      <MatLink color={color} variant={variant}>
        {children}
      </MatLink>
    </NextLink>
  );
};

export default Link;
