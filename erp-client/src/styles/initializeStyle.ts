import { css } from 'styled-components';

const initializeStyle = css`
  * {
    box-sizing: border-box;
  }

  html {
    width: 100%;
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    color: var(--text);
    font-family: var(--regular);
    font-size: 1rem;
  }

  #__next {
    height: 100%;
  }

  #layoutRoot {
    display: grid;
    position: relative;
    grid-template-rows: auto 1fr auto;
    justify-items: center;
    min-height: 100%;
  }

  h1 {
    margin-bottom: 1.25rem;
    font-size: 2rem;
  }

  h2 {
    margin-top: 0;
    margin-bottom: 0.25rem;
    font-size: 1.5rem;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 0.125rem;
    font-size: 1.25rem;
  }

  h4 {
    margin-top: 0;
    margin-bottom: 0.25rem;
    font-size: 1.125rem;
  }

  p {
    margin-top: 0;
    margin-bottom: 0.125rem;
    font-size: 1rem;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  form {
    button {
      margin: 2rem 1rem 3rem 0;
      border: none;
      border-radius: 0.5rem;
      background: var(--secondary);
      padding: 0 1rem;
      width: auto;
      min-width: 9rem;
      height: 2.6rem;
      color: var(--primary);
      color: var(--primary);
      font-family: var(--accent);
      font-size: 1rem;
      font-weight: 700;
    }
    button:first-of-type {
      background: var(--primary);
      color: #ffffff;
    }
    button:hover,
    button:focus {
      cursor: pointer;
    }
  }

  .block {
    padding: 0.25rem;
    -webkit-user-select: text;
    user-select: text;
  }

  .block:focus,
  .isDragging,
  .blockSelected {
    outline-color: var(--tertiary);
    background: var(--tertiary);
    & ~ .dragHandle {
      opacity: 1;
    }
  }

  .placeholder {
    color: rgba(72, 72, 72, 0.25);
  }

  .draggable .block {
    display: inline-block;
    width: calc(100% - 1rem);
  }

  .draggable:hover {
    .block {
      outline-color: var(--tertiary);
      background: #fafafa;
    }
    .dragHandle {
      opacity: 1;
    }
  }

  .dragHandle {
    display: inline-block;
    opacity: 0;
    width: 1rem;
    img {
      display: block;
      margin: auto;
    }
  }

  .image {
    display: inline-block;
    padding: 0.25rem;
    width: calc(100% - 1rem);
    img {
      display: block;
      margin: 0 auto;
      max-width: 100%;
      max-height: 600px;
    }
  }

  .blockSelected.image {
    opacity: 0.75;
  }

  .fileInputLabel {
    display: block;
    padding: 0.5rem 0.25rem;
    letter-spacing: 0.5px;
    color: #888888;
    font-size: 0.875rem;
  }
`;

export default initializeStyle;
