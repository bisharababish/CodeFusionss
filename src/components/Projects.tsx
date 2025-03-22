import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Project } from '../types';
import BlogImage from './projectspics/blog.png';
import MRIImage from './projectspics/mri.png';
import SnakeImage from './projectspics/snake.png';
import TravelImage from './projectspics/travel.png';
import DistrubitionImage from './projectspics/Distribution.png';

const breakpoints = {
  smallMobile: '320px',
  mobile: '480px',
  largeMobile: '600px',
  tablet: '768px',
  laptop: '1024px'
};

const media = {
  smallMobile: `@media (max-width: ${breakpoints.smallMobile})`,
  mobile: `@media (max-width: ${breakpoints.mobile})`,
  largeMobile: `@media (max-width: ${breakpoints.largeMobile})`,
  tablet: `@media (max-width: ${breakpoints.tablet})`,
  laptop: `@media (max-width: ${breakpoints.laptop})`
};

const ProjectsSection = styled.section`
  padding: 6rem 0;
  
  ${media.laptop} {
    padding: 6rem 0;
  }
  
  ${media.tablet} {
    padding: 5rem 0;
  }
  
  ${media.largeMobile} {
    padding: 3.2rem 0;
  }
  
  ${media.mobile} {
    padding: 3.2rem 0.5rem;
  }
  
  ${media.smallMobile} {
    padding: 2rem 0.5rem;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  
  ${media.tablet} {
    margin-bottom: 3rem;
  }
  
  ${media.mobile} {
    margin-bottom: 2rem;
  }
  
  h2 {
    font-size: 2.5rem;
    margin-bottom: 0.2rem;
    
    ${media.tablet} {
      font-size: 2.2rem;
    }
    
    ${media.largeMobile} {
      font-size: 1.8rem;
    }
    
    ${media.mobile} {
      font-size: 1.6rem;
    }
    
    ${media.smallMobile} {
      font-size: 1.4rem;
    }
  }
  
  p {
    max-width: 600px;
    margin: 0 auto;
    opacity: 0.8;
    font-size: 1rem;
    
    ${media.tablet} {
      max-width: 90%;
    }
    
    ${media.mobile} {
      font-size: 0.9rem;
      max-width: 95%;
    }
    
    ${media.smallMobile} {
      font-size: 0.85rem;
    }
  }
`;

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
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
  
  ${media.tablet} {
    max-width: 90%;
  }
  
  ${media.largeMobile} {
    max-width: 95%;
  }
  
  ${media.mobile} {
    max-width: 98%;
  }
`;

const SlideIndicators = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 0.75rem;
  
  ${media.tablet} {
    margin-top: 1.5rem;
    gap: 0.6rem;
  }
  
  ${media.mobile} {
    margin-top: 1.2rem;
    gap: 0.5rem;
  }
  
  ${media.smallMobile} {
    margin-top: 1rem;
    gap: 0.4rem;
  }
`;

const Indicator = styled.div<{ active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.active ? 'var(--primary-color)' : 'rgba(255, 255, 255, 0.3)'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${media.tablet} {
    width: 9px;
    height: 9px;
  }
  
  ${media.mobile} {
    width: 8px;
    height: 8px;
  }
  
  ${media.smallMobile} {
    width: 6px;
    height: 6px;
  }
`;

const ProjectCard = styled.div<{ isActive: boolean }>`
  background-color: rgba(15, 15, 26, 0.5);
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  height: auto;
  min-height: 500px;
  animation: ${props => props.isActive ? slideIn : slideOut} 0.5s ease-in-out;
  
  ${media.tablet} {
    min-height: 450px;
    border-radius: 8px;
  }
  
  ${media.largeMobile} {
    min-height: 420px;
  }
  
  ${media.mobile} {
    min-height: 380px;
    border-radius: 6px;
  }
  
  ${media.smallMobile} {
    min-height: 350px;
  }
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid var(--primary-color);
  width: 40px;
  height: 40px;
  animation: ${bounce} 0.8s infinite ease-in-out;
  margin: 10px auto;
  
  ${media.tablet} {
    width: 35px;
    height: 35px;
    border-width: 3px;
    border-top-width: 3px;
  }
  
  ${media.mobile} {
    width: 30px;
    height: 30px;
  }
  
  ${media.smallMobile} {
    width: 25px;
    height: 25px;
  }
`;

const LoadingText = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  margin-bottom: 10px;
  animation: ${bounce} 0.8s infinite ease-in-out;
  
  ${media.mobile} {
    font-size: 0.9rem;
    margin-bottom: 8px;
  }
  
  ${media.smallMobile} {
    font-size: 0.8rem;
    margin-bottom: 6px;
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 300px;
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
  
  ${media.tablet} {
    height: 250px;
  }
  
  ${media.largeMobile} {
    height: 220px;
  }
  
  ${media.mobile} {
    height: 180px;
  }
  
  ${media.smallMobile} {
    height: 150px;
  }
`;

const ProjectInfo = styled.div`
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  
  ${media.tablet} {
    padding: 1.25rem;
  }
  
  ${media.mobile} {
    padding: 1rem;
  }
  
  ${media.smallMobile} {
    padding: 0.8rem;
  }
  
  h3 {
    margin-bottom: 0.75rem;
    font-size: 1.5rem;
    
    ${media.tablet} {
      font-size: 1.4rem;
      margin-bottom: 0.6rem;
    }
    
    ${media.largeMobile} {
      font-size: 1.3rem;
    }
    
    ${media.mobile} {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }
    
    ${media.smallMobile} {
      font-size: 1.1rem;
      margin-bottom: 0.4rem;
    }
  }
  
  p {
    font-size: 1rem;
    opacity: 0.8;
    margin-bottom: 1rem;
    flex-grow: 1;
    
    ${media.tablet} {
      font-size: 0.95rem;
    }
    
    ${media.mobile} {
      font-size: 0.9rem;
      margin-bottom: 0.8rem;
      line-height: 1.4;
    }
    
    ${media.smallMobile} {
      font-size: 0.85rem;
      margin-bottom: 0.7rem;
      /* Limit description to 4 lines on smallest screens */
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
`;

const TechTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  
  ${media.tablet} {
    gap: 0.45rem;
    margin-bottom: 1.25rem;
  }
  
  ${media.mobile} {
    gap: 0.4rem;
    margin-bottom: 1rem;
  }
  
  ${media.smallMobile} {
    gap: 0.3rem;
    margin-bottom: 0.8rem;
  }
`;

const TechTag = styled.span`
  background-color: rgba(108, 92, 231, 0.15);
  color: var(--primary-color);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  
  ${media.tablet} {
    padding: 0.22rem 0.45rem;
  }
  
  ${media.mobile} {
    padding: 0.2rem 0.4rem;
    font-size: 0.75rem;
    border-radius: 3px;
  }
  
  ${media.smallMobile} {
    padding: 0.15rem 0.35rem;
    font-size: 0.7rem;
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  
  ${media.tablet} {
    gap: 0.9rem;
  }
  
  ${media.largeMobile} {
    gap: 0.8rem;
  }
  
  ${media.mobile} {
    gap: 0.7rem;
    justify-content: space-between;
    padding-bottom: 10px;
    
    a {
      flex: 0 0 calc(50% - 0.35rem);
      text-align: center;
    }
  }
  
  ${media.smallMobile} {
    gap: 0.5rem;
    
    a {
      flex: 0 0 calc(50% - 0.25rem);
    }
  }
`;

const ProjectLink = styled.a`
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  opacity: 0.8;
  transition: all 0.3s ease;
  z-index: 30; /* Higher z-index to ensure it's clickable */
  position: relative;
  
  ${media.tablet} {
    font-size: 0.85rem;
    gap: 0.45rem;
  }
  
  ${media.mobile} {
    font-size: 0.8rem;
    gap: 0.4rem;
    justify-content: center;
    padding: 0.45rem 0;
    background-color: rgba(108, 92, 231, 0.1);
    border-radius: 4px;
  }
  
  ${media.smallMobile} {
    font-size: 0.75rem;
    gap: 0.3rem;
    padding: 0.4rem 0;
  }
  
  &:hover, &:active {
    opacity: 1;
    color: var(--primary-color);
    ${media.mobile} {
      background-color: rgba(108, 92, 231, 0.2);
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
  padding: 0 10px;
  
  ${media.mobile} {
    padding: 0 5px;
    /* Move buttons upward on mobile to avoid conflicts with links */
    top: 35%;
  }
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
  z-index: 10;
  
  ${media.tablet} {
    width: 36px;
    height: 36px;
  }
  
  ${media.largeMobile} {
    width: 34px;
    height: 34px;
  }
  
  ${media.mobile} {
    width: 32px;
    height: 32px;
  }
  
  ${media.smallMobile} {
    width: 28px;
    height: 28px;
  }
  
  &:hover {
    background-color: var(--primary-color);
  }
`;

const TouchContainer = styled.div`
  width: 100%;
  height: 100%;
  touch-action: pan-y;
`;

interface ProjectsProps {
  limit?: number;
  autoplayInterval?: number;
}

const Projects: React.FC<ProjectsProps> = ({ limit, autoplayInterval = 6000 }) => {
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
      description: 'This project investigates the early prediction of kidney dysfunction in diabetic patients by analyzing Fasting Blood Sugar and Creatinine levels using machine learning models.',
      image: DistrubitionImage,
      technologies: ['Python'],
      githubLink: 'https://github.com/judahsleibi34/Early-Prediction-of-Kidney-Dysfunction-in-Diabetic-Patients'
    },
    {
      id: 6,
      title: 'More Projects to come!',
      description: 'Early Production and more developed applications, websites soon!',
      image: "",
      technologies: ['Soon'],
    }
  ];

  const displayedProjects = limit ? projects.slice(0, limit) : projects;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchY, setTouchY] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= parseInt(breakpoints.tablet));
    };

    checkMobile();

    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

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

  // Fixed touch handling
  const handleTouchStart = (e: React.TouchEvent) => {
    // Store the initial touch position
    setTouchStart(e.targetTouches[0].clientX);
    setTouchY(e.targetTouches[0].clientY);
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // Do nothing if we didn't start with a touch
    if (touchStart === null) return;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    // Only handle the swipe if we have a start position
    if (touchStart !== null && touchY !== null) {
      const touchEnd = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;

      // Calculate distances
      const xDist = touchStart - touchEnd;
      const yDist = Math.abs(touchY - touchEndY);

      // Set a minimum swipe distance
      const minSwipeDistance = 50;

      // Only consider it a swipe if:
      // 1. The horizontal distance is greater than the minimum
      // 2. The horizontal distance is greater than the vertical distance (to avoid mistaking scrolls for swipes)
      if (Math.abs(xDist) > minSwipeDistance && Math.abs(xDist) > yDist) {
        if (xDist > 0) {
          // Swipe left - next
          handleNext();
        } else {
          // Swipe right - previous
          handlePrev();
        }
      }
    }

    // Reset touch positions
    setTouchStart(null);
    setTouchY(null);

    // Resume autoplay after delay
    setTimeout(() => setIsPaused(false), autoplayInterval);
  };

  const getLinkText = (type: string) => {
    if (isMobile) {
      return type === 'live' ? 'View' : 'Code';
    }
    return type === 'live' ? 'View Live' : 'Source Code';
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
          <TouchContainer
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <ProjectCard isActive={true}>
              <ProjectImage>
                {displayedProjects[currentIndex].image ? (
                  <img
                    src={displayedProjects[currentIndex].image}
                    alt={displayedProjects[currentIndex].title}
                    loading="lazy"
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
                <ProjectLinks onClick={(e) => e.stopPropagation()}>
                  {displayedProjects[currentIndex].link && (
                    <ProjectLink
                      href={displayedProjects[currentIndex].link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fas fa-external-link-alt"></i> {getLinkText('live')}
                    </ProjectLink>
                  )}
                  {displayedProjects[currentIndex].githubLink && (
                    <ProjectLink
                      href={displayedProjects[currentIndex].githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-github"></i> {getLinkText('github')}
                    </ProjectLink>
                  )}
                </ProjectLinks>
              </ProjectInfo>
            </ProjectCard>
          </TouchContainer>

          <NavigationButtons>
            <NavButton onClick={handlePrev} aria-label="Previous project">
              <i className="fas fa-chevron-left"></i>
            </NavButton>
            <NavButton onClick={handleNext} aria-label="Next project">
              <i className="fas fa-chevron-right"></i>
            </NavButton>
          </NavigationButtons>

          <SlideIndicators>
            {displayedProjects.map((_, index) => (
              <Indicator
                key={index}
                active={index === currentIndex}
                onClick={() => handleIndicatorClick(index)}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </SlideIndicators>
        </SlideshowContainer>
      </div>
    </ProjectsSection>
  );
};

export default Projects;
