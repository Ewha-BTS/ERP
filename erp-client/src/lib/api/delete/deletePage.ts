const deletePage = async (pageId: string) => {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API}/pages/${pageId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json());

    return data;
  } catch (err) {
    console.log('[FAIL]', err);
  }
};

export default deletePage;
