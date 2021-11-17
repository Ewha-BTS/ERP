import { NextPageContext } from 'next';
import cookies from 'next-cookies';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import Input from '../components/common/Input';
import Notice from '../components/common/Notice';
import { UserDispatchContext } from '../context/UserContext';
import { createAccount } from '../lib/api/usePosts';
import { FormType } from '../lib/type';

const SignupWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 35%;
  width: 100%;
  height: 100%;
`;

const HeadingWrapper = styled.h1`
  margin-bottom: 3rem;
  color: var(--primary);
`;

const form = {
  id: 'signup',
  inputs: [
    {
      id: 'name',
      type: 'text',
      label: 'Name',
      required: true,
      value: '',
    },
    {
      id: 'email',
      type: 'email',
      label: 'E-Mail Address',
      required: true,
      value: '',
    },
    {
      id: 'password',
      type: 'password',
      label: 'Password',
      required: true,
      value: '',
    },
  ],
};

const SinupPage = () => {
  const RESET_NOTICE = { type: '', message: '' };
  const [notice, setNotice] = useState(RESET_NOTICE);
  const dispatch = useContext(UserDispatchContext);
  const router = useRouter();

  const [formData, setFormData] = useState<FormType>({ name: '', email: '', password: '' });

  const handleInputChange = (id: string, value: string) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setNotice(RESET_NOTICE);

    try {
      const data = await createAccount(formData);
      if (data.errCode) {
        setNotice({ type: 'ERROR', message: data.message });
      } else {
        dispatch({ type: 'LOGIN' });
        setNotice({
          type: 'SUCCESS',
          message: 'Success! Check your inbox to confirm your email. You will now be redirected.',
        });
        setTimeout(() => {
          router.push('/pages');
        }, 4000);
      }
    } catch (err) {
      console.log(err);
      setNotice({ type: 'ERROR', message: 'Something unexpected happened.' });
      dispatch({ type: 'LOGOUT' });
    }
  };
  return (
    <SignupWrapper>
      <HeadingWrapper>Signup</HeadingWrapper>
      <form id={form.id} method='post' onSubmit={handleSubmit}>
        {form.inputs.map((input, key) => {
          return (
            <Input
              key={key}
              formId={form.id}
              id={input.id}
              type={input.type}
              label={input.label}
              required={input.required}
              value={formData[input.id]}
              setValue={(value) => handleInputChange(input.id, value)}
            />
          );
        })}
        {notice.message && (
          <Notice status={notice.type} mini>
            {notice.message}
          </Notice>
        )}
        <button type='submit'>Sign up</button>
      </form>
      <p>Sign up to create private pages that exist forever.</p>
    </SignupWrapper>
  );
};

export const getServerSideProps = (context: NextPageContext) => {
  const { token } = cookies(context);
  const res = context.res;
  if (token) {
    res?.writeHead(302, { Location: `/account` });
    res?.end();
  }

  return { props: {} };
};

export default SinupPage;
