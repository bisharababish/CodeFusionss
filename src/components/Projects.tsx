import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

// Import images
import BlogImage from '../components/images/projectspics/web/blog.png';
import MRIImage from '../components/images/projectspics/web/mri.png';
import SnakeImage from '../components/images/projectspics/games/snake.png';
import TravelImage from '../components/images/projectspics/web/travel.png';
import DistrubitionImage from '../components/images/projectspics/AIML/Distribution.png';
import DungeonGame from '../components/images/projectspics/games/dungeon.jpeg';
import TreasureHunter from '../components/images/projectspics/games/treasure.jpeg';
import SpaceExplorer from '../components/images/projectspics/games/space.jpeg';
import FruitBasketFrenzy from '../components/images/projectspics/games/fruit.jpeg';
import ReleaseYear from '../components/images/projectspics/AIML/ReleaseYear.png';

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
  padding: 8rem 0 0 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
  min-height: 100vh;

  ${media.laptop} { padding: 6rem 0 0 0; }
  ${media.tablet} { padding: 5rem 0 0 0; }
  ${media.largeMobile} { padding: 4rem 0 0 0; }
  ${media.mobile} { padding: 3rem 0.5rem 0 0; }
`;

const ThreeBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.6;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;

  ${media.tablet} { padding: 0 1.5rem; }
  ${media.mobile} { padding: 0 1rem; }
`;

const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;

  ${media.mobile} { margin-bottom: 3rem; }
`;

const Title = styled(motion.h2)`
  font-size: 4rem;
  font-weight: 800;
  background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 1rem;
  letter-spacing: -2px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  ${media.tablet} { font-size: 3rem; }
  ${media.mobile} { font-size: 2.5rem; }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.8;
  font-weight: 300;

  ${media.tablet} { font-size: 1.1rem; }
  ${media.mobile} { font-size: 1rem; }
`;

const CategoryTabs = styled(motion.div)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%);
  padding: 1rem;
  border-radius: 50px;
  box-shadow: 0 15px 50px rgba(102, 126, 234, 0.2);
  max-width: fit-content;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid rgba(102, 126, 234, 0.1);
  backdrop-filter: blur(10px);

  ${media.mobile} {
    gap: 0.5rem;
    padding: 0.8rem;
    margin-bottom: 3rem;
  }
`;

const CategoryTab = styled(motion.button)`
  padding: 0.8rem 2rem;
  border-radius: 50px;
  border: ${(props: any) => props.$active ? 'none' : '1px solid rgba(102, 126, 234, 0.2)'};
  background: ${(props: any) => props.$active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'rgba(255, 255, 255, 0.8)'};
  color: ${(props: any) => props.$active ? 'white' : '#4a5568'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  position: relative;
  overflow: hidden;
  box-shadow: ${(props: any) => props.$active ? '0 4px 15px rgba(102, 126, 234, 0.4)' : '0 2px 8px rgba(102, 126, 234, 0.1)'};

  &:hover {
    background: ${(props: any) => props.$active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'rgba(102, 126, 234, 0.1)'};
    transform: translateY(-2px);
    box-shadow: ${(props: any) => props.$active ? '0 6px 20px rgba(102, 126, 234, 0.5)' : '0 4px 15px rgba(102, 126, 234, 0.2)'};
    border-color: ${(props: any) => props.$active ? 'none' : 'rgba(102, 126, 234, 0.3)'};
  }

  ${media.mobile} {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 2.5rem;
  margin-bottom: 4rem;

  ${media.laptop} { grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); }
  ${media.tablet} { grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem; }
  ${media.mobile} { grid-template-columns: 1fr; gap: 1.5rem; }
`;

const ProjectCard = styled(motion.div)`
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-12px) scale(1.02);
    box-shadow: 0 30px 80px rgba(102, 126, 234, 0.3);
  }
`;

const ProjectImage = styled(motion.div)`
  width: 100%;
  height: 240px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  ${ProjectCard}:hover & img {
    transform: scale(1.1) rotate(2deg);
  }
`;

const ImageOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${ProjectCard}:hover & {
    opacity: 1;
  }
`;

const ProjectInfo = styled.div`
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;

  ${media.mobile} { padding: 1.5rem; }
`;

const ProjectTitle = styled.h3`
  font-size: 1.6rem;
  color: #2d3748;
  margin-bottom: 1rem;
  font-weight: 700;
  line-height: 1.3;

  ${media.mobile} { font-size: 1.4rem; }
`;

const ProjectDescription = styled.p`
  color: #718096;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  flex: 1;
  font-size: 0.95rem;
`;

const TechTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 1.5rem;
`;

const TechTag = styled(motion.span)`
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  color: #667eea;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  border: 1.5px solid rgba(102, 126, 234, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    transform: translateY(-2px);
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;

  ${media.mobile} { flex-direction: column; gap: 0.8rem; }
`;

const LiveLink = styled(motion.a)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  flex: 1;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
  }
`;

const CodeLink = styled(motion.a)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: 2px solid #667eea;
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  flex: 1;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);

  &:hover {
    background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
  }
`;

const LoadingSpinner = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem;
`;

const Spinner = styled(motion.div)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 4px solid rgba(102, 126, 234, 0.2);
  border-top-color: #667eea;
`;

const allProjects = [
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
    description: 'Dungeon Escape is a thrilling 2D game where you explore dark dungeons, solve puzzles, battle enemies, and collect items to escape. Can you survive?',
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
    title: 'TMDB Movie Dataset Analysis',
    description: 'This project analyzes the TMDb Movies Dataset to explore trends in the film industry. It examines the relationship between movie attributes (e.g., budget, genre, runtime) and financial success (revenue) while focusing on data cleaning, handling missing values, and visualizing key insights.',
    image: ReleaseYear,
    technologies: ['Python'],
    githubLink: 'https://github.com/judahsleibi34/TMDB-project',
    category: 'ai'
  },
  {
    id: 11,
    title: 'More Projects Coming Soon!',
    description: 'Early Production and more developed applications, websites soon!',
    image: '',
    technologies: ['Soon'],
    category: 'upcoming'
  },
];

const projectCategories = [
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

const ThreeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    (currentMount as HTMLDivElement).appendChild(renderer.domElement);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 800;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.15,
      color: '#667eea',
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create geometric shapes
    const geometry1 = new THREE.TorusGeometry(10, 3, 16, 100);
    const material1 = new THREE.MeshPhongMaterial({
      color: '#667eea',
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const torus = new THREE.Mesh(geometry1, material1);
    scene.add(torus);

    const geometry2 = new THREE.IcosahedronGeometry(8, 0);
    const material2 = new THREE.MeshPhongMaterial({
      color: '#764ba2',
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const icosahedron = new THREE.Mesh(geometry2, material2);
    icosahedron.position.set(-20, 10, -10);
    scene.add(icosahedron);

    // Lighting
    const light1 = new THREE.PointLight('#667eea', 2, 100);
    light1.position.set(20, 20, 20);
    scene.add(light1);

    const light2 = new THREE.PointLight('#764ba2', 2, 100);
    light2.position.set(-20, -20, -20);
    scene.add(light2);

    camera.position.z = 50;

    // Mouse movement
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      particlesMesh.rotation.y += 0.001;
      particlesMesh.rotation.x += 0.0005;

      torus.rotation.x += 0.005;
      torus.rotation.y += 0.005;

      icosahedron.rotation.x -= 0.003;
      icosahedron.rotation.y -= 0.003;

      camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (currentMount) {
        (currentMount as HTMLDivElement).removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <ThreeBackground ref={mountRef} />;
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  const handleCategoryChange = (categoryId: React.SetStateAction<string>) => {
    setIsLoading(true);
    setActiveCategory(categoryId);
    setTimeout(() => setIsLoading(false), 400);
  };

  const currentCategory = projectCategories.find(cat => cat.id === activeCategory) || projectCategories[0];
  const projectsToDisplay = currentCategory.projects;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  return (
    <ProjectsSection id="projects">
      <ThreeScene />

      <ContentWrapper>
        <SectionHeader>
          <Title
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            Featured Projects
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            Explore a collection of innovative solutions across various domains
          </Subtitle>
        </SectionHeader>

        <CategoryTabs
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {projectCategories.map((category) => (
            <CategoryTab
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-active={activeCategory === category.id ? "true" : undefined}
            >
              {category.name}
            </CategoryTab>
          ))}
        </CategoryTabs>

        {isLoading ? (
          <LoadingSpinner
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Spinner
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </LoadingSpinner>
        ) : (
          <ProjectsGrid
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence mode="wait">
              {projectsToDisplay.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  layout
                >
                  <ProjectCard>
                    <ProjectImage>
                      {project.image ? (
                        <>
                          <img src={project.image} alt={project.title} loading="lazy" />
                          <ImageOverlay
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                          >
                          </ImageOverlay>
                        </>
                      ) : (
                        <div style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          color: 'white',
                          fontSize: '1.5rem',
                          fontWeight: '700'
                        }}>
                          Coming Soon!
                        </div>
                      )}
                    </ProjectImage>

                    <ProjectInfo>
                      <ProjectTitle>{project.title}</ProjectTitle>
                      <ProjectDescription>{project.description}</ProjectDescription>

                      <TechTags>
                        {project.technologies.map((tech, index) => (
                          <TechTag
                            key={index}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
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
                            whileTap={{ scale: 0.95 }}
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
                            whileTap={{ scale: 0.95 }}
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
      </ContentWrapper>
    </ProjectsSection>
  );
};

export default Projects;