import type { NextPageContext } from 'next';

import EditablePage from '../components/common/EditablePage';
import { postPages } from '../lib/api/usePosts';
import { BlockType } from '../lib/type';
import objectId from '../utils/objectId';

export interface PageProps {
  pid: string;
  blocks: BlockType[];
  err: Error;
}

const IndexPage = ({ pid, blocks, err }: PageProps) => {
  return <EditablePage pid={pid} blocks={blocks} err={err} />;
};

export const getServerSideProps = async (context: NextPageContext) => {
  const blocks = [{ tag: 'p', html: '', imageUrl: '', id: objectId() }];
  const res = context.res;
  const req = context.req;
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  req && req.headers && req.headers.cookie && headers.append('Cookie', req.headers.cookie);

  try {
    const data = await postPages(headers, blocks);
    const pageId = data.pageId;
    const creator = data.creator;
    const query = !creator ? '?public=true' : '';
    res?.writeHead(302, { Location: `/p/${pageId}${query}` });
    res?.end();
    return { props: {} };
  } catch (err) {
    console.log(err);
    return { props: { blocks: null, pid: null, err: true } };
  }
};

export default IndexPage;
