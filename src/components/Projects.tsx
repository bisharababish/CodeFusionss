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
  background: var(--website-bg);
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
    animation: backgroundFloat 20s ease-in-out infinite;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 10% 90%, rgba(75, 46, 131, 0.08) 0%, transparent 40%),
                radial-gradient(circle at 90% 10%, rgba(47, 128, 237, 0.08) 0%, transparent 40%),
                radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.03) 0%, transparent 30%);
    animation: backgroundFloat2 25s ease-in-out infinite reverse;
    z-index: 1;
  }

  @keyframes backgroundFloat {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-20px) rotate(1deg); }
    66% { transform: translateY(10px) rotate(-1deg); }
  }

  @keyframes backgroundFloat2 {
    0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
    25% { transform: translateY(-15px) rotate(-0.5deg) scale(1.05); }
    50% { transform: translateY(5px) rotate(0.5deg) scale(0.95); }
    75% { transform: translateY(-10px) rotate(-0.3deg) scale(1.02); }
  }
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
    ? '#6C4CC4'
    : 'transparent'};
  color: ${(props) => props.$active ? '#F4EFEA' : '#B0B6C1'};
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
    ? '#B0B6C1'
    : 'transparent'};

  &:hover {
    background: ${(props) => props.$active
    ? '#00C2FF'
    : '#1A1A1A'};
    color: #F4EFEA;
    transform: translateX(8px);
    border-color: #B0B6C1;
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
  perspective: 1200px;
  transform-style: preserve-3d;
`;

const ProjectCard = styled(motion.div)`
  background: var(--cards-bg);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  width: 75%;
  max-width: 650px;
  height: 75%;
  max-height: 600px;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-color);
  transform-style: preserve-3d;

  &:hover {
    transform: translateY(-8px) rotateX(2deg);
    box-shadow: 0 25px 80px rgba(0, 0, 0, 0.2);
  }

  ${media.tablet} {
    width: 80%;
    max-width: 550px;
    height: 70%;
    max-height: 500px;
  }

  ${media.mobile} {
    width: 85%;
    max-width: none;
    height: 65%;
    max-height: 450px;
  }
`;

const ProjectImage = styled(motion.div)`
  width: 100%;
  height: 50%;
  position: relative;
  overflow: hidden;
  background: var(--primary-btn-bg);
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
    object-position: center;
  }

  ${ProjectCard}:hover & img {
    transform: scale(1.05);
  }
`;

const ImageOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.4s ease;

  ${ProjectCard}:hover & {
    opacity: 0;
  }
`;

const ProjectInfo = styled.div`
  padding: 1.5rem;
  height: 50%;
  display: flex;
  flex-direction: column;
  background: var(--cards-bg);
  gap: 1rem;
  flex-shrink: 0;
  overflow-y: auto;

  ${media.tablet} { 
    padding: 1.2rem;
    gap: 0.8rem;
  }

  ${media.mobile} { 
    padding: 1rem;
    gap: 0.6rem;
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  color: var(--main-text);
  font-weight: 600;
  line-height: 1.2;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  ${media.tablet} { 
    font-size: 1.3rem; 
  }

  ${media.mobile} { 
    font-size: 1.2rem; 
  }
`;

const ProjectDescription = styled.p`
  color: var(--secondary-text);
  line-height: 1.5;
  flex: 1;
  font-size: 0.9rem;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const TechTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin: 0;
`;

const TechTag = styled(motion.span)`
  background: var(--primary-btn-bg);
  color: var(--primary-btn-text);
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: var(--primary-btn-hover);
    transform: translateY(-2px);
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;

  ${media.mobile} { 
    flex-direction: column; 
    gap: 0.8rem; 
  }
`;

const LiveLink = styled(motion.a)`
  background: var(--primary-btn-bg);
  color: var(--primary-btn-text);
  padding: 1rem 2rem;
  border-radius: 15px;
  font-weight: 600;
  text-decoration: none;
  flex: 1;
  text-align: center;
  transition: all 0.4s ease;
  box-shadow: 0 8px 25px rgba(75, 46, 131, 0.4);
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(75, 46, 131, 0.6);
  }
`;

const CodeLink = styled(motion.a)`
  background: var(--secondary-btn-bg);
  color: var(--secondary-btn-text) !important;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  flex: 1;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(108, 76, 196, 0.3);

  &:hover {
    background: var(--secondary-btn-hover);
    color: var(--secondary-btn-text) !important;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 194, 255, 0.4);
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
  width: 55px;
  height: 55px;
  border-radius: 50%;
  border: 2px solid var(--border-color);
  background: var(--cards-bg);
  color: var(--main-text);
  font-size: 1.4rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  backdrop-filter: blur(15px);
  box-shadow: 0 8px 25px rgba(75, 46, 131, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.6s ease;
  }

  &:hover {
    background: var(--primary-btn-bg);
    border-color: var(--link-default);
    transform: scale(1.15) rotate(5deg);
    box-shadow: 0 12px 35px rgba(75, 46, 131, 0.5);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: scale(1.05) rotate(2deg);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    transform: scale(0.9);
  }
`;

const SlideIndicator = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background: var(--primary-btn-bg);
  border-radius: 3px;
  transition: width 0.05s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 0 10px rgba(75, 46, 131, 0.5);
  animation: progressGlow 2s ease-in-out infinite alternate;

  @keyframes progressGlow {
    0% { box-shadow: 0 0 5px rgba(75, 46, 131, 0.3); }
    100% { box-shadow: 0 0 15px rgba(75, 46, 131, 0.7); }
  }
`;

interface IndicatorDotProps {
  $active: boolean;
}

const IndicatorDot = styled(motion.div) <IndicatorDotProps>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${(props) => props.$active
    ? 'linear-gradient(135deg, #4B2E83, #2F80ED)'
    : '#B0B6C1'};
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
  border: 4px solid var(--secondary-text);
  border-top-color: var(--main-text);
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

    // Create main particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 800;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.2,
      color: '#4B2E83',
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create side particles for left and right areas
    const sideParticlesGeometry = new THREE.BufferGeometry();
    const sideParticlesCount = 600;
    const sidePosArray = new Float32Array(sideParticlesCount * 3);

    for (let i = 0; i < sideParticlesCount * 3; i += 3) {
      // Left side particles
      if (i % 6 === 0) {
        sidePosArray[i] = (Math.random() - 1.5) * 80; // Further left
        sidePosArray[i + 1] = (Math.random() - 0.5) * 100;
        sidePosArray[i + 2] = (Math.random() - 0.5) * 80;
      } else {
        // Right side particles
        sidePosArray[i] = (Math.random() + 0.5) * 80; // Further right
        sidePosArray[i + 1] = (Math.random() - 0.5) * 100;
        sidePosArray[i + 2] = (Math.random() - 0.5) * 80;
      }
    }

    sideParticlesGeometry.setAttribute('position', new THREE.BufferAttribute(sidePosArray, 3));

    const sideParticlesMaterial = new THREE.PointsMaterial({
      size: 0.2,
      color: '#2F80ED',
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });

    const sideParticlesMesh = new THREE.Points(sideParticlesGeometry, sideParticlesMaterial);
    scene.add(sideParticlesMesh);

    // Create additional floating particles for more density
    const floatingParticlesGeometry = new THREE.BufferGeometry();
    const floatingParticlesCount = 300;
    const floatingPosArray = new Float32Array(floatingParticlesCount * 3);

    for (let i = 0; i < floatingParticlesCount * 3; i += 3) {
      floatingPosArray[i] = (Math.random() - 0.5) * 120; // Spread across entire width
      floatingPosArray[i + 1] = (Math.random() - 0.5) * 100;
      floatingPosArray[i + 2] = (Math.random() - 0.5) * 80;
    }

    floatingParticlesGeometry.setAttribute('position', new THREE.BufferAttribute(floatingPosArray, 3));

    const floatingParticlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      color: '#F4EFEA',
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    });

    const floatingParticlesMesh = new THREE.Points(floatingParticlesGeometry, floatingParticlesMaterial);
    scene.add(floatingParticlesMesh);

    // Create geometric shapes
    const geometry1 = new THREE.TorusGeometry(10, 3, 16, 100);
    const material1 = new THREE.MeshPhongMaterial({
      color: '#4B2E83',
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const torus = new THREE.Mesh(geometry1, material1);
    scene.add(torus);

    const geometry2 = new THREE.IcosahedronGeometry(8, 0);
    const material2 = new THREE.MeshPhongMaterial({
      color: '#2F80ED',
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const icosahedron = new THREE.Mesh(geometry2, material2);
    icosahedron.position.set(-20, 10, -10);
    scene.add(icosahedron);

    // Add more geometric shapes
    const geometry3 = new THREE.SphereGeometry(5, 32, 32);
    const material3 = new THREE.MeshPhongMaterial({
      color: '#F4EFEA',
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const sphere = new THREE.Mesh(geometry3, material3);
    sphere.position.set(15, -10, -5);
    scene.add(sphere);

    // Add side geometric shapes
    const leftTorusGeometry = new THREE.TorusGeometry(6, 2, 12, 50);
    const leftTorusMaterial = new THREE.MeshPhongMaterial({
      color: '#4B2E83',
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const leftTorus = new THREE.Mesh(leftTorusGeometry, leftTorusMaterial);
    leftTorus.position.set(-25, 5, -8);
    scene.add(leftTorus);

    const rightIcosahedronGeometry = new THREE.IcosahedronGeometry(4, 0);
    const rightIcosahedronMaterial = new THREE.MeshPhongMaterial({
      color: '#2F80ED',
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const rightIcosahedron = new THREE.Mesh(rightIcosahedronGeometry, rightIcosahedronMaterial);
    rightIcosahedron.position.set(25, -5, -10);
    scene.add(rightIcosahedron);

    // Add corner geometric shapes
    const leftTopSphereGeometry = new THREE.SphereGeometry(4, 16, 16);
    const leftTopSphereMaterial = new THREE.MeshPhongMaterial({
      color: '#F4EFEA',
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const leftTopSphere = new THREE.Mesh(leftTopSphereGeometry, leftTopSphereMaterial);
    leftTopSphere.position.set(-35, 18, -5);
    scene.add(leftTopSphere);

    const rightBottomCubeGeometry = new THREE.BoxGeometry(5, 5, 5);
    const rightBottomCubeMaterial = new THREE.MeshPhongMaterial({
      color: '#4B2E83',
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const rightBottomCube = new THREE.Mesh(rightBottomCubeGeometry, rightBottomCubeMaterial);
    rightBottomCube.position.set(35, -18, -8);
    scene.add(rightBottomCube);

    // Add more side geometric shapes for better visibility
    const leftMiddleTorusGeometry = new THREE.TorusGeometry(8, 2, 12, 50);
    const leftMiddleTorusMaterial = new THREE.MeshPhongMaterial({
      color: '#2F80ED',
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const leftMiddleTorus = new THREE.Mesh(leftMiddleTorusGeometry, leftMiddleTorusMaterial);
    leftMiddleTorus.position.set(-40, 0, -12);
    scene.add(leftMiddleTorus);

    const rightTopIcosahedronGeometry = new THREE.IcosahedronGeometry(6, 0);
    const rightTopIcosahedronMaterial = new THREE.MeshPhongMaterial({
      color: '#F4EFEA',
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const rightTopIcosahedron = new THREE.Mesh(rightTopIcosahedronGeometry, rightTopIcosahedronMaterial);
    rightTopIcosahedron.position.set(40, 12, -6);
    scene.add(rightTopIcosahedron);

    const leftBottomConeGeometry = new THREE.ConeGeometry(4, 8, 8);
    const leftBottomConeMaterial = new THREE.MeshPhongMaterial({
      color: '#4B2E83',
      wireframe: true,
      transparent: true,
      opacity: 0.2
    });
    const leftBottomCone = new THREE.Mesh(leftBottomConeGeometry, leftBottomConeMaterial);
    leftBottomCone.position.set(-45, -20, -10);
    scene.add(leftBottomCone);

    const rightMiddleOctahedronGeometry = new THREE.OctahedronGeometry(5);
    const rightMiddleOctahedronMaterial = new THREE.MeshPhongMaterial({
      color: '#2F80ED',
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const rightMiddleOctahedron = new THREE.Mesh(rightMiddleOctahedronGeometry, rightMiddleOctahedronMaterial);
    rightMiddleOctahedron.position.set(42, -8, -14);
    scene.add(rightMiddleOctahedron);

    // Enhanced lighting
    const light1 = new THREE.PointLight('#4B2E83', 2, 100);
    light1.position.set(20, 20, 20);
    scene.add(light1);

    const light2 = new THREE.PointLight('#2F80ED', 2, 100);
    light2.position.set(-20, -20, -20);
    scene.add(light2);

    const light3 = new THREE.PointLight('#F4EFEA', 1, 100);
    light3.position.set(0, 0, 30);
    scene.add(light3);

    camera.position.z = 45;

    // Mouse movement
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Enhanced animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Main particles animation
      particlesMesh.rotation.y += 0.002;
      particlesMesh.rotation.x += 0.001;

      // Side particles animation
      sideParticlesMesh.rotation.y -= 0.001;
      sideParticlesMesh.rotation.z += 0.0005;

      // Floating particles animation
      floatingParticlesMesh.rotation.x += 0.0008;
      floatingParticlesMesh.rotation.y += 0.0012;

      // Center geometric shapes
      torus.rotation.x += 0.008;
      torus.rotation.y += 0.008;

      icosahedron.rotation.x -= 0.005;
      icosahedron.rotation.y -= 0.005;

      sphere.rotation.x += 0.003;
      sphere.rotation.y += 0.003;

      // Side geometric shapes
      leftTorus.rotation.x += 0.006;
      leftTorus.rotation.y += 0.004;

      rightIcosahedron.rotation.x -= 0.004;
      rightIcosahedron.rotation.y -= 0.003;

      // Corner shapes
      leftTopSphere.rotation.x += 0.002;
      leftTopSphere.rotation.y += 0.003;

      rightBottomCube.rotation.x += 0.005;
      rightBottomCube.rotation.y += 0.004;
      rightBottomCube.rotation.z += 0.003;

      // Additional side shapes
      leftMiddleTorus.rotation.x += 0.003;
      leftMiddleTorus.rotation.y += 0.002;

      rightTopIcosahedron.rotation.x -= 0.002;
      rightTopIcosahedron.rotation.y -= 0.003;

      leftBottomCone.rotation.x += 0.004;
      leftBottomCone.rotation.z += 0.002;

      rightMiddleOctahedron.rotation.x += 0.003;
      rightMiddleOctahedron.rotation.y += 0.002;
      rightMiddleOctahedron.rotation.z -= 0.001;

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
  const [activeCategory, setActiveCategory] = useState('web');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [slideProgress, setSlideProgress] = useState(0);

  const handleCategoryChange = (categoryId: string) => {
    setIsLoading(true);
    setActiveCategory(categoryId);
    setCurrentSlide(0);
    setSlideProgress(0);
    setTimeout(() => setIsLoading(false), 500);
  };

  // Show projects based on selected category
  const projectsToDisplay = projectCategories.find(cat => cat.id === activeCategory)?.projects || allProjects;

  // Auto-slide functionality with enhanced progress indicator
  useEffect(() => {
    if (projectsToDisplay.length <= 1) return;

    setSlideProgress(0);

    const progressInterval = setInterval(() => {
      setSlideProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + (100 / (6000 / 30)); // Update every 30ms for smoother progress
      });
    }, 30);

    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % projectsToDisplay.length);
      setSlideProgress(0);
    }, 6000); // Increased to 6 seconds for better viewing time

    return () => {
      clearInterval(progressInterval);
      clearInterval(slideInterval);
    };
  }, [projectsToDisplay.length, currentSlide]);

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
      x: direction > 0 ? 1200 : -1200,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 120 : -120,
      rotateX: direction > 0 ? 15 : -15,
      filter: "blur(10px)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.8
      }
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.8
      }
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1200 : -1200,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 120 : -120,
      rotateX: direction < 0 ? 15 : -15,
      filter: "blur(10px)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.6
      }
    })
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
                      x: { type: "spring", stiffness: 200, damping: 25, duration: 0.8 },
                      opacity: { duration: 0.6, ease: "easeInOut" },
                      scale: { duration: 0.6, ease: "easeInOut" },
                      rotateY: { duration: 0.8, ease: "easeInOut" }
                    }}
                    style={{ display: index === currentSlide ? 'flex' : 'none' }}
                  >
                    <ProjectCard
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProjectImage>
                        {project.image ? (
                          <>
                            <img src={project.image} alt={project.title} loading="lazy" />
                            <ImageOverlay
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 0 }}
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
                            background: 'linear-gradient(135deg, #4B2E83, #2F80ED)',
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
                    <div key={index} style={{ position: 'relative' }}>
                      <IndicatorDot
                        $active={index === currentSlide}
                        onClick={() => goToSlide(index)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      />
                      {index === currentSlide && projectsToDisplay.length > 1 && (
                        <ProgressBar style={{ width: `${slideProgress}%` }} />
                      )}
                    </div>
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