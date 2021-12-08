import DOMPurify from 'isomorphic-dompurify';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';

import { deletePage } from '../../lib/api/delete';
import { BlockType } from '../../lib/type';

import ContextMenu from './ContextMenu';

const CardBarWrapper = styled.div`
  position: relative;
  margin: 2rem 0;
  width: calc(100% - 1rem);

  :hover {
    cursor: pointer;
  }
`;

const CardWrapper = styled.article`
  border: 1px solid #e3e3e3;
  border-radius: 0.5rem;
  background: #fafafa;
  padding: 1rem 1rem 3rem 1rem;
  color: var(--text);
  font-family: var(--regular);
  font-size: 1rem;
`;

const DateWrapper = styled.div`
  display: block;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: +0.5px;
  color: var(--text);
  font-family: var(--regular);
  font-size: 0.875rem;
`;

const ContentWrapper = styled.div`
  position: relative;
  height: 7rem;
  overflow: hidden;
  h1 {
    margin-bottom: 1.125rem;
    line-height: 1.75rem;
    font-size: 1.5rem;
  }

  h2 {
    margin-top: 0;
    margin-bottom: 0.125rem;
    line-height: 1.5rem;
    font-size: 1.25rem;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 0.125rem;
    line-height: 1.25rem;
    font-size: 1rem;
  }

  p {
    margin-top: 0;
    margin-bottom: 0.125rem;
    line-height: 1.25rem;
    font-size: 1rem;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ::before {
    position: absolute;
    top: 5rem;
    left: 0;
    background: linear-gradient(0deg, rgba(250, 250, 250, 1) 0%, rgba(250, 250, 250, 0) 100%);
    width: calc(100% - 1rem);
    height: 2rem;
    content: '';
  }
`;

const MoreButtonWrapper = styled.span`
  display: flex;
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 2rem;

  :hover {
    border-radius: 3rem;
    background-color: #8f8f8f88;
  }
`;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

interface CardProps {
  pageId: string;
  date: Date;
  content: BlockType[];
}

const Card = ({ pageId, date, content }: CardProps) => {
  const router = useRouter();
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);

  const textContent = content.filter((block: BlockType) => block.tag !== 'img');

  const formattedDate = `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

  const forwardToPage = (id: string) => {
    router.push('/p/[pid]', `/p/${id}`);
  };

  const deleteCard = async (id: string) => {
    setIsContextMenuOpen(false);
    await deletePage(id);
    router.reload();
  };

  const toggleContextMenu = () => {
    setIsContextMenuOpen(!isContextMenuOpen);
  };
  const closeContextMenu = () => {
    setIsContextMenuOpen(false);
  };

  return (
    <CardBarWrapper>
      <Link href={`/p/${pageId}`} passHref>
        <CardWrapper>
          <DateWrapper>{formattedDate}</DateWrapper>
          <ContentWrapper>
            {textContent.map((block: BlockType, key: number) => {
              const HTMLTag: any = block.tag;
              const html = DOMPurify.sanitize(block.html);
              return <HTMLTag key={key} dangerouslySetInnerHTML={{ __html: html }} />;
            })}
          </ContentWrapper>
        </CardWrapper>
      </Link>
      <MoreButtonWrapper role='button' tabIndex={0} onClick={() => toggleContextMenu()}>
        <img src='../../assets/icons/More.svg' alt='Icon' />
      </MoreButtonWrapper>
      {isContextMenuOpen && (
        <ContextMenu
          menuItems={[
            { id: 'edit', label: 'Edit', action: () => forwardToPage(pageId) },
            { id: 'delete', label: 'Delete', action: () => deleteCard(pageId) },
          ]}
          closeAction={() => closeContextMenu}
        />
      )}
    </CardBarWrapper>
  );
};

export default Card;
