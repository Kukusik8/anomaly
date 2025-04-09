import React, { memo, useCallback } from 'react';

interface ButtonProps {
	onClick: (id: string | number) => void;
	id: string | number;
	disabled?: boolean;
	children: React.ReactNode;
  }

const Button: React.FC<ButtonProps> = ({ onClick, id, disabled, children }) => {
	const handleClick = useCallback(() => {
		onClick(id);
	}, [onClick, id]);
	
	return (
		<button onClick={handleClick} disabled={disabled}>{children}</button>
	)
}

export default memo(Button);
