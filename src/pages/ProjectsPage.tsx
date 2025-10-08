// src/pages/ProjectsPage.tsx
import React from 'react';
import styled from 'styled-components';
import Projects from '../components/Projects';

const PageContainer = styled.div`
  /* No padding needed - sections handle their own spacing */
`;

const ProjectsPage: React.FC = () => {
    return (
        <PageContainer>
            <Projects />
        </PageContainer>
    );
};

export default ProjectsPage;
