// src/components/Projects.tsx
import React from 'react';
import styled from 'styled-components';
import { Project } from '../types';

const ProjectsSection = styled.section`
  padding: 6rem 0;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  
  h2 {
    font-size: clamp(1.8rem, 4vw, 2.5rem);
    margin-bottom: 1rem;
  }
  
  p {
    max-width: 600px;
    margin: 0 auto;
    opacity: 0.8;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const ProjectCard = styled.div`
  background-color: rgba(15, 15, 26, 0.5);
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.05);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  ${ProjectCard}:hover & img {
    transform: scale(1.05);
  }
`;

const ProjectInfo = styled.div`
  padding: 1.5rem;
  
  h3 {
    margin-bottom: 0.75rem;
    font-size: 1.2rem;
  }
  
  p {
    font-size: 0.9rem;
    opacity: 0.8;
    margin-bottom: 1rem;
  }
`;

const TechTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TechTag = styled.span`
  background-color: rgba(108, 92, 231, 0.15);
  color: var(--primary-color);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  
  a {
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    opacity: 0.8;
    transition: all 0.3s ease;
    
    &:hover {
      opacity: 1;
      color: var(--primary-color);
    }
  }
`;

interface ProjectsProps {
  limit?: number;
}

const Projects: React.FC<ProjectsProps> = ({ limit }) => {
  // Sample project data - replace with your actual projects
  const projects: Project[] = [
    {
      id: 1,
      title: 'Robotics Programming',
      description: 'Programmed and built a robot for a competition using Python and Arduino.',
      image: '/project1.jpg', // Replace with your project image
      technologies: ['Python', 'Arduino', 'OpenCV'],
      githubLink: 'https://github.com/code-fusion/robotics-project'
    },
    {
      id: 2,
      title: 'Buck-to-buck converter',
      description: 'PCB design for lowering high voltage efficiently.',
      image: '/project2.jpg', // Replace with your project image
      technologies: ['PCB Design', 'Electronics', 'Circuit Analysis'],
      githubLink: 'https://github.com/code-fusion/buck-converter'
    },
    {
      id: 3,
      title: 'Job-Posting Website',
      description: 'Maharat website for job-postings using React and Node.js.',
      image: '/project3.jpg', // Replace with your project image
      technologies: ['React', 'Node.js', 'MongoDB'],
      link: 'https://maharat-jobs.com',
      githubLink: 'https://github.com/code-fusion/job-posting-site'
    },
  ];

  const displayedProjects = limit ? projects.slice(0, limit) : projects;

  return (
    <ProjectsSection id="projects">
      <div className="container">
        <SectionHeader>
          <h2>Our Current Projects</h2>
          <p>Here are some of the projects we've worked on.</p>
        </SectionHeader>

        <ProjectsGrid>
          {displayedProjects.map(project => (
            <ProjectCard key={project.id}>
              <ProjectImage>
                <img src={project.image} alt={project.title} />
              </ProjectImage>
              <ProjectInfo>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <TechTags>
                  {project.technologies.map((tech, index) => (
                    <TechTag key={index}>{tech}</TechTag>
                  ))}
                </TechTags>
                <ProjectLinks>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <i className="fas fa-external-link-alt"></i> View Live
                    </a>
                  )}
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-github"></i> Source Code
                    </a>
                  )}
                </ProjectLinks>
              </ProjectInfo>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </div>
    </ProjectsSection>
  );
};

export default Projects;