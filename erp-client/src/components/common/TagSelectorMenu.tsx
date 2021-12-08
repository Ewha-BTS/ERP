import { matchSorter } from 'match-sorter';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const MenuBarWrapper = styled.div<{ x: number | null; y: number | null; isMenuOutsideOfTopViewport: boolean }>`
  display: flex;
  position: absolute;
  top: ${({ y }) => y};
  left: ${({ x }) => x};
  flex-direction: column;
  justify-content: ${({ isMenuOutsideOfTopViewport }) => (!isMenuOutsideOfTopViewport ? 'flex-end' : 'flex-start')};
  z-index: 11;
  width: 6.875rem;
  height: 9rem;
`;

const MenuWrapper = styled.div`
  border-radius: 0.5rem;
  box-shadow: var(--box-shadow);
  background: white;
`;

const ItemWrapper = styled.div`
  border-bottom: 1px solid var(--secondary);
  padding: 0.5rem 1rem;
  font-family: var(--accent);
  font-size: 0.875rem;
  font-weight: 700;

  .selectedTag {
    border-radius: 0.5rem;
    background: $tertiary;
  }

  :last-of-type {
    border-bottom: none;
  }

  :hover,
  :focus {
    background: var(--tertiary);
    cursor: pointer;
  }

  :first-of-type:hover,
  :first-of-type:focus {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }

  :last-of-type:hover,
  :last-of-type:focus {
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }
`;

const MENU_HEIGHT = 150;
const allowedTags = [
  {
    id: 'page-title',
    tag: 'h1',
    label: 'Page Title',
  },
  {
    id: 'heading',
    tag: 'h2',
    label: 'Heading',
  },
  {
    id: 'subheading',
    tag: 'h3',
    label: 'Subheading',
  },
  {
    id: 'paragraph',
    tag: 'p',
    label: 'Paragraph',
  },
  {
    id: 'image',
    tag: 'img',
    label: 'Plot',
  },
];

interface TagSelectorMenuProps {
  position: { x: number | null; y: number | null };
  closeMenu: () => void;
  handleSelection: (tag: string) => void;
}

const TagSelectorMenu = ({ position, closeMenu, handleSelection }: TagSelectorMenuProps) => {
  const [tagList, setTagList] = useState(allowedTags);
  const [selectedTag, setSeletedTag] = useState(0);
  const [command, setCommand] = useState('');

  const isMenuOutsideOfTopViewport = position.y ? position.y - MENU_HEIGHT < 0 : false;
  const y = position.y ? (!isMenuOutsideOfTopViewport ? position.y - MENU_HEIGHT : position.y + MENU_HEIGHT / 3) : null;
  const x = position.x ? position.x : null;

  useEffect(() => {
    setTagList(matchSorter(allowedTags, command, { keys: ['tag'] }));
  }, [command]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // call the appropriate tag
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSelection(tagList[selectedTag].tag);
      }
      // next tag
      else if (e.key === 'Tab' || e.key === 'ArrowDown') {
        e.preventDefault();
        const newSelectedTag = selectedTag === tagList.length - 1 ? 0 : selectedTag + 1;
        setSeletedTag(newSelectedTag);
      }
      // tag before
      else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const newSelectedTag = selectedTag === 0 ? tagList.length - 1 : selectedTag - 1;
        setSeletedTag(newSelectedTag);
      } else if (e.key === 'Backspace') {
        // if still managing command
        if (command) {
          setCommand(command.slice(0, -1));
        } else {
          closeMenu();
        }
      }
      // typing command
      else {
        setCommand(command + e.key);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    // after all the changes, remove event and finish
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [tagList, selectedTag]);

  return (
    <MenuBarWrapper x={x} y={y} isMenuOutsideOfTopViewport={isMenuOutsideOfTopViewport}>
      <MenuWrapper>
        {tagList.map((tag, key) => {
          return (
            <ItemWrapper
              data-tag={tag.tag}
              className={tagList.indexOf(tag) === selectedTag ? 'selectedTag' : ''}
              key={key}
              role='button'
              tabIndex={0}
              onClick={() => handleSelection(tag.tag)}
            >
              {tag.label}
            </ItemWrapper>
          );
        })}
      </MenuWrapper>
    </MenuBarWrapper>
  );
};

export default TagSelectorMenu;
