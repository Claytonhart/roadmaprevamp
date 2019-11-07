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
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Helvetica Neue", Helvetica, Arial, sans-serif;
    color: #172b4d;  
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 1.42857142857143;
  }

  h2{
    font-size: 40px;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 20px;
  }
  
  h3 {
    line-height: 1.2;
    font-weight: 500;
    letter-spacing: -.008em;
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
    /* color: currentColor; */
    color: #0052cc;
    text-decoration: none;
  }
  
  a:hover {
    color: #0065ff;
    text-decoration: underline;
}
`;
