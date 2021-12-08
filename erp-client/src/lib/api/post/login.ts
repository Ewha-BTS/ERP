import { BASEURL } from '..';
import { FormType } from '../../type';

const login = async (formData: FormType) => {
  try {
    const data = await fetch(`${BASEURL}/users/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    }).then((res) => res.json());

    return data;
  } catch (err) {
    console.log('[FAIL]', err);
  }
};

export default login;
