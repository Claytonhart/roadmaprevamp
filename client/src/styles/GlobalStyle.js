import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *,
  *::after,
  *::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
  }

  html,
  body {
    height: 100%;
  }

  body {
    box-sizing: border-box;
    color: #272838;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  h2{
    color: ${props => props.theme.primary.grey};
    font-size: 40px;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 20px;
    }

  input {
    border: none;
    outline: none;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  button {
    border: none;
    outline: none;
    background-color: transparent;
  }

  #root {
    height: 100%;
    width: 100%;
  }

  a {
    color: currentColor;
    text-decoration: none;
  }
  
  a:hover {
    cursor: pointer;
  }
`;
