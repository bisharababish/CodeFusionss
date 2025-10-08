// src/pages/AboutPage.tsx
import React from 'react';
import styled from 'styled-components';
import About from '../components/About';

const PageContainer = styled.div`
  /* No padding needed - sections handle their own spacing */
`;

const AboutPage: React.FC = () => {
    return (
        <PageContainer>
            <About />
        </PageContainer>
    );
};

export default AboutPage;