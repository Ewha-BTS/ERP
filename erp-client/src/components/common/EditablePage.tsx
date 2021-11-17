import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { usePrevious } from '../../hooks';
import { deleteImage } from '../../lib/api/useDeletes';
import { updatePage } from '../../lib/api/usePuts';
import { BlockType } from '../../lib/type';
import { PageProps } from '../../pages';
import objectId from '../../utils/objectId';
import setCaretToEnd from '../../utils/setCaretToEnd';

import EditableBlock from './EditableBlock';
import Notice from './Notice';

const EditablePageWrapper = styled.section`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 20px 0 50px;
  width: 100%;
  height: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  height: 20%;

  > * {
    margin: 0 20px;
  }
`;

const EditablePage = ({ pid: id, blocks: fetchedBlocks, err }: PageProps) => {
  const router = useRouter();
  const [blocks, setBlocks] = useState(fetchedBlocks);
  const [currentBlockId, setCurrentBlockId] = useState('');

  const prevBlocks = usePrevious(blocks);

  useEffect(() => {
    if (prevBlocks && prevBlocks !== blocks) {
      updatePage(blocks, id);
    }
  }, [blocks, prevBlocks]);

  useEffect(() => {
    if (prevBlocks && blocks && prevBlocks.length + 1 === blocks.length) {
      const nextBlockPosition = blocks.map((b) => b.id).indexOf(currentBlockId) + 1;
      const nextBlock = document.querySelector(`[data-position="${nextBlockPosition}]`);
      if (nextBlock) {
        (nextBlock as HTMLElement).focus();
      }
    }

    if (prevBlocks && blocks && prevBlocks.length - 1 === blocks.length) {
      const lastBlockPosition = prevBlocks.map((b) => b.id).indexOf(currentBlockId);
      const lastBlock = document.querySelector(`[data-position="${lastBlockPosition}]`);
      if (lastBlock) {
        setCaretToEnd(lastBlock as HTMLElement);
      }
    }
  }, [blocks, prevBlocks, currentBlockId]);

  const updateBlockHandler = (currentBlock: BlockType) => {
    const index = blocks.map((b) => b.id).indexOf(currentBlock.id);
    const oldBlock = blocks[index];
    const updatedBlocks = [...blocks];
    updatedBlocks[index] = {
      ...updatedBlocks[index],
      tag: currentBlock.tag,
      html: currentBlock.html,
      imageUrl: currentBlock.imageUrl,
    };
    setBlocks(updatedBlocks);

    if (oldBlock.imageUrl && oldBlock.imageUrl !== currentBlock.imageUrl) {
      deleteImage(oldBlock.imageUrl);
    }
  };

  const addBlockHandler = (currentBlock: BlockType) => {
    setCurrentBlockId(currentBlock.id);
    const index = blocks.map((b) => b.id).indexOf(currentBlock.id);
    const updatedBlocks = [...blocks];
    const newBlock: BlockType = { id: objectId(), tag: 'p', html: '', imageUrl: '' };
    updatedBlocks.splice(index + 1, 0, newBlock);
    updatedBlocks[index] = {
      ...updatedBlocks[index],
      tag: currentBlock.tag,
      html: currentBlock.html,
      imageUrl: currentBlock.imageUrl,
    };
    setBlocks(updatedBlocks);
  };

  const deleteBlockHandler = (currentBlock: BlockType) => {
    if (blocks.length > 1) {
      setCurrentBlockId(currentBlock.id);
      const index = blocks.map((b) => b.id).indexOf(currentBlock.id);
      const deletedBlock = blocks[index];
      const updatedBlocks = [...blocks];
      updatedBlocks.splice(index, 1);
      setBlocks(updatedBlocks);

      if (deletedBlock.tag === 'img' && deletedBlock.imageUrl) {
        deleteImage(deletedBlock.imageUrl);
      }
    }
  };

  const onDragEndHandler = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination || destination.index === source.index) {
      return;
    }

    const updatedBlocks = [...blocks];
    const removedBlocks = updatedBlocks.splice(source.index - 1, 1);
    updatedBlocks.splice(destination.index - 1, 0, removedBlocks[0]);
    setBlocks(updatedBlocks);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await updatePage(blocks, id);
      router.push('/pages');
    } catch (err) {
      console.log(err);
    }
  };

  if (err) {
    return (
      <Notice status='ERROR'>
        <h3>Something went wrong 💔</h3>
        <p>Have you tried to restart the app at &apos;/&apos; ?</p>
      </Notice>
    );
  }

  const isNewPublicPage = router.query.public === 'true';
  return (
    <EditablePageWrapper>
      {isNewPublicPage && (
        <Notice dismissible>
          <h4>Hey 👋 You just created a public page.</h4>
          <p>It will be automatically deleted after 24 hours.</p>
        </Notice>
      )}
      <form id='save_page' onSubmit={handleSubmit} style={{ height: '100%' }}>
        <DragDropContext onDragEnd={onDragEndHandler}>
          <Droppable droppableId={id}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} style={{ height: '80%' }}>
                {blocks.map((block: BlockType) => {
                  const position = blocks.map((b: BlockType) => b.id).indexOf(block.id) + 1;
                  return (
                    <EditableBlock
                      key={block.id}
                      position={position}
                      id={block.id}
                      tag={block.tag}
                      html={block.html}
                      imageUrl={block.imageUrl}
                      pageId={id}
                      addBlock={addBlockHandler}
                      deleteBlock={deleteBlockHandler}
                      updateBlock={updateBlockHandler}
                    />
                  );
                })}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </form>
    </EditablePageWrapper>
  );
};

export default EditablePage;
