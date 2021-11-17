import styled from 'styled-components';

const MenuBarWrapper = styled.div<{ x: number | null; y: number | null }>`
  position: absolute;
  top: ${({ y }) => y};
  left: ${({ x }) => x};
  z-index: 11;
  width: auto;
  height: 2.5rem;
`;

const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 0.5rem;
  box-shadow: $box-shadow;
  background: white;
  width: auto;
  height: 100%;
`;

const MenuItemWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid $secondary;
  padding: 0.25rem 0.75rem;
  width: auto;
  min-width: 4rem;
  height: 100%;
  font-family: $accent;
  font-size: 0.875rem;
  font-weight: 700;
  img {
    width: 100%;
    max-width: 1rem;
    height: 100%;
    max-height: 1.125rem;
  }

  :last-of-type {
    border-right: none;
  }

  :hover {
    background: $tertiary;
    cursor: pointer;
  }

  :first-of-type:hover {
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
  }

  :last-of-type:hover {
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }
`;

const MENU_WIDTH = 150;
const MENU_HEIGHT = 40;

interface ActionMenuProps {
  position: { x: number | null; y: number | null };
  actions: {
    deleteBlock: () => void;
    turnInto: () => void;
  };
}

const ActionMenu = ({ position, actions }: ActionMenuProps) => {
  const x = position.x ? position.x - MENU_WIDTH / 2 : null;
  const y = position.y ? position.y - MENU_HEIGHT - 10 : null;

  return (
    <MenuBarWrapper x={x} y={y}>
      <MenuWrapper>
        <MenuItemWrapper id='turn-into' role='button' tabIndex={0} onClick={() => actions.turnInto()}>
          Turn into
        </MenuItemWrapper>
        <MenuItemWrapper id='delete' role='button' tabIndex={0} onClick={() => actions.deleteBlock()}>
          <img src='../../assets/icons/Trash.svg' alt='Trash Icon' />
        </MenuItemWrapper>
      </MenuWrapper>
    </MenuBarWrapper>
  );
};

export default ActionMenu;
