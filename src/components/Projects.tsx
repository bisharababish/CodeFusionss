// src/components/Projects.tsx
import React, { useState, useEffect } from 'react';
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

const SlideshowContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
`;

const SlideIndicators = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 0.75rem;
`;

const Indicator = styled.div<{ active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.active ? 'var(--primary-color)' : 'rgba(255, 255, 255, 0.3)'};
  cursor: pointer;
  transition: all 0.3s ease;
`;

const ProjectCard = styled.div`
  background-color: rgba(15, 15, 26, 0.5);
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  height: 500px;
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 280px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
`;

const ProjectInfo = styled.div`
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  
  h3 {
    margin-bottom: 0.75rem;
    font-size: 1.5rem;
  }
  
  p {
    font-size: 1rem;
    opacity: 0.8;
    margin-bottom: 1rem;
    flex-grow: 1;
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

const NavigationButtons = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
`;

const NavButton = styled.button`
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  pointer-events: auto;
  
  &:hover {
    background-color: var(--primary-color);
  }
`;

interface ProjectsProps {
  limit?: number;
  autoplayInterval?: number;
}

const Projects: React.FC<ProjectsProps> = ({ limit, autoplayInterval = 4000 }) => {
  const projects: Project[] = [
    {
      id: 1,
      title: 'Robotics Programming',
      description: 'Programmed and built a robot for a competition using Python and Arduino.',
      image: '/project1.jpg',
      technologies: ['Python', 'Arduino', 'OpenCV'],
      githubLink: 'https://github.com/code-fusion/robotics-project'
    },
    {
      id: 2,
      title: 'Buck-to-buck converter',
      description: 'PCB design for lowering high voltage efficiently.',
      image: '/project2.jpg',
      technologies: ['PCB Design', 'Electronics', 'Circuit Analysis'],
      githubLink: 'https://github.com/code-fusion/buck-converter'
    },
    {
      id: 3,
      title: 'Job-Posting Website',
      description: 'Maharat website for job-postings using React and Node.js.',
      image: '/project3.jpg',
      technologies: ['React', 'Node.js', 'MongoDB'],
      link: 'https://maharat-jobs.com',
      githubLink: 'https://github.com/code-fusion/job-posting-site'
    },
    {
      id: 4,
      title: 'Smart Home System',
      description: 'IoT-based home automation system using Raspberry Pi and sensors.',
      image: '/project4.jpg',
      technologies: ['Raspberry Pi', 'IoT', 'Python', 'MQTT'],
      githubLink: 'https://github.com/code-fusion/smart-home'
    },
    {
      id: 5,
      title: 'Mobile Learning App',
      description: 'Educational application for mobile devices with interactive lessons.',
      image: '/project5.jpg',
      technologies: ['React Native', 'Firebase', 'Redux'],
      link: 'https://edu-mobile-app.com',
      githubLink: 'https://github.com/code-fusion/mobile-learning'
    }
  ];

  // Use the limit prop if provided
  const displayedProjects = limit ? projects.slice(0, limit) : projects;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % displayedProjects.length);
      }
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [isPaused, displayedProjects.length, autoplayInterval]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + displayedProjects.length) % displayedProjects.length
    );
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), autoplayInterval);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % displayedProjects.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), autoplayInterval);
  };

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), autoplayInterval);
  };

  return (
    <ProjectsSection id="projects">
      <div className="container">
        <SectionHeader>
          <h2>Our Projects</h2>
          <p>Here are some of the projects we've worked on.</p>
        </SectionHeader>

        <SlideshowContainer
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <ProjectCard>
            <ProjectImage>
              <img
                src={displayedProjects[currentIndex].image}
                alt={displayedProjects[currentIndex].title}
              />
            </ProjectImage>
            <ProjectInfo>
              <h3>{displayedProjects[currentIndex].title}</h3>
              <p>{displayedProjects[currentIndex].description}</p>
              <TechTags>
                {displayedProjects[currentIndex].technologies.map((tech, index) => (
                  <TechTag key={index}>{tech}</TechTag>
                ))}
              </TechTags>
              <ProjectLinks>
                {displayedProjects[currentIndex].link && (
                  <a href={displayedProjects[currentIndex].link} target="_blank" rel="noopener noreferrer">
                    <i className="fas fa-external-link-alt"></i> View Live
                  </a>
                )}
                {displayedProjects[currentIndex].githubLink && (
                  <a href={displayedProjects[currentIndex].githubLink} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github"></i> Source Code
                  </a>
                )}
              </ProjectLinks>
            </ProjectInfo>
          </ProjectCard>

          <NavigationButtons>
            <NavButton onClick={handlePrev}>
              <i className="fas fa-chevron-left"></i>
            </NavButton>
            <NavButton onClick={handleNext}>
              <i className="fas fa-chevron-right"></i>
            </NavButton>
          </NavigationButtons>

          <SlideIndicators>
            {displayedProjects.map((_, index) => (
              <Indicator
                key={index}
                active={index === currentIndex}
                onClick={() => handleIndicatorClick(index)}
              />
            ))}
          </SlideIndicators>
        </SlideshowContainer>
      </div>
    </ProjectsSection>
  );
};

export default Projects;