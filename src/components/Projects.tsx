import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Project } from '../types';
import BlogImage from './projectspics/blog.png';
import MRIImage from './projectspics/mri.png';
import SnakeImage from './projectspics/snake.png';
import TravelImage from './projectspics/travel.png';
import DistrubitionImage from './projectspics/Distribution.png';

const ProjectsSection = styled.section`
  padding: 6rem 0;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  
  h2 {
    font-size: clamp(1.8rem, 4vw, 2.5rem);
    margin-bottom: 0.2rem;
  }
  
  p {
    max-width: 600px;
    margin: 0 auto;
    opacity: 0.8;
  }
`;

const slideIn = keyframes`
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-100%);
    opacity: 0;
  }
`;

const SlideshowContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
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

const ProjectCard = styled.div<{ isActive: boolean }>`
  background-color: rgba(15, 15, 26, 0.5);
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  height: 700px;
  animation: ${props => props.isActive ? slideIn : slideOut} 0.5s ease-in-out;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid var(--primary-color);
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
  margin: 10px auto;
`;

const LoadingText = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  margin-bottom: 10px;
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.1);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
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
      title: 'Personal Blog Page',
      description: 'A personal Blog that consists of random generated poems or blogs that you can read about when you press Continue Reading.',
      image: BlogImage,
      technologies: ['HTML', 'CSS'],
      githubLink: 'https://github.com/bisharababish/Personal-Blog'
    },
    {
      id: 2,
      title: 'MRI Brain Tumor Detection',
      description: 'This AI-powered application analyzes brain MRI scans to detect tumors using a CNN model built with PyTorch, ensuring high accuracy in image analysis.',
      image: MRIImage,
      technologies: ['JavaScript', 'HTML', 'CSS'],
      link: 'https://mridetection.netlify.app/',
      githubLink: 'https://github.com/bisharababish/MRI-Brain-Tumor'
    },
    {
      id: 3,
      title: 'Snake Game',
      description: 'An advanced, feature-rich implementation of the classic Snake game with modern graphics, power-ups, and progression mechanics.',
      image: SnakeImage,
      technologies: ['JavaScript', 'CSS', 'HTML'],
      link: 'https://slitherzone.netlify.app/',
      githubLink: 'https://github.com/bisharababish/Snake-Game'
    },
    {
      id: 4,
      title: 'Travel App',
      description: 'This project involves building a personal blog website from scratch using HTML and CSS, focusing on custom design, layout, and styling while ensuring proper file structure and code formatting.',
      image: TravelImage,
      technologies: ['JavaScript', 'SCSS', 'HTML'],
      githubLink: 'https://github.com/bisharababish/TravelApp'
    },
    {
      id: 5,
      title: 'Early Prediction of Kidney Dysfunction in Diabetic Patients',
      description: 'This project investigates the early prediction of kidney dysfunction in diabetic patients by analyzing Fasting Blood Sugar and Creatinine levels using machine learning models. The study leverages a dataset consisting of 499 samples with 13 features, undergoing rigorous preprocessing and analysis to improve model performance.',
      image: DistrubitionImage,
      technologies: ['Python'],
      githubLink: 'https://github.com/judahsleibi34/Early-Prediction-of-Kidney-Dysfunction-in-Diabetic-Patients'
    },
    {
      id: 6,
      title: 'More Projects to come!',
      description: 'Eearly Production and more developed applications, websites soon!',
      image: "",
      technologies: ['Soon'],
    }
  ];

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
          <ProjectCard isActive={true}>
            <ProjectImage>
              {displayedProjects[currentIndex].image ? (
                <img
                  src={displayedProjects[currentIndex].image}
                  alt={displayedProjects[currentIndex].title}
                />
              ) : (
                <>
                  <LoadingText>Loading...</LoadingText>
                  <LoadingSpinner />
                </>
              )}
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