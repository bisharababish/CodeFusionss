import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import * as THREE from 'three';

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

const AboutSection = styled(motion.section)`
  padding: 8rem 0 0 0;
  background: var(--website-bg);
  position: relative;
  overflow: hidden;
  min-height: 100vh;

  ${media.laptop} { padding: 6rem 0 0 0; }
  ${media.tablet} { padding: 5rem 0 0 0; }
  ${media.largeMobile} { padding: 4rem 0 0 0; }
  ${media.mobile} { padding: 4rem 1rem 0 1rem; }
`;

const ThreeBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.4;
`;

const AboutContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;

  ${media.tablet} { padding: 0 1.5rem; }
  ${media.mobile} { padding: 0 1rem; }
`;

const AboutText = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;

  ${media.mobile} { margin-bottom: 3rem; }
`;

const Title = styled(motion.h2)`
  font-size: 4rem;
  font-weight: 800;
  background: var(--primary-btn-bg);
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
  color: var(--secondary-text);
  max-width: 800px;
  margin: 0 auto 2rem;
  line-height: 1.8;
  font-weight: 300;

  ${media.tablet} { font-size: 1.1rem; }
  ${media.mobile} { font-size: 1rem; }
`;

const MasonryContainer = styled(motion.div)`
  margin-top: 3rem;
  position: relative;
  width: 100%;
`;

const MasonryColumn = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(${props => props.columns}, 1fr);
  gap: 1rem;
  align-items: start;
  position: relative;

  /* Connecting lines between columns */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: calc(33.333% - 0.5px);
    width: 1px;
    background: linear-gradient(to bottom, 
      transparent 0%, 
      rgba(75, 46, 131, 0.3) 20%, 
      rgba(75, 46, 131, 0.1) 50%, 
      rgba(75, 46, 131, 0.3) 80%, 
      transparent 100%
    );
    z-index: 0;
    animation: connectPulse 3s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: calc(66.666% - 0.5px);
    width: 1px;
    background: linear-gradient(to bottom, 
      transparent 0%, 
      rgba(47, 128, 237, 0.3) 20%, 
      rgba(47, 128, 237, 0.1) 50%, 
      rgba(47, 128, 237, 0.3) 80%, 
      transparent 100%
    );
    z-index: 0;
    animation: connectPulse 3s ease-in-out infinite reverse;
  }

  @keyframes connectPulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.8; }
  }

  ${media.laptop} { 
    grid-template-columns: repeat(${props => Math.min(props.columns, 3)}, 1fr); 
    gap: 0.8rem; 
    
    &::after {
      display: none; /* Hide second line on smaller screens */
    }
  }
  ${media.tablet} { 
    grid-template-columns: repeat(${props => Math.min(props.columns, 2)}, 1fr); 
    gap: 0.6rem; 
    
    &::before, &::after {
      display: none; /* Hide connecting lines on mobile */
    }
  }
  ${media.mobile} { 
    grid-template-columns: 1fr; 
    gap: 0.5rem; 
  }
`;

const KnowledgeItem = styled(motion.div)`
  width: 100%;
  padding: 2rem;
  background: var(--cards-bg);
  border-radius: 20px;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.1),
    0 8px 25px rgba(75, 46, 131, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  border: 1px solid var(--border-color);
  backdrop-filter: blur(15px);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  break-inside: avoid;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  z-index: 2;

  /* Connection glow effect */
  &::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: var(--primary-btn-bg);
    border-radius: 22px;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--primary-btn-bg);
    opacity: 0.05;
    z-index: 1;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 
      0 30px 80px rgba(0, 0, 0, 0.15),
      0 15px 50px rgba(75, 46, 131, 0.25);
    
    &::after {
      opacity: 1;
    }

    h3 {
      text-shadow: 0 0 20px rgba(75, 46, 131, 0.6) !important;
      filter: brightness(1.2);
    }
  }

  /* Adjacent card connection effect */
  &:hover + & {
    transform: translateY(-4px);
  }

  ${media.tablet} { 
    padding: 1.5rem; 
    margin-bottom: 0.8rem; 
  }
  ${media.mobile} { 
    padding: 1.25rem; 
    margin-bottom: 0.6rem; 
  }
`;

const KnowledgeTitle = styled.h3`
  font-size: 1.6rem;
  margin-bottom: 1.5rem;
  background: var(--primary-btn-bg);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 700;
  position: relative;
  z-index: 3;
  transition: all 0.3s ease;
  text-shadow: 0 0 10px rgba(75, 46, 131, 0.3);

  i {
    background: var(--primary-btn-bg);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-size: 1.4rem;
    transition: all 0.3s ease;
  }

  ${media.tablet} { font-size: 1.4rem; margin-bottom: 1.25rem; gap: 0.5rem; }
  ${media.mobile} { font-size: 1.3rem; margin-bottom: 1rem; }
`;

const TechnologiesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

 
  @media (max-width: 480px) {
    gap: 0.375rem;
  }

  @media (max-width: 360px) {
    gap: 0.25rem;
  }
`;

const TechItem = styled(motion.span)`
  background: var(--cards-bg);
  color: var(--link-default);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  border: 1.5px solid var(--border-color);
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;

  &:hover {
    background: var(--primary-btn-bg);
    color: var(--primary-btn-text);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(75, 46, 131, 0.3);
  }

  ${media.tablet} { padding: 0.4rem 0.8rem; font-size: 0.85rem; }
  ${media.mobile} { padding: 0.35rem 0.7rem; font-size: 0.8rem; }
`;

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
    const particlesCount = 700;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      color: '#F4EFEA',
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create geometric shapes
    const geometry1 = new THREE.BoxGeometry(10, 10, 10);
    const material1 = new THREE.MeshPhongMaterial({
      color: '#F4EFEA',
      wireframe: true,
      transparent: true,
      opacity: 0.2
    });
    const box = new THREE.Mesh(geometry1, material1);
    scene.add(box);

    const geometry2 = new THREE.CylinderGeometry(6, 6, 12, 16);
    const material2 = new THREE.MeshPhongMaterial({
      color: '#F4EFEA',
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    const cylinder = new THREE.Mesh(geometry2, material2);
    cylinder.position.set(-30, 20, -20);
    scene.add(cylinder);

    // Lighting
    const light1 = new THREE.PointLight('#F4EFEA', 1.2, 100);
    light1.position.set(25, 25, 25);
    scene.add(light1);

    const light2 = new THREE.PointLight('#F4EFEA', 1.2, 100);
    light2.position.set(-25, -25, -25);
    scene.add(light2);

    camera.position.z = 45;

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

      box.rotation.x += 0.006;
      box.rotation.y += 0.006;

      cylinder.rotation.x -= 0.004;
      cylinder.rotation.y -= 0.004;

      camera.position.x += (mouseX * 4 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 4 - camera.position.y) * 0.05;
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

// Custom hook for masonry layout
const useMasonry = (items: any[], columns: number) => {
  const [columnData, setColumnData] = useState<any[][]>([]);

  useEffect(() => {
    const distributeItems = () => {
      const newColumns: any[][] = Array.from({ length: columns }, () => []);

      items.forEach((item, index) => {
        // Calculate which column has the least items or is shortest
        const shortestColumnIndex = newColumns.reduce((shortest, column, index) => {
          return column.length < newColumns[shortest].length ? index : shortest;
        }, 0);

        newColumns[shortestColumnIndex].push(item);
      });

      setColumnData(newColumns);
    };

    distributeItems();
  }, [items, columns]);

  return columnData;
};

const About: React.FC = () => {
  const [columns, setColumns] = useState(3);

  const knowledgeAreas = [
    {
      name: 'Web & App Development',
      icon: 'fas fa-laptop-code',
      technologies: ['React.js', 'TypeScript', 'Node.js', 'Next.js', 'HTML/CSS', 'JavaScript'],
    },
    {
      name: 'Database',
      icon: 'fas fa-database',
      technologies: ['SQL', 'MongoDB', 'Firebase'],
    },
    {
      name: 'Exploratory Data Analysis',
      icon: 'fas fa-chart-line',
      technologies: ['Matplotlib', 'Seaborn'],
    },
    {
      name: 'Data analysis',
      icon: 'fas fa-chart-pie',
      technologies: ['Minitab', 'Python', 'Excel', 'Pandas', 'NumPy'],
    },
    {
      name: 'Machine learning',
      icon: 'fas fa-brain',
      technologies: ['TensorFlow', 'PyTorch', 'Decision Tree'],
    },
    {
      name: 'Quality Assurance',
      icon: 'fas fa-bug',
      technologies: ['Selenium', 'JUnit', 'TestNG', 'Postman', 'Jmeter'],
    },
    {
      name: 'Arduino & Raspberry-pi',
      icon: 'fas fa-microchip',
      technologies: ['C/C++', 'Python', 'GPIO'],
    },
    {
      name: 'Linux',
      icon: 'fab fa-linux',
      technologies: ['Bash', 'Shell Scripting', 'System Administration'],
    },
    {
      name: 'Latex',
      icon: 'fas fa-square-root-alt',
      technologies: ['Overleaf', 'TeX', 'BibTeX'],
    },
    {
      name: 'Office & Adobe Software',
      icon: 'fab fa-microsoft',
      technologies: ['Word', 'Excel', 'PowerPoint', 'Photoshop', 'Illustrator', 'Premiere Pro'],
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    amount: 0.1,
  });

  // Update columns based on screen size
  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth >= 1024) {
        setColumns(3);
      } else if (window.innerWidth >= 768) {
        setColumns(2);
      } else {
        setColumns(1);
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const columnData = useMasonry(knowledgeAreas, columns);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const techItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <AboutSection id="about">
      <ThreeScene />

      <AboutContent>
        <AboutText
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <Title
            initial={{ opacity: 0, y: -50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            About CodeFusion
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            At Code Fusion, we specialize in developing innovative software solutions
            that help businesses grow and adapt to the ever-changing digital landscape.
            Our team combines technical expertise with creative problem-solving to deliver
            results that exceed expectations.
          </Subtitle>
          <Subtitle
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We have extensive experience in web development, AI integration, and hardware programming.
            Whether you need a custom website, a complex web application, or an innovative AI solution,
            we have the skills and knowledge to bring your ideas to life.
          </Subtitle>
          <MasonryContainer
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <MasonryColumn columns={columns}>
              {columnData.map((column, columnIndex) => (
                <div key={columnIndex} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {column.map((area, itemIndex) => (
                    <KnowledgeItem
                      key={`${columnIndex}-${itemIndex}`}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <KnowledgeTitle>
                        <i className={area.icon}></i> {area.name}
                      </KnowledgeTitle>
                      <TechnologiesList>
                        {area.technologies.map((tech: string, techIndex: number) => (
                          <TechItem
                            key={techIndex}
                            variants={techItemVariants}
                            initial="hidden"
                            animate={isInView ? 'visible' : 'hidden'}
                            transition={{ delay: techIndex * 0.05 }}
                          >
                            {tech}
                          </TechItem>
                        ))}
                      </TechnologiesList>
                    </KnowledgeItem>
                  ))}
                </div>
              ))}
            </MasonryColumn>
          </MasonryContainer>
        </AboutText>
      </AboutContent>
    </AboutSection>
  );
};

export default About;