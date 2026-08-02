import { Eye, EyeOff } from '@/icons';
import React, { memo } from 'react';
import ErrorMessage from './ErrorMessage';

interface PasswordInputProps extends React.ComponentPropsWithoutRef<'input'> {
	errorMessage?: string;
}

const PasswordInput = (props: PasswordInputProps) => {
	const [showPassword, setShowPassword] = React.useState(false);
	return (
		<>
			<div className='relative'>
				<input
					{...props}
					type={showPassword ? 'text' : 'password'}
					className={
						props.className
							? props.className
							: 'border-border text-text-secondary w-full flex-1 rounded-md border-2 p-2 text-sm'
					}
				/>
				<button
					type='button'
					aria-label={showPassword ? 'Hide password' : 'Show password'}
					onClick={() => setShowPassword(!showPassword)}
					className='text-text-muted absolute top-1/2 right-3 -translate-y-1/2 hover:text-(--color-text-primary)'
				>
					{showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
				</button>
			</div>
			{props.errorMessage && <ErrorMessage message={props.errorMessage} />}
		</>
	);
};

export default memo(PasswordInput);
