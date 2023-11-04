import { ComponentProps } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

export const buttonStyles = cva(['transition-colors'], {
  variants: {
    variant: {
      default: [
        'bg-light',
        'hover:bg-light-hover',
        'dark:bg-dark',
        'dark:hover:bg-dark-hover',
      ],
      ghost: ['hover:bg-gray-100', 'dark:hover:bg-dark-hover'],
      dark: [
        'bg-light-dark',
        'hover:bg-light-dark-hover',
        'text-light',
        'dark:bg-dark-hover',
      ],
    },
    size: {
      default: ['rounded', 'p-2'],
      icon: [
        'rounded-full',
        'w-10',
        'h-10',
        'flex',
        'items-center',
        'justify-center',
        'p-2.5',
      ],
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<'button'>;

const Button = ({ variant, size, className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={twMerge(buttonStyles({ variant, size }), className)}
    />
  );
};

export default Button;
