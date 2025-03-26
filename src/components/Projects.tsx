import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Project, ProjectCategory } from '../types';
import BlogImage from './projectspics/blog.png';
import MRIImage from './projectspics/mri.png';
import SnakeImage from './projectspics/snake.png';
import TravelImage from './projectspics/travel.png';
import DistrubitionImage from './projectspics/Distribution.png';
import DungeonGame from './projectspics/dungeon.jpeg';
import TreasureHunter from './projectspics/treasure.jpeg';
import SpaceExplorer from '.projectspics/space.jpeg';
import FruitBasketFrenzy from './projectspics/fruit.jpeg';

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

const ProjectsSection = styled(motion.section)`
  padding: 6rem 0;
  background: linear-gradient(180deg, #0f0f1a 0%, #1a1a2e 100%);
  position: relative;
  overflow: hidden;

  ${media.laptop} { padding: 6rem 0; }
  ${media.tablet} { padding: 5rem 0; }
  ${media.largeMobile} { padding: 4.5rem 0 3.2rem; }
  ${media.mobile} { padding: 5rem 0.5rem 3.2rem; }
  ${media.smallMobile} { padding: 4rem 0.5rem 2rem; }
`;

const FloatingOrbs = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
`;

const Orb = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.15;
  will-change: transform;
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

    ${media.tablet} { font-size: 2.4rem; }
    ${media.mobile} { font-size: 2rem; }
  }

  p {
    max-width: 700px;
    margin: 0 auto;
    opacity: 0.9;
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.8);

    ${media.tablet} { font-size: 1rem; }
    ${media.mobile} { font-size: 0.9rem; }
  }
`;

const AnimatedText = styled(motion.span)`
  display: inline-block;
`;

const CategoryTabs = styled(motion.div)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3rem;
  position: relative;
  z-index: 1;

  ${media.tablet} { gap: 0.8rem; margin-bottom: 2.5rem; }
  ${media.mobile} { gap: 0.6rem; margin-bottom: 2rem; }
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
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  position: relative;
  z-index: 1;

  ${media.laptop} { grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); }
  ${media.tablet} { grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
  ${media.mobile} { grid-template-columns: 1fr; gap: 1.2rem; }
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
`;

const ProjectInfo = styled(motion.div)`
  padding: 1.8rem;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 1.5rem;
    line-height: 1.6;
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
`;

const ProjectLinks = styled(motion.div)`
  display: flex;
  gap: 1rem;

  ${media.mobile} {
    flex-direction: column;
    gap: 0.8rem;
  }
`;

const LiveLink = styled(motion.a)`
  background: linear-gradient(135deg, #6c5ce7, #a29bfe);
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 50px;
  font-weight: 500;
  text-decoration: none;
  flex: 1;
  text-align: center;
`;

const CodeLink = styled(motion.a)`
  background: rgba(255, 255, 255, 0.05);
  color: #a29bfe;
  border: 1px solid rgba(108, 92, 231, 0.3);
  padding: 0.6rem 1.2rem;
  border-radius: 50px;
  font-weight: 500;
  text-decoration: none;
  flex: 1;
  text-align: center;
`;

const orbVariants = {
  animate: (i: number) => ({
    x: [0, 100 * (i % 2 === 0 ? 1 : -1)],
    y: [0, 100 * (i % 3 === 0 ? 1 : -1)],
    transition: {
      x: { duration: 20 + i * 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
      y: { duration: 15 + i * 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
    }
  })
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "backOut"
    }
  }
};

const textVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.2, 0.65, 0.3, 0.9]
    }
  })
};

const paragraphVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.6,
      duration: 1,
      ease: "easeOut"
    }
  }
};

const allProjects: Project[] = [
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
    category: 'web'
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
    title: 'Dungeon Escape',
    description: 'Dungeon Escape is a thrilling 2D game where you explore dark dungeons, solve puzzles, battle enemies, and collect items to escape. Can you survive? ',
    image: DungeonGame,
    technologies: ['JavaScript', 'SCSS', 'HTML'],
    link: 'https://dungeonescapee.netlify.app/',
    githubLink: 'https://github.com/bisharababish/Dungeon-Escape',
    category: 'games'
  },
  {
    id: 7,
    title: 'Treasure Hunter',
    description: 'Dungeon Escape is a maze-based game with dynamic levels. Collect treasures, dodge traps, and survive as challenges intensify. How far can you go?',
    image: TreasureHunter,
    technologies: ['JavaScript', 'SCSS', 'HTML'],
    link: 'https://treasurehunterr.netlify.app/',
    githubLink: 'https://github.com/bisharababish/Treasure-Hunter',
    category: 'games'
  },
  {
    id: 8,
    title: 'Space Explorer',
    description: 'A browser-based arcade space game where you collect energy crystals, dodge debris, and find wormholes to explore new galaxies.',
    image: SpaceExplorer,
    technologies: ['JavaScript', 'SCSS', 'HTML'],
    link: 'https://spaceexplorerr.netlify.app/',
    githubLink: 'https://github.com/bisharababish/Space-Explorer',
    category: 'games'
  },
  {
    id: 9,
    title: 'Fruit Basket Frenzy',
    description: 'Fruit Basket Frenzy is a fun game where you catch falling fruits to score points before time runs out. With smooth animations and a vibrant design, it is perfect for all ages!',
    image: FruitBasketFrenzy,
    technologies: ['JavaScript', 'SCSS', 'HTML'],
    link: 'https://fruitbasketfrenzy.netlify.app/',
    githubLink: 'https://github.com/bisharababish/Fruit-Basket-Frenzy',
    category: 'games'
  },
  {
    id: 10,
    title: 'More Projects Coming Soon!',
    description: 'Early Production and more developed applications, websites soon!',
    image: '',
    technologies: ['Soon'],
    category: 'upcoming'
  },
];

const projectCategories: ProjectCategory[] = [
  {
    id: 'all',
    name: 'All Projects',
    projects: allProjects
  },
  {
    id: 'web',
    name: 'Web Development',
    projects: allProjects.filter(project => project.category === 'web')
  },
  {
    id: 'ai',
    name: 'AI/ML Projects',
    projects: allProjects.filter(project => project.category === 'ai')
  },
  {
    id: 'games',
    name: 'Games',
    projects: allProjects.filter(project => project.category === 'games')
  },
  {
    id: 'upcoming',
    name: 'Upcoming',
    projects: allProjects.filter(project => project.category === 'upcoming')
  }
];

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCategoryChange = (categoryId: string) => {
    setIsLoading(true);
    setActiveCategory(categoryId);
    setTimeout(() => setIsLoading(false), 300);
  };

  const currentCategory = projectCategories.find(cat => cat.id === activeCategory) || projectCategories[0];
  const projectsToDisplay = currentCategory.projects;

  const orbs = [
    { size: 300, color: '#6c5ce7', x: '10%', y: '20%' },
    { size: 400, color: '#a29bfe', x: '70%', y: '30%' },
    { size: 250, color: '#fd79a8', x: '30%', y: '60%' },
    { size: 350, color: '#00cec9', x: '80%', y: '70%' }
  ];

  const titleWords = "Featured Projects".split(" ");

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
          <h2>
            {titleWords.map((word, i) => (
              <AnimatedText
                key={i}
                custom={i}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                style={{ marginRight: i < titleWords.length - 1 ? '0.5rem' : 0 }}
              >
                {word}
              </AnimatedText>
            ))}
          </h2>
          <motion.p
            variants={paragraphVariants}
            initial="hidden"
            animate="visible"
          >
            Explore our work across different domains and technologies
          </motion.p>
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
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <AnimatePresence>
              {projectsToDisplay.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  variants={itemVariants}
                >
                  <ProjectCard
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProjectImage>
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
                          Coming Soon!
                        </div>
                      )}
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
                          <LiveLink
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                          >
                            View Live
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