import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Project, ProjectCategory } from '../types';
import BlogImage from './projectspics/blog.png';
import MRIImage from './projectspics/mri.png';
import SnakeImage from './projectspics/snake.png';
import TravelImage from './projectspics/travel.png';
import DistrubitionImage from './projectspics/Distribution.png';

// Breakpoints and media queries (same as before)
const breakpoints = {
  smallMobile: '320px',
  mobile: '480px',
  largeMobile: '600px',
  tablet: '768px',
  laptop: '1024px',
};

const media = {
  smallMobile: `@media (max-width: ${breakpoints.smallMobile})`,
  mobile: `@media (max-width: ${breakpoints.mobile})`,
  largeMobile: `@media (max-width: ${breakpoints.largeMobile})`,
  tablet: `@media (max-width: ${breakpoints.tablet})`,
  laptop: `@media (max-width: ${breakpoints.laptop})`,
};

// Styled components with enhanced animations
const ProjectsSection = styled(motion.section)`
  padding: 6rem 0;
  background: linear-gradient(180deg, #0f0f1a 0%, #1a1a2e 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwMDAwIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMxMTExMjIiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=');
    opacity: 0.15;
    z-index: 0;
  }

  ${media.laptop} { padding: 6rem 0; }
  ${media.tablet} { padding: 5rem 0; }
  ${media.largeMobile} { padding: 4.5rem 0 3.2rem; }
  ${media.mobile} { padding: 5rem 0.5rem 3.2rem; }
  ${media.smallMobile} { padding: 4rem 0.5rem 2rem; }
`;

const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 3rem;
  padding-top: 2rem;
  position: relative;
  z-index: 1;

  h2 {
    font-size: 2.8rem;
    margin-bottom: 0.5rem;
    background: linear-gradient(90deg, #6c5ce7, #a29bfe);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    display: inline-block;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 3px;
      background: linear-gradient(90deg, #6c5ce7, #a29bfe);
      border-radius: 3px;
    }
  }

  p {
    max-width: 700px;
    margin: 0 auto;
    opacity: 0.9;
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.8);
  }

  ${media.tablet} {
    h2 { font-size: 2.4rem; }
    p { font-size: 1rem; }
  }

  ${media.mobile} {
    h2 { font-size: 2rem; }
    p { font-size: 0.9rem; }
  }
`;

const CategoryTabs = styled(motion.div)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3rem;
  position: relative;
  z-index: 1;

  ${media.tablet} {
    gap: 0.8rem;
    margin-bottom: 2.5rem;
  }

  ${media.mobile} {
    gap: 0.6rem;
    margin-bottom: 2rem;
  }
`;

const CategoryTab = styled(motion.button) <{ active: boolean }>`
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  border: none;
  background: ${props => props.active ? 'linear-gradient(135deg, #6c5ce7, #a29bfe)' : 'rgba(255, 255, 255, 0.05)'};
  color: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.7)'};
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  border: 1px solid ${props => props.active ? 'rgba(108, 92, 231, 0.5)' : 'rgba(255, 255, 255, 0.1)'};
  box-shadow: ${props => props.active ? '0 4px 15px rgba(108, 92, 231, 0.3)' : 'none'};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
    opacity: ${props => props.active ? '1' : '0'};
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(108, 92, 231, 0.4);
  }

  ${media.tablet} {
    padding: 0.7rem 1.3rem;
    font-size: 0.9rem;
  }

  ${media.mobile} {
    padding: 0.6rem 1rem;
    font-size: 0.85rem;
  }
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  position: relative;
  z-index: 1;

  ${media.laptop} {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  ${media.tablet} {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }
`;

const ProjectCard = styled(motion.div)`
  background: rgba(15, 15, 26, 0.6);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.4s ease;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  position: relative;
  backdrop-filter: blur(5px);
  height: 100%;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(108, 92, 231, 0.3);
    border-color: rgba(108, 92, 231, 0.3);

    .project-image img {
      transform: scale(1.05);
    }

    .project-overlay {
      opacity: 1;
    }
  }

  ${media.tablet} {
    border-radius: 10px;
  }
`;

const ProjectImage = styled(motion.div)`
  width: 100%;
  height: 220px;
  position: relative;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.2);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  ${media.tablet} {
    height: 200px;
  }

  ${media.mobile} {
    height: 180px;
  }
`;

const ProjectOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(108, 92, 231, 0.7), transparent);
  display: flex;
  align-items: flex-end;
  padding: 1.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;

  h3 {
    color: white;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
`;

const ProjectInfo = styled(motion.div)`
  padding: 1.8rem;

  p {
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }

  ${media.tablet} {
    padding: 1.5rem;
  }
`;

const TechTags = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 1.8rem;
`;

const TechTag = styled(motion.span)`
  background: rgba(108, 92, 231, 0.15);
  color: #a29bfe;
  padding: 0.3rem 0.8rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid rgba(108, 92, 231, 0.3);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(108, 92, 231, 0.3);
    transform: translateY(-2px);
  }
`;

const ProjectLinks = styled(motion.div)`
  display: flex;
  gap: 1rem;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.6rem 1.2rem;
    border-radius: 50px;
    font-weight: 500;
    transition: all 0.3s ease;
    text-decoration: none;
    font-size: 0.9rem;
  }

  ${media.mobile} {
    flex-direction: column;
    gap: 0.8rem;
  }
`;

const LiveLink = styled(motion.a)`
  background: linear-gradient(135deg, #6c5ce7, #a29bfe);
  color: white;
  flex: 1;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(108, 92, 231, 0.4);
  }
`;

const CodeLink = styled(motion.a)`
  background: rgba(255, 255, 255, 0.05);
  color: #a29bfe;
  border: 1px solid rgba(108, 92, 231, 0.3);
  flex: 1;

  &:hover {
    background: rgba(108, 92, 231, 0.1);
    transform: translateY(-2px);
  }
`;

const FloatingOrbs = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 0;
`;

const Orb = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.15;
`;

const orbVariants = {
  animate: (i: number) => ({
    x: [0, 100 * (i % 2 === 0 ? 1 : -1)],
    y: [0, 100 * (i % 3 === 0 ? 1 : -1)],
    transition: {
      x: {
        duration: 20 + i * 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      },
      y: {
        duration: 15 + i * 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  })
};

// Project data organized by categories
const projectCategories: ProjectCategory[] = [
  {
    id: 'all',
    name: 'All Projects',
    projects: [
      {
        id: 1,
        title: 'Personal Blog Page',
        description: 'A personal Blog that consists of random generated poems or blogs that you can read about when you press Continue Reading.',
        image: BlogImage,
        technologies: ['HTML', 'CSS'],
        githubLink: 'https://github.com/bisharababish/Personal-Blog',
        category: 'web'
      },
      {
        id: 2,
        title: 'MRI Brain Tumor Detection',
        description: 'This AI-powered application analyzes brain MRI scans to detect tumors using a CNN model built with PyTorch, ensuring high accuracy in image analysis.',
        image: MRIImage,
        technologies: ['JavaScript', 'HTML', 'CSS'],
        link: 'https://mridetection.netlify.app/',
        githubLink: 'https://github.com/bisharababish/MRI-Brain-Tumor',
        category: 'ai'
      },
      {
        id: 3,
        title: 'Snake Game',
        description: 'An advanced, feature-rich implementation of the classic Snake game with modern graphics, power-ups, and progression mechanics.',
        image: SnakeImage,
        technologies: ['JavaScript', 'CSS', 'HTML'],
        link: 'https://slitherzone.netlify.app/',
        githubLink: 'https://github.com/bisharababish/Snake-Game',
        category: 'games'
      },
      {
        id: 4,
        title: 'Travel App',
        description: 'This project involves building a personal blog website from scratch using HTML and CSS, focusing on custom design, layout, and styling while ensuring proper file structure and code formatting.',
        image: TravelImage,
        technologies: ['JavaScript', 'SCSS', 'HTML'],
        githubLink: 'https://github.com/bisharababish/TravelApp',
        category: 'web'
      },
      {
        id: 5,
        title: 'Early Prediction of Kidney Dysfunction',
        description: 'This project investigates the early prediction of kidney dysfunction in diabetic patients by analyzing Fasting Blood Sugar and Creatinine levels using machine learning models.',
        image: DistrubitionImage,
        technologies: ['Python'],
        githubLink: 'https://github.com/judahsleibi34/Early-Prediction-of-Kidney-Dysfunction-in-Diabetic-Patients',
        category: 'ai'
      },
      {
        id: 6,
        title: 'More Projects Coming Soon!',
        description: 'Early Production and more developed applications, websites soon!',
        image: '',
        technologies: ['Soon'],
        category: 'upcoming'
      }
    ]
  },
  {
    id: 'web',
    name: 'Web Development',
    projects: [
      {
        id: 1,
        title: 'Personal Blog Page',
        description: 'A personal Blog that consists of random generated poems or blogs that you can read about when you press Continue Reading.',
        image: BlogImage,
        technologies: ['HTML', 'CSS'],
        githubLink: 'https://github.com/bisharababish/Personal-Blog',
        category: 'web'
      },
      {
        id: 4,
        title: 'Travel App',
        description: 'This project involves building a personal blog website from scratch using HTML and CSS, focusing on custom design, layout, and styling while ensuring proper file structure and code formatting.',
        image: TravelImage,
        technologies: ['JavaScript', 'SCSS', 'HTML'],
        githubLink: 'https://github.com/bisharababish/TravelApp',
        category: 'web'
      }
    ]
  },
  {
    id: 'ai',
    name: 'AI/ML Projects',
    projects: [
      {
        id: 2,
        title: 'MRI Brain Tumor Detection',
        description: 'This AI-powered application analyzes brain MRI scans to detect tumors using a CNN model built with PyTorch, ensuring high accuracy in image analysis.',
        image: MRIImage,
        technologies: ['JavaScript', 'HTML', 'CSS'],
        link: 'https://mridetection.netlify.app/',
        githubLink: 'https://github.com/bisharababish/MRI-Brain-Tumor',
        category: 'ai'
      },
      {
        id: 5,
        title: 'Early Prediction of Kidney Dysfunction',
        description: 'This project investigates the early prediction of kidney dysfunction in diabetic patients by analyzing Fasting Blood Sugar and Creatinine levels using machine learning models.',
        image: DistrubitionImage,
        technologies: ['Python'],
        githubLink: 'https://github.com/judahsleibi34/Early-Prediction-of-Kidney-Dysfunction-in-Diabetic-Patients',
        category: 'ai'
      }
    ]
  },
  {
    id: 'games',
    name: 'Games',
    projects: [
      {
        id: 3,
        title: 'Snake Game',
        description: 'An advanced, feature-rich implementation of the classic Snake game with modern graphics, power-ups, and progression mechanics.',
        image: SnakeImage,
        technologies: ['JavaScript', 'CSS', 'HTML'],
        link: 'https://slitherzone.netlify.app/',
        githubLink: 'https://github.com/bisharababish/Snake-Game',
        category: 'games'
      }
    ]
  },
  {
    id: 'upcoming',
    name: 'Upcoming',
    projects: [
      {
        id: 6,
        title: 'More Projects Coming Soon!',
        description: 'Early Production and more developed applications, websites soon!',
        image: '',
        technologies: ['Soon'],
        category: 'upcoming'
      }
    ]
  }
];

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCategoryChange = (categoryId: string) => {
    setIsLoading(true);
    setActiveCategory(categoryId);

    // Simulate loading delay for smoother transition
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  const currentCategory = projectCategories.find(cat => cat.id === activeCategory) || projectCategories[0];
  const projectsToDisplay = currentCategory.projects;

  // Generate floating orbs
  const orbs = [
    { size: 300, color: '#6c5ce7', x: '10%', y: '20%' },
    { size: 400, color: '#a29bfe', x: '70%', y: '30%' },
    { size: 250, color: '#fd79a8', x: '30%', y: '60%' },
    { size: 350, color: '#00cec9', x: '80%', y: '70%' }
  ];

  return (
    <ProjectsSection id="projects">
      <FloatingOrbs>
        {orbs.map((orb, i) => (
          <Orb
            key={i}
            custom={i}
            variants={orbVariants}
            animate="animate"
            style={{
              width: orb.size,
              height: orb.size,
              background: orb.color,
              left: orb.x,
              top: orb.y
            }}
          />
        ))}
      </FloatingOrbs>

      <div className="container">
        <SectionHeader
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2>Featured Projects</h2>
          <p>Explore my work across different domains and technologies</p>
        </SectionHeader>

        <CategoryTabs>
          {projectCategories.map((category) => (
            <CategoryTab
              key={category.id}
              active={activeCategory === category.id}
              onClick={() => handleCategoryChange(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </CategoryTab>
          ))}
        </CategoryTabs>

        {isLoading ? (
          <motion.div
            style={{ textAlign: 'center', padding: '2rem' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                border: '3px solid #6c5ce7',
                borderTopColor: 'transparent',
                margin: '0 auto'
              }}
            />
          </motion.div>
        ) : (
          <ProjectsGrid
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            <AnimatePresence>
              {projectsToDisplay.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <ProjectCard
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProjectImage className="project-image">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          loading="lazy"
                        />
                      ) : (
                        <div style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'rgba(108, 92, 231, 0.1)',
                          color: 'white',
                          fontSize: '1.2rem'
                        }}>
                          Coming Soon
                        </div>
                      )}
                      <ProjectOverlay className="project-overlay">
                        <h3>{project.title}</h3>
                      </ProjectOverlay>
                    </ProjectImage>
                    <ProjectInfo>
                      <p>{project.description}</p>
                      <TechTags>
                        {project.technologies.map((tech, index) => (
                          <TechTag
                            key={index}
                            whileHover={{ scale: 1.05 }}
                          >
                            {tech}
                          </TechTag>
                        ))}
                      </TechTags>
                      <ProjectLinks>
                        {project.link && (
                          <LiveLink
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                          >
                            Live Demo
                          </LiveLink>
                        )}
                        {project.githubLink && (
                          <CodeLink
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                          >
                            Source Code
                          </CodeLink>
                        )}
                      </ProjectLinks>
                    </ProjectInfo>
                  </ProjectCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </ProjectsGrid>
        )}
      </div>
    </ProjectsSection>
  );
};

export default Projects;