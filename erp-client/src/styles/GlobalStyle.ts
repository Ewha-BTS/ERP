import { createGlobalStyle } from 'styled-components';

import initializeStyle from './initializeStyle';
import styleVariables from './styleVariables';

const GlobalStyle = createGlobalStyle`
  ${initializeStyle}
  ${styleVariables}
`;

export default GlobalStyle;
