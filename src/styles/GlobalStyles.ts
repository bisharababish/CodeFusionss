// src/styles/GlobalStyles.ts
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: #6c5ce7;
    --secondary-color: #a29bfe;
    --dark-bg: #0f0f1a;
    --darker-bg: #08080f;
    --light-text: #e6e6e6;
    --light-accent: #ddd6f3;


  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none; 
    -ms-user-select: none; 
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: var(--dark-bg);
    color: var(--light-text);
    line-height: 1.6;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
  }

  .container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .button {
    background-color: var(--primary-color);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 5px;
    font-weight: 600;
    transition: all 0.3s ease;
    display: inline-block;
  }

  .button:hover {
    background-color: var(--secondary-color);
    transform: translateY(-2px);
  }

  .accent-text {
    color: var(--primary-color);
  }

  mark {
  background-color: rgba(255, 255, 0, 0.5);
  color: inherit;
  padding: 0 2px;
  border-radius: 2px;
}
`;


export default GlobalStyles;