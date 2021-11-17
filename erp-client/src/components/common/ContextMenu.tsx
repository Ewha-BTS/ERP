import { useRef } from 'react';
import styled from 'styled-components';

import { useOnClickOutside } from '../../hooks/';
import { ItemType, PositionType } from '../../lib/type';

const MenuBarWrapper = styled.div<{ ref: any }>`
  display: flex;
  position: absolute;
  right: -1rem;
  bottom: 3rem;
  flex-direction: column;
  z-index: 11;
  width: auto;
  min-width: 6rem;
  height: auto;
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  box-shadow: var(--box-shadow);
  background: white;
`;

const ItemWrapper = styled.button`
  border-bottom: 2px solid #e3e3e3;
  padding: 0.5rem 1rem;
  font-family: var(--accent);
  font-size: 0.875rem;
  font-weight: 700;

  :last-of-type {
    border-bottom: none;
  }

  :hover,
  :focus {
    background: var(--tertiary);
    cursor: pointer;
  }

  :first-of-type {
    border: none;
    border-bottom: 2px solid #e3e3e3;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }

  :last-of-type {
    border: none;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }
`;

const SelectedTagWrapper = styled.div`
  border-radius: 0.5rem;
  background: var(--tertiary);
`;

interface ContextMenuProps {
  menuItems: ItemType[];
  closeAction: () => void;
  isTopNavigation?: boolean;
}

const ContextMenu = ({ menuItems, closeAction, isTopNavigation = false }: ContextMenuProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, closeAction);

  let position: PositionType = { bottom: '3rem', right: '0' };
  if (isTopNavigation) {
    position = { top: '2rem', right: '0' };
  }

  return (
    <MenuBarWrapper ref={ref} style={{ ...position }}>
      <MenuWrapper>
        {menuItems.map((item: ItemType, key: number) => {
          return (
            <ItemWrapper key={key} tabIndex={0} onClick={item.action}>
              {item.label}
            </ItemWrapper>
          );
        })}
      </MenuWrapper>
    </MenuBarWrapper>
  );
};

export default ContextMenu;
