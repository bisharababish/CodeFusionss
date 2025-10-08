import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { TeamMember } from '../types';
import * as THREE from 'three';
import bisharaImage from '../components/images/Team/Bishara.jpeg';
import JudahImage from '../components/images/Team/Judah.jpg';
import SalibaImage from '../components/images/Team/Saliba.jpeg';

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

const TeamSection = styled(motion.section)`
  padding: 8rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
  min-height: 100vh;

  ${media.laptop} { padding: 6rem 0; }
  ${media.tablet} { padding: 5rem 0; }
  ${media.largeMobile} { padding: 4rem 0; }
  ${media.mobile} { padding: 3rem 0.5rem; }
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

const TeamGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
  margin-bottom: 4rem;
  justify-items: center;

  ${media.laptop} { grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2.5rem; }
  ${media.tablet} { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; }
  ${media.mobile} { grid-template-columns: 1fr; gap: 2rem; }
`;

const TeamCard = styled(motion.div)`
  width: 380px;
  height: 520px;
  perspective: 1000px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &:hover {
    transform: translateY(-8px) scale(1.02);
  }

  ${media.laptop} { width: 350px; height: 500px; }
  ${media.tablet} { width: 320px; height: 480px; }
  ${media.mobile} { width: 100%; height: 450px; max-width: 350px; }
`;

interface CardInnerProps {
  isFlipped: boolean;
}

const CardInner = styled(motion.div) <CardInnerProps>`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-style: preserve-3d;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  border-radius: 24px;
  transform: ${props => props.isFlipped ? 'rotateY(180deg)' : 'rotateY(0)'};

  &:hover {
    box-shadow: 0 30px 80px rgba(102, 126, 234, 0.3);
  }

  /* For devices that support hover */
  @media (hover: hover) {
    ${TeamCard}:hover & {
      transform: rotateY(180deg);
    }
  }
`;

const CardFront = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 24px;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%);
  border: 1px solid rgba(102, 126, 234, 0.1);
  backdrop-filter: blur(10px);
  box-shadow: 0 15px 50px rgba(102, 126, 234, 0.2);
`;

const CardBack = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 24px;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color: white;
  text-align: center;

  ${media.tablet} { padding: 1.5rem; }
  ${media.mobile} { padding: 1.25rem; }

  h3 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;

    ${media.mobile} { font-size: 1.3rem; margin-bottom: 0.75rem; }
  }

  p {
    font-size: 1rem;
    line-height: 1.6;
    opacity: 0.9;
    margin-bottom: 1.5rem;

    ${media.mobile} { font-size: 0.9rem; margin-bottom: 1.25rem; }
  }
`;

const MemberImage = styled(motion.div)`
  width: 100%;
  height: 300px;
  overflow: hidden;
  position: relative;

  ${media.laptop} { height: 280px; }
  ${media.tablet} { height: 260px; }
  ${media.mobile} { height: 240px; }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const MemberInfo = styled(motion.div)`
  padding: 2rem;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
  backdrop-filter: blur(5px);

  ${media.tablet} { padding: 1.5rem; }
  ${media.mobile} { padding: 1.25rem; }

  h3 {
    margin-bottom: 0.75rem;
    font-size: 1.4rem;
    font-weight: 700;
    color: #2d3748;
    line-height: 1.3;

    ${media.mobile} { font-size: 1.2rem; margin-bottom: 0.5rem; }
  }

  p {
    font-size: 0.95rem;
    color: #667eea;
    margin-bottom: 1rem;
    line-height: 1.6;
    font-weight: 500;

    ${media.tablet} { font-size: 0.9rem; }
    ${media.mobile} { font-size: 0.85rem; margin-bottom: 0.75rem; }
  }
`;

const ImageOverlay = styled(motion.div)`
  position: absolute;
  top: 3px;
  left: 3px;
  right: 3px;
  bottom: 3px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 700;
  color: white;
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 3;
  border-radius: 21px 21px 0 0;
  backdrop-filter: blur(5px);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  ${TeamCard}:hover & {
    opacity: 1;
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1rem;
  position: relative;
  z-index: 2;

  ${media.mobile} { gap: 1.25rem; margin-top: 0.75rem; }

  a {
    width: 55px;
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%);
    border: 2px solid rgba(255, 255, 255, 0.3);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    backdrop-filter: blur(10px);
    position: relative;
    overflow: hidden;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    ${media.mobile} { width: 50px; height: 50px; }

    i {
      font-size: 1.2rem;
      color: white;
      transition: all 0.3s ease;
      position: relative;
      z-index: 1;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

      ${media.mobile} { font-size: 1.1rem; }
    }

    &:hover {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.3) 100%);
      transform: translateY(-4px) scale(1.15);
      box-shadow: 
        0 12px 35px rgba(255, 255, 255, 0.3),
        0 5px 15px rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.5);

      &:before {
        opacity: 1;
      }

      i {
        color: white;
        transform: scale(1.15) rotate(5deg);
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      }
    }

    /* For touch devices */
    @media (hover: none) {
      &:active {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.3) 100%);
        transform: translateY(-4px) scale(1.15);
        box-shadow: 0 12px 35px rgba(255, 255, 255, 0.3);

        i {
          color: white;
          transform: scale(1.15) rotate(5deg);
        }
      }
    }
  }
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
    const particlesCount = 600;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.12,
      color: '#ffffff',
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create geometric shapes
    const geometry1 = new THREE.SphereGeometry(8, 32, 32);
    const material1 = new THREE.MeshPhongMaterial({
      color: '#ffffff',
      wireframe: true,
      transparent: true,
      opacity: 0.2
    });
    const sphere = new THREE.Mesh(geometry1, material1);
    scene.add(sphere);

    const geometry2 = new THREE.TorusGeometry(12, 4, 16, 100);
    const material2 = new THREE.MeshPhongMaterial({
      color: '#ffffff',
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    const torus = new THREE.Mesh(geometry2, material2);
    torus.position.set(-25, 15, -15);
    scene.add(torus);

    // Lighting
    const light1 = new THREE.PointLight('#ffffff', 1.5, 100);
    light1.position.set(20, 20, 20);
    scene.add(light1);

    const light2 = new THREE.PointLight('#ffffff', 1.5, 100);
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

      sphere.rotation.x += 0.005;
      sphere.rotation.y += 0.005;

      torus.rotation.x -= 0.003;
      torus.rotation.y -= 0.003;

      camera.position.x += (mouseX * 3 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 3 - camera.position.y) * 0.05;
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


const Team: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});

  const toggleCardFlip = (id: number) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSocialClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Judah Sleibi',
      role: 'Co-Founder<br>Quality assurance Team Lead<br>Quality Assurance Engineer<br>Artificial Intelligence Specialist<br>Data Scientist Specialist<br>SQL Developer',
      image: JudahImage,
      bio: 'Judah Sleibi ensures top-quality products through meticulous QA expertise.',
      socialLinks: {
        github: 'https://github.com/judahsleibi34',
        linkedin: 'https://linkedin.com/in/judah-sleibi-b8578b321',
        instagram: 'https://instagram.com/judah_sleibi',
      },
    },
    {
      id: 2,
      name: 'Bishara Babish',
      role: 'Co-Founder<br>Development Team Lead<br>Full-Stack Developer',
      image: bisharaImage,
      bio: 'Bishara builds scalable, user-friendly applications as a full-stack developer.',
      socialLinks: {
        github: 'https://github.com/bisharababish',
        linkedin: 'https://www.linkedin.com/in/bisharababish/',
        instagram: 'https://instagram.com/bisharababish_',
      },
    },
    {
      id: 3,
      name: 'Saliba Rishmawi',
      role: 'Co-Founder<br>Artificial Intelligence Specialist<br>Image Processing Specialist<br>Linux System Developer<br>Embedded Systems Developer',
      image: SalibaImage,
      bio: 'Saliba applies AI, image processing, and embedded systems to solve complex problems.',
      socialLinks: {
        github: 'https://github.com/Saliba-codes',
        linkedin: 'https://linkedin.com/in/saliba-rishmawi-b32a11255',
        instagram: 'https://instagram.com/saliba2002',
      },
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
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

  const socialLinkVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.9 },
  };

  return (
    <TeamSection id="team">
      <ThreeScene />

      <ContentWrapper>
        <SectionHeader
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <Title
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Meet Our Team
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            The talented people behind Code Fusion
          </Subtitle>
        </SectionHeader>

        <TeamGrid
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {teamMembers.map((member) => (
            <TeamCard
              key={member.id}
              variants={cardVariants}
              onClick={() => toggleCardFlip(member.id)}
            >
              <CardInner isFlipped={flippedCards[member.id] || false}>
                <CardFront>
                  <MemberImage>
                    <img src={member.image} alt={member.name} />
                    <ImageOverlay
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      View Profile
                    </ImageOverlay>
                  </MemberImage>
                  <MemberInfo>
                    <h3>{member.name}</h3>
                    <p dangerouslySetInnerHTML={{ __html: member.role }}></p>
                  </MemberInfo>
                </CardFront>
                <CardBack>
                  <h3>{member.name}</h3>
                  <p>{member.bio}</p>
                  <SocialLinks onClick={handleSocialClick}>
                    {member.socialLinks?.github && (
                      <motion.a
                        href={member.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub profile"
                        variants={socialLinkVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <i className="fab fa-github"></i>
                      </motion.a>
                    )}
                    {member.socialLinks?.linkedin && (
                      <motion.a
                        href={member.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn profile"
                        variants={socialLinkVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <i className="fab fa-linkedin-in"></i>
                      </motion.a>
                    )}
                    {member.socialLinks?.instagram && (
                      <motion.a
                        href={member.socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram profile"
                        variants={socialLinkVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <i className="fab fa-instagram"></i>
                      </motion.a>
                    )}
                  </SocialLinks>
                </CardBack>
              </CardInner>
            </TeamCard>
          ))}
        </TeamGrid>
      </ContentWrapper>
    </TeamSection>
  );
};

export default Team;