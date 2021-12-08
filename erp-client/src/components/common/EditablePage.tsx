import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { usePrevious } from '../../hooks';
import { deleteImage } from '../../lib/api/delete';
import { updatePage } from '../../lib/api/put';
import { isSideBarOpen, selectedPlotState } from '../../lib/state';
import { PageProps } from '../../pages';
import objectId from '../../utils/objectId';
import setCaretToEnd from '../../utils/setCaretToEnd';

import EditableBlock from './EditableBlock';
import Notice from './Notice';

const EditablePageWrapper = styled.section`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
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
// A page is represented by an array containing several blocks
// [
//   {
//     _id: "5f54d75b114c6d176d7e9765",
//     html: "Heading",
//     tag: "h1",
//     imageUrl: "",
//   },
//   {
//     _id: "5f54d75b114c6d176d7e9766",
//     html: "I am a <strong>paragraph</strong>",
//     tag: "p",
//     imageUrl: "",
//   },
//     _id: "5f54d75b114c6d176d7e9767",
//     html: "/im",
//     tag: "img",
//     imageUrl: "images/test.png",
//   }
// ]

const EditablePage = ({ pid: id, blocks: fetchedBlocks, err }: PageProps) => {
  const router = useRouter();
  const [blocks, setBlocks] = useState(fetchedBlocks);
  const [currentBlockId, setCurrentBlockId] = useState();
  const setIsVisible = useSetRecoilState(isSideBarOpen);
  const selectedPlot = useRecoilValue(selectedPlotState);

  const prevBlocks = usePrevious(blocks);

  // Update the database whenever blocks change
  useEffect(() => {
    if (prevBlocks && prevBlocks !== blocks) {
      updatePage(blocks, id);
    }
  }, [blocks, prevBlocks]);

  // Handling the cursor and focus on adding and deleting blocks
  useEffect(() => {
    // If a new block was added, move the caret to it
    if (prevBlocks && prevBlocks.length + 1 === blocks.length) {
      const nextBlockPosition = blocks.map((b) => b._id).indexOf(currentBlockId) + 1 + 1;
      const nextBlock = document.querySelector(`[data-position="${nextBlockPosition}"]`);
      if (nextBlock) {
        (nextBlock as any).focus();
      }
    }
    // If a block was deleted, move the caret to the end of the last block
    if (prevBlocks && prevBlocks.length - 1 === blocks.length) {
      const lastBlockPosition = prevBlocks.map((b) => b._id).indexOf(currentBlockId);
      const lastBlock = document.querySelector(`[data-position="${lastBlockPosition}"]`);
      if (lastBlock) {
        setCaretToEnd(lastBlock as any);
      }
    }
  }, [blocks, prevBlocks, currentBlockId]);

  const updateBlockHandler = (currentBlock: any) => {
    const index = blocks.map((b) => b._id).indexOf(currentBlock.id);
    const oldBlock = blocks[index];
    const updatedBlocks = [...blocks];
    updatedBlocks[index] = {
      ...updatedBlocks[index],
      tag: currentBlock.tag,
      html: currentBlock.html,
      imageUrl: currentBlock.imageUrl,
    };
    setBlocks(updatedBlocks);
    // If the image has been changed, we have to delete the
    // old image file on the server
    if (oldBlock.imageUrl && oldBlock.imageUrl !== currentBlock.imageUrl) {
      deleteImage(oldBlock.imageUrl);
    }
  };

  const addBlockHandler = (currentBlock: any) => {
    setCurrentBlockId(currentBlock.id);
    const index = blocks.map((b) => b._id).indexOf(currentBlock.id);
    const updatedBlocks = [...blocks];
    const newBlock = { _id: objectId(), tag: 'p', html: '', imageUrl: '' };
    updatedBlocks.splice(index + 1, 0, newBlock);
    updatedBlocks[index] = {
      ...updatedBlocks[index],
      tag: currentBlock.tag,
      html: currentBlock.html,
      imageUrl: currentBlock.imageUrl,
    };
    setBlocks(updatedBlocks);
  };

  const deleteBlockHandler = (currentBlock: any) => {
    if (blocks.length > 1) {
      setCurrentBlockId(currentBlock.id);
      const index = blocks.map((b) => b._id).indexOf(currentBlock.id);
      const deletedBlock = blocks[index];
      const updatedBlocks = [...blocks];
      updatedBlocks.splice(index, 1);
      setBlocks(updatedBlocks);
      // If the deleted block was an image block, we have to delete
      // the image file on the server
      if (deletedBlock.tag === 'img' && deletedBlock.imageUrl) {
        deleteImage(deletedBlock.imageUrl);
      }
    }
  };

  const onDragEndHandler = (result: DropResult) => {
    const { destination, source } = result;

    // If we don't have a destination (due to dropping outside the droppable)
    // or the destination hasn't changed, we change nothing
    if (!destination || destination.index === source.index) {
      return;
    }

    const updatedBlocks = [...blocks];
    const removedBlocks = updatedBlocks.splice(source.index - 1, 1);
    updatedBlocks.splice(destination.index - 1, 0, removedBlocks[0]);
    setBlocks(updatedBlocks);
  };

  const isNewPublicPage = router.query.public === 'true';
  return (
    <EditablePageWrapper>
      {isNewPublicPage && (
        <Notice dismissible>
          <h4>Hey 👋 You just created a public page.</h4>
          <p>It will be automatically deleted after 24 hours.</p>
        </Notice>
      )}
      <DragDropContext onDragEnd={onDragEndHandler}>
        <Droppable droppableId={id}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {blocks.map((block) => {
                const position = blocks.map((b) => b._id).indexOf(block._id) + 1;
                return (
                  <EditableBlock
                    key={block._id}
                    position={position}
                    id={block._id}
                    tag={block.tag}
                    html={block.html}
                    imageUrl={block.imageUrl}
                    pageId={id}
                    addBlock={addBlockHandler}
                    deleteBlock={deleteBlockHandler}
                    updateBlock={updateBlockHandler}
                    setIsVisible={setIsVisible}
                    selectedPlot={selectedPlot}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </EditablePageWrapper>
  );
};

export default EditablePage;
