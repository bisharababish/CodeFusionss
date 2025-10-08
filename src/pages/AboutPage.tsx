// src/pages/AboutPage.tsx
import React from 'react';
import styled from 'styled-components';
import About from '../components/About';
import Team from '../components/Team';

const PageContainer = styled.div`
  /* No padding needed - sections handle their own spacing */
`;

const AboutPage: React.FC = () => {
    return (
        <PageContainer>
            <About />
            <Team />
        </PageContainer>
    );
};

export default AboutPage;