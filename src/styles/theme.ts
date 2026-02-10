import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  body: '#ffffff',
  text: '#000000',
  primary: '#0070f3',
};

export const darkTheme = {
  body: '#121212',
  text: '#ffffff',
  primary: '#bb86fc',
};

export const GlobalStyles = createGlobalStyle<{ theme: typeof lightTheme }>`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`;
