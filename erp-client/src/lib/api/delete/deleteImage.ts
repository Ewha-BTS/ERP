const deleteImage = async (imageUrl: string) => {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API}/pages/${imageUrl}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());

    return data;
  } catch (err) {
    console.log('[FAIL]', err);
  }
};

export default deleteImage;
