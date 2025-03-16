// src/components/LoadingSpinner.tsx
import React from 'react';
import styled, { keyframes } from 'styled-components';

// Animation for the spinner
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Styled spinner component
const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3); /* Light gray border */
  border-radius: 50%; /* Makes it circular */
  border-top: 4px solid var(--primary-color); /* Colored top border */
  width: 40px; /* Size of the spinner */
  height: 40px;
  animation: ${spin} 1s linear infinite; /* Apply the spin animation */
  margin: 20px auto; /* Center the spinner */
`;

const LoadingSpinner: React.FC = () => {
    return <Spinner />;
};

export default LoadingSpinner;