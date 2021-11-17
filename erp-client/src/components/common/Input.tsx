import React from 'react';
import styled from 'styled-components';

const InputBarWrapper = styled.div`
  margin: 1rem 0;
`;

const LabelWrapper = styled.label`
  display: block;
  margin: 0.5rem 0;
  text-transform: uppercase;
  letter-spacing: +0.5px;
  color: var(--text);
  font-family: var(--regular);
  font-size: 0.875rem;
`;

const InputWrapper = styled.input`
  border: 1px solid #e3e3e3;
  border-radius: 0.5rem;
  background: #fafafa;
  padding: 1rem;
  width: calc(100% - 1rem);
  max-width: 24rem;
  height: 2.9375rem;
  color: var(--text);
  font-family: var(--regular);
  font-size: 1rem;
  :focus {
    background: var(--tertiary);
  }
`;

interface InputProps {
  formId: string;
  id: string;
  type: string;
  label: string;
  required: boolean;
  value: string;
  setValue: (val: string) => void;
}

const Input = ({ formId, id, type, label, required, value, setValue }: InputProps) => {
  return (
    <InputBarWrapper>
      <LabelWrapper form={formId} htmlFor={id}>
        {label}
      </LabelWrapper>
      <InputWrapper
        form={formId}
        id={id}
        name={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </InputBarWrapper>
  );
};

export default Input;
