import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.a`
  display: inline-block;
  margin: 0;
  border-radius: 0.5rem;
  background: var(--primary);
  padding: 0.4rem 1rem;
  width: auto;
  text-align: center;
  color: white;
  font-family: var(--accent);
  font-weight: 700;
`;

interface ButtonProps {
  children?: any;
  onClickHandler?: () => void;
  href?: string;
}

const Button = ({ children, onClickHandler, href }: ButtonProps) => {
  return (
    <ButtonWrapper href={href} onClick={onClickHandler} onKeyDown={onClickHandler}>
      {children}
    </ButtonWrapper>
  );
};

export default Button;
