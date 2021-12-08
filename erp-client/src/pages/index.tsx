import type { NextPageContext } from 'next';

import EditablePage from '../components/common/EditablePage';
import { postPages } from '../lib/api/post';
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
  const req = context.req;
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  req?.headers.cookie && headers.append('Cookie', req.headers.cookie);

  try {
    const pages = await postPages(headers, blocks);
    const pageId = pages.pageId;
    return {
      props: {},
      redirect: {
        destination: `/p/${pageId}?public=true`,
        statusCode: 302,
      },
    };
  } catch (err) {
    console.log(err);
    return { props: { blocks: null, pid: null, err: true } };
  }
};

export default IndexPage;
