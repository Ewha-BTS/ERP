import { NextPageContext } from 'next';
import cookies from 'next-cookies';
import { useState } from 'react';
import styled from 'styled-components';

import Input from '../components/common/Input';
import Notice from '../components/common/Notice';
import { getAccount } from '../lib/api/get';
import { updateAccount } from '../lib/api/put';
import { UserType } from '../lib/type';

const AccountWrapper = styled.section`
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
      required: false,
      value: '',
    },
  ],
};

const AccountPage = (user: UserType) => {
  const RESET_NOTICE = { type: '', message: '' };
  const [notice, setNotice] = useState(RESET_NOTICE);

  const values = {
    [form.inputs[0].id]: user ? user.name : form.inputs[0].value,
    [form.inputs[1].id]: user ? user.email : form.inputs[1].value,
    [form.inputs[2].id]: form.inputs[2].value,
  };

  const [formData, setFormData] = useState(values);

  const handleInputChange = (id: string, value: string) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setNotice(RESET_NOTICE);

    try {
      const account = await updateAccount(formData);
      if (account.errCode) {
        setNotice({ type: 'ERROR', message: account.message });
      } else {
        setNotice({ type: 'SUCCESS', message: 'Successfully updated.' });
      }
    } catch (err) {
      console.log(err);
      setNotice({ type: 'ERROR', message: 'Something unexpected happened.' });
    }
  };

  return (
    <AccountWrapper>
      <HeadingWrapper>Account</HeadingWrapper>
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
              setValue={(value: string) => handleInputChange(input.id, value)}
            />
          );
        })}
        {notice.message && (
          <Notice status={notice.type} mini>
            {notice.message}
          </Notice>
        )}
        <button type='submit'>Update Account</button>
      </form>
    </AccountWrapper>
  );
};

export const getServerSideProps = async (context: NextPageContext) => {
  const { token } = cookies(context);
  const req = context.req;

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        statusCode: 302,
      },
    };
  }

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  req?.headers.cookie && headers.append('Cookie', req.headers.cookie);

  try {
    const data = await getAccount(headers);
    return {
      props: { user: { name: data.name, email: data.email } },
    };
  } catch (err) {
    console.log(err);
    return { props: {} };
  }
};

export default AccountPage;
