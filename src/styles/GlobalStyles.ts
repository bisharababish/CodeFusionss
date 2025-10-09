// src/styles/GlobalStyles.ts
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    /* Background Colors */
    --website-bg: #0A0A0A;
    --cards-bg: #1A1A1A;
    
    /* Text Colors */
    --main-text: #F4EFEA;
    --secondary-text: #B0B6C1;
    --error-text: #FF4F8B;
    
    /* Button Colors */
    --primary-btn-bg: linear-gradient(135deg, #4B2E83, #2F80ED);
    --primary-btn-text: #F4EFEA;
    --primary-btn-hover: #2F80ED;
    --secondary-btn-bg: #6C4CC4;
    --secondary-btn-text: #F4EFEA;
    --secondary-btn-hover: #00C2FF;
    
    /* Link Colors */
    --link-default: #00C2FF;
    --link-hover: #2F80ED;
    
    /* Border/Divider Colors */
    --border-color: #B0B6C1;
    
    /* Alert Colors */
    --error-bg: #FF4F8B;
    --error-text: #F4EFEA;


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
    background-color: var(--website-bg);
    color: var(--main-text);
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
    background: var(--primary-btn-bg);
    color: var(--primary-btn-text);
    padding: 0.75rem 1.5rem;
    border-radius: 5px;
    font-weight: 600;
    transition: all 0.3s ease;
    display: inline-block;
    border: none;
    cursor: pointer;
  }

  .button:hover {
    background: var(--primary-btn-hover);
    transform: translateY(-2px);
  }

  .accent-text {
    color: var(--link-default);
  }

  mark {
  background-color: rgba(255, 255, 0, 0.5);
  color: inherit;
  padding: 0 2px;
  border-radius: 2px;
}
`;


export default GlobalStyles;