import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

// Import images
import BlogImage from './images/projectspics/web/blog.png';
import MRIImage from './images/projectspics/web/mri.png';
import SnakeImage from './images/projectspics/games/snake.png';
import TravelImage from './images/projectspics/web/travel.png';
import DistrubitionImage from './images/projectspics/AIML/Distribution.png';
import DungeonGame from './images/projectspics/games/dungeon.jpeg';
import TreasureHunter from './images/projectspics/games/treasure.jpeg';
import SpaceExplorer from './images/projectspics/games/space.jpeg';
import FruitBasketFrenzy from './images/projectspics/games/fruit.jpeg';
import ReleaseYear from './images/projectspics/AIML/ReleaseYear.png';

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
  padding: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
`;

const ThreeBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.3;
`;

const LeftSidebar = styled(motion.div)`
  width: 300px;
  background: transparent;
  backdrop-filter: none;
  border-right: none;
  padding: 0;
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: none;
  min-height: 100vh;

  ${media.tablet} {
    width: 280px;
  }

  ${media.mobile} {
    width: 100%;
    height: auto;
    min-height: auto;
    flex-direction: row;
    overflow-x: auto;
    padding: 2.5rem 0 1.5rem 0;
    border-right: none;
    border-bottom: none;
    box-shadow: none;
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    z-index: 100;
    justify-content: flex-start;
  }
`;


const NavigationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding: 0 1.5rem;

  ${media.mobile} {
    flex-direction: row;
    padding: 0 1rem;
    gap: 0.8rem;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

interface NavItemProps {
  $active: boolean;
}

const NavItem = styled(motion.button) <NavItemProps>`
  padding: 1rem 2rem;
  border-radius: 12px;
  border: none;
  background: ${(props) => props.$active
    ? 'rgba(102, 126, 234, 0.2)'
    : 'transparent'};
  color: ${(props) => props.$active ? 'white' : 'rgba(255, 255, 255, 0.8)'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  position: relative;
  text-align: left;
  width: 100%;
  margin-bottom: 0.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid ${(props) => props.$active
    ? 'rgba(255, 255, 255, 0.3)'
    : 'transparent'};

  &:hover {
    background: ${(props) => props.$active
    ? 'rgba(102, 126, 234, 0.3)'
    : 'rgba(255, 255, 255, 0.1)'};
    color: white;
    transform: translateX(8px);
    border-color: rgba(255, 255, 255, 0.2);
  }

  ${media.mobile} {
    padding: 0.8rem 1.2rem;
    font-size: 0.85rem;
    white-space: nowrap;
    flex-shrink: 0;
    min-width: fit-content;
  }
`;

const MainContent = styled.div`
  flex: 1;
  position: relative;
  z-index: 5;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  ${media.mobile} {
    margin-top: 140px;
    padding-top: 1rem;
  }
`;

const SlideshowContainer = styled(motion.div)`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  overflow: hidden;
  min-height: calc(100vh - 64px);

  ${media.tablet} {
    padding: 2rem 1.5rem;
  }

  ${media.mobile} {
    padding: 1.5rem 1rem;
    min-height: calc(100vh - 200px);
  }
`;

const ProjectSlide = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProjectCard = styled(motion.div)`
  background: white;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.15);
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  width: 85%;
  max-width: 650px;
  height: 75%;
  max-height: 550px;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    transform: translateY(-10px) scale(1.01);
    box-shadow: 0 30px 90px rgba(102, 126, 234, 0.25);
  }

  ${media.tablet} {
    width: 90%;
    max-width: 500px;
    height: 70%;
    max-height: 450px;
  }

  ${media.mobile} {
    width: 95%;
    max-width: none;
    height: 65%;
    max-height: 400px;
  }
`;

const ProjectImage = styled(motion.div)`
  width: 100%;
  height: 50%;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
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
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.85) 0%, rgba(118, 75, 162, 0.85) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.4s ease;

  ${ProjectCard}:hover & {
    opacity: 1;
  }
`;

const ProjectInfo = styled.div`
  padding: 2.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(15px);
  gap: 1.5rem;

  ${media.tablet} { 
    padding: 2rem;
    gap: 1.2rem;
  }

  ${media.mobile} { 
    padding: 1.8rem;
    gap: 1rem;
  }
`;

const ProjectTitle = styled.h3`
  font-size: 2.2rem;
  color: #2d3748;
  font-weight: 700;
  line-height: 1.2;
  margin: 0;

  ${media.tablet} { 
    font-size: 1.8rem; 
  }

  ${media.mobile} { 
    font-size: 1.6rem; 
  }
`;

const ProjectDescription = styled.p`
  color: #718096;
  line-height: 1.7;
  flex: 1;
  font-size: 1.05rem;
  margin: 0;
`;

const TechTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin: 0;
`;

const TechTag = styled(motion.span)`
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  color: #667eea;
  padding: 0.5rem 1.2rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
  border: 2px solid rgba(102, 126, 234, 0.2);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;

  ${media.mobile} { 
    flex-direction: column; 
    gap: 0.8rem; 
  }
`;

const LiveLink = styled(motion.a)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2rem;
  border-radius: 15px;
  font-weight: 600;
  text-decoration: none;
  flex: 1;
  text-align: center;
  transition: all 0.4s ease;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(102, 126, 234, 0.6);
  }
`;

const CodeLink = styled(motion.a)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white !important;
  border: none;
  padding: 1rem 2rem;
  border-radius: 15px;
  font-weight: 600;
  text-decoration: none;
  flex: 1;
  text-align: center;
  transition: all 0.4s ease;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  backdrop-filter: blur(10px);

  &:hover {
    background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
    color: white !important;
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(102, 126, 234, 0.6);
  }
`;

const SlideControls = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  z-index: 10;

  ${media.mobile} {
    bottom: 1rem;
  }
`;

const ControlButton = styled(motion.button)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  color: #667eea;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.2);

  &:hover {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    transform: scale(1.1);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const SlideIndicator = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

interface IndicatorDotProps {
  $active: boolean;
}

const IndicatorDot = styled(motion.div) <IndicatorDotProps>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${(props) => props.$active
    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.2);
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
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-top-color: white;
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
    id: 'web',
    name: 'Web Development',
    icon: '💻',
    projects: allProjects.filter(project => project.category === 'web')
  },
  {
    id: 'ai',
    name: 'AI/ML',
    icon: '🤖',
    projects: allProjects.filter(project => project.category === 'ai')
  },
  {
    id: 'games',
    name: 'Games',
    icon: '🎮',
    projects: allProjects.filter(project => project.category === 'games')
  },
  {
    id: 'upcoming',
    name: 'Upcoming',
    icon: '⏳',
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
    const particlesCount = 600;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 80;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      color: '#667eea',
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create geometric shapes
    const geometry1 = new THREE.TorusGeometry(8, 2, 16, 100);
    const material1 = new THREE.MeshPhongMaterial({
      color: '#667eea',
      wireframe: true,
      transparent: true,
      opacity: 0.2
    });
    const torus = new THREE.Mesh(geometry1, material1);
    scene.add(torus);

    const geometry2 = new THREE.IcosahedronGeometry(6, 0);
    const material2 = new THREE.MeshPhongMaterial({
      color: '#764ba2',
      wireframe: true,
      transparent: true,
      opacity: 0.2
    });
    const icosahedron = new THREE.Mesh(geometry2, material2);
    icosahedron.position.set(-15, 8, -8);
    scene.add(icosahedron);

    // Lighting
    const light1 = new THREE.PointLight('#667eea', 1.5, 100);
    light1.position.set(15, 15, 15);
    scene.add(light1);

    const light2 = new THREE.PointLight('#764ba2', 1.5, 100);
    light2.position.set(-15, -15, -15);
    scene.add(light2);

    camera.position.z = 40;

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

      particlesMesh.rotation.y += 0.0008;
      particlesMesh.rotation.x += 0.0004;

      torus.rotation.x += 0.003;
      torus.rotation.y += 0.003;

      icosahedron.rotation.x -= 0.002;
      icosahedron.rotation.y -= 0.002;

      camera.position.x += (mouseX * 3 - camera.position.x) * 0.03;
      camera.position.y += (mouseY * 3 - camera.position.y) * 0.03;
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
  const [activeCategory, setActiveCategory] = useState('web');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleCategoryChange = (categoryId: string) => {
    setIsLoading(true);
    setActiveCategory(categoryId);
    setCurrentSlide(0);
    setTimeout(() => setIsLoading(false), 500);
  };

  // Show projects based on selected category
  const projectsToDisplay = projectCategories.find(cat => cat.id === activeCategory)?.projects || allProjects;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projectsToDisplay.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projectsToDisplay.length) % projectsToDisplay.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    })
  };

  const floatingVariants = {
    float: {
      y: [0, -20, 0],
      rotate: [0, 5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <ProjectsSection id="projects">
      <ThreeScene />

      <LeftSidebar
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
      >
        <NavigationList>
          {projectCategories.map((category, index) => (
            <NavItem
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              $active={activeCategory === category.id}
              initial={{ x: -80, opacity: 0, scale: 0.5, rotateY: -90 }}
              animate={{ x: 0, opacity: 1, scale: 1, rotateY: 0 }}
              transition={{
                duration: 1,
                delay: index * 0.2,
                ease: [0.68, -0.55, 0.265, 1.55],
                type: "spring",
                stiffness: 100
              }}
              whileHover={{
                scale: 1.08,
                x: 15,
                rotateY: 5,
                boxShadow: "0 15px 40px rgba(102, 126, 234, 0.4)",
                transition: { duration: 0.4, ease: "easeOut" }
              }}
              whileTap={{
                scale: 0.92,
                transition: { duration: 0.1 }
              }}
            >
              <motion.span
                style={{ marginRight: '1rem', fontSize: '1.3rem' }}
                animate={activeCategory === category.id ? {
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.2, 1],
                  y: [0, -5, 0]
                } : {
                  rotate: 0,
                  scale: 1,
                  y: 0
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                  repeat: activeCategory === category.id ? Infinity : 0,
                  repeatDelay: 2
                }}
              >
                {category.icon}
              </motion.span>
              <motion.span
                animate={activeCategory === category.id ? {
                  textShadow: "0 0 10px rgba(255, 255, 255, 0.8)"
                } : {
                  textShadow: "none"
                }}
                transition={{ duration: 0.3 }}
              >
                {category.name}
              </motion.span>
            </NavItem>
          ))}
        </NavigationList>
      </LeftSidebar>

      <MainContent>
        <SlideshowContainer>
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
            <>
              <AnimatePresence mode="wait" custom={currentSlide}>
                {projectsToDisplay.map((project, index) => (
                  <ProjectSlide
                    key={`${activeCategory}-${project.id}`}
                    custom={currentSlide}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 }
                    }}
                    style={{ display: index === currentSlide ? 'flex' : 'none' }}
                  >
                    <ProjectCard
                      variants={floatingVariants}
                      animate="float"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    >
                      <ProjectImage>
                        {project.image ? (
                          <>
                            <img src={project.image} alt={project.title} loading="lazy" />
                            <ImageOverlay
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                            >
                              View Project
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
                            fontSize: '2rem',
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
                          {project.technologies.map((tech, techIndex) => (
                            <TechTag
                              key={techIndex}
                              whileHover={{ scale: 1.1, y: -3 }}
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
                              whileHover={{ scale: 1.05, y: -2 }}
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
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Source Code
                            </CodeLink>
                          )}
                        </ProjectLinks>
                      </ProjectInfo>
                    </ProjectCard>
                  </ProjectSlide>
                ))}
              </AnimatePresence>

              <SlideControls>
                <ControlButton
                  onClick={prevSlide}
                  disabled={projectsToDisplay.length <= 1}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ←
                </ControlButton>

                <SlideIndicator>
                  {projectsToDisplay.map((_, index) => (
                    <IndicatorDot
                      key={index}
                      $active={index === currentSlide}
                      onClick={() => goToSlide(index)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
                </SlideIndicator>

                <ControlButton
                  onClick={nextSlide}
                  disabled={projectsToDisplay.length <= 1}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  →
                </ControlButton>
              </SlideControls>
            </>
          )}
        </SlideshowContainer>
      </MainContent>
    </ProjectsSection>
  );
};

export default Projects;