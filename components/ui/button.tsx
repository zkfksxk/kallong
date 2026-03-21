import { ReactNode } from 'react';

//note: secondary - info용, ghost - 투명함
type ButtonVariant = 'filled' | 'outline' | 'secondary' | 'ghost';
type ButtonSize = 's' | 'm' | 'l';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  icon?: ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  loading?: boolean;
  size?: ButtonSize;
}

const variantStyles = {
  filled: `
    text-white font-bold
    bg-red-500 hover:bg-red-700 active:bg-red-900
    rounded-lg px-[10px] py-[10px]
    disabled:cursor-not-allowed
  `,
  secondary: `
    text-white font-bold
    bg-blue-700 hover:bg-blue-900 active:bg-blue-900
    rounded-lg px-[10px] py-[10px]
    disabled:cursor-not-allowed disabled:bg-gray-300 dark:disabled:bg-transparent
  `,
  outline: `
    border border-blue-300
    text-blue-400
    hover:bg-blue-50
  `,
  ghost: `
    text-blue-400
    hover:bg-blue-50
  `,
};

const Button = ({
  children,
  icon,
  variant = 'filled',
  className = '',
  fullWidth = false,
  loading = false,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`
        ${fullWidth ? 'w-full' : 'w-fit'}
        flex items-center justify-center gap-2 font-bold!
        cursor-pointer transition-colors duration-300 font-pretendard text-[16px]
		disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed
		${variantStyles[variant]}
        ${className}
	`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className='animate-spin'>⏳</span>
      ) : (
        <>
          {icon && icon}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
