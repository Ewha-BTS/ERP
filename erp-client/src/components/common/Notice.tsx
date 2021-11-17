import { useState } from 'react';
import styled, { CSSProperties } from 'styled-components';

const NoticeWrapper = styled.div`
  position: relative;
  border-radius: 0.5rem;
  background: #fffaf0;
  padding: 2rem 3rem 2rem 1rem;
  width: calc(100% - 1rem);
  height: 200px;
  color: #975a16;

  h3 {
    margin: 0 0 1rem;
  }

  &.errorNotice {
    margin: 1rem;
    background: #ffe6e6;
    color: #9b2c2c;
  }

  &.successNotice {
    background: #e5ffe5;
    color: #276749;
  }

  &.miniNotice {
    padding: 1rem;
  }

  &.notDisplayed {
    display: none;
  }
`;

const DismissWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;

  > img {
    width: 100%;
    max-width: 1rem;
    height: 100%;
    max-height: 1rem;

    :hover {
      cursor: pointer;
    }
  }
`;

interface NoticeProps {
  children: any;
  status?: string;
  mini?: boolean;
  dismissible?: boolean;
  style?: CSSProperties;
}

const Notice = ({ children, status, mini, dismissible, style }: NoticeProps) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <NoticeWrapper
      style={{ ...style }}
      className={[
        isVisible !== true && 'notDisplayed',
        status === 'SUCCESS' && 'successNotice',
        status === 'ERROR' && 'errorNotice',
        mini && 'miniNotice',
      ].join(' ')}
    >
      {dismissible && (
        <DismissWrapper role='button' tabIndex={0} onClick={() => setIsVisible(false)}>
          <img src='../../assets/icons/Close.svg' alt='close icon' />
        </DismissWrapper>
      )}
      {children}
    </NoticeWrapper>
  );
};

export default Notice;
