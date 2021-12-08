import { BASEURL } from '..';
import { FormType } from '../../type';

const updateAccount = async (formData: FormType) => {
  try {
    const data = await fetch(`${BASEURL}/users/account`, {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }),
    }).then((res) => res.json());

    return data;
  } catch (err) {
    console.log('[FAIL]', err);
  }
};

export default updateAccount;
