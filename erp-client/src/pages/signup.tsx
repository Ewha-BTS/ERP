import { NextPageContext } from 'next';
import cookies from 'next-cookies';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import Input from '../components/common/Input';
import Notice from '../components/common/Notice';
import { createAccount } from '../lib/api/post';
import { userIdState } from '../lib/state';
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
  const router = useRouter();
  const RESET_NOTICE = { type: '', message: '' };
  const [notice, setNotice] = useState(RESET_NOTICE);
  const [formData, setFormData] = useState<FormType>({ name: '', email: '', password: '' });
  const setUserId = useSetRecoilState(userIdState);

  const handleInputChange = (id: string, value: string) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setNotice(RESET_NOTICE);

    try {
      const user = await createAccount(formData);
      if (user.errCode) {
        setNotice({ type: 'ERROR', message: user.message });
        setUserId(null);
      } else {
        setUserId(user.userId);
        setNotice({
          type: 'SUCCESS',
          message: 'Success! Login to start the journey :)',
        });
        router.push('/pages');
      }
    } catch (err) {
      console.log(err);
      setNotice({ type: 'ERROR', message: 'Something unexpected happened.' });
      setUserId(null);
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

  if (token) {
    return {
      redirect: {
        destination: '/account',
        statusCode: 302,
      },
    };
  }

  return { props: {} };
};

export default SinupPage;
