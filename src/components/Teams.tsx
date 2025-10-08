import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import * as THREE from 'three';
import bisharaImage from '../components/images/Team/Bishara.jpeg';
import JudahImage from '../components/images/Team/Judah.jpeg';
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

const TeamsSection = styled(motion.section)`
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
  opacity: 0.4;
`;

const TeamsContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;

  ${media.tablet} { padding: 0 1.5rem; }
  ${media.mobile} { padding: 0 1rem; }
`;


const TeamGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2rem;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;

  ${media.laptop} { 
    grid-template-columns: repeat(2, 1fr); 
    gap: 1.5rem; 
  }
  ${media.tablet} { 
    grid-template-columns: 1fr; 
    gap: 1.5rem; 
    max-width: 400px;
  }
  ${media.mobile} { 
    grid-template-columns: 1fr; 
    gap: 1.5rem; 
    margin-top: 1.5rem; 
    max-width: 350px;
  }
`;

const ResumeCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%);
  border-radius: 20px;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.1),
    0 8px 25px rgba(102, 126, 234, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(102, 126, 234, 0.1);
  backdrop-filter: blur(15px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  min-height: 350px;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
    z-index: 1;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 
      0 30px 80px rgba(0, 0, 0, 0.15),
      0 15px 50px rgba(102, 126, 234, 0.25);
  }

  ${media.tablet} { padding: 1.5rem; min-height: 320px; }
  ${media.mobile} { padding: 1.25rem; min-height: 300px; }
`;

const MemberImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 2;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
  transition: transform 0.3s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${ResumeCard}:hover & {
    transform: scale(1.05);
  }
`;

const MemberInfo = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  width: 100%;
`;

const MemberName = styled.h3`
  font-size: 1.6rem;
  margin-bottom: 0.8rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: 700;

  ${media.tablet} { font-size: 1.4rem; }
  ${media.mobile} { font-size: 1.3rem; }
`;

const MemberAbout = styled.p`
  font-size: 0.9rem;
  color: #4a5568;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
  text-align: center;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
  position: relative;
  z-index: 2;
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 1.2rem;

  &:hover {
    transform: translateY(-3px) scale(1.1);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
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
        const particlesCount = 500;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 80;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.1,
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
            opacity: 0.15
        });
        const sphere = new THREE.Mesh(geometry1, material1);
        scene.add(sphere);

        const geometry2 = new THREE.ConeGeometry(5, 10, 8);
        const material2 = new THREE.MeshPhongMaterial({
            color: '#ffffff',
            wireframe: true,
            transparent: true,
            opacity: 0.1
        });
        const cone = new THREE.Mesh(geometry2, material2);
        cone.position.set(-25, 15, -15);
        scene.add(cone);

        // Lighting
        const light1 = new THREE.PointLight('#ffffff', 1.2, 100);
        light1.position.set(25, 25, 25);
        scene.add(light1);

        const light2 = new THREE.PointLight('#ffffff', 1.2, 100);
        light2.position.set(-25, -25, -25);
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

            particlesMesh.rotation.y += 0.001;
            particlesMesh.rotation.x += 0.0005;

            sphere.rotation.x += 0.004;
            sphere.rotation.y += 0.004;

            cone.rotation.x -= 0.003;
            cone.rotation.y -= 0.003;

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

const Teams: React.FC = () => {
    const handleSocialClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const teamMembers = [
        {
            id: 1,
            name: 'Judah Sleibi',
            about: 'Co-Founder specializing in Quality Assurance, AI, and Data Science. Expert in ensuring top-quality products through meticulous testing and analysis.',
            image: JudahImage,
            socialLinks: {
                github: 'https://github.com/judahsleibi34',
                linkedin: 'https://linkedin.com/in/judah-sleibi-b8578b321',
                instagram: 'https://instagram.com/judah_sleibi',
            },
        },
        {
            id: 2,
            name: 'Bishara Babish',
            about: 'Co-Founder and Development Team Lead. Full-Stack Developer focused on building scalable, user-friendly applications and leading development initiatives.',
            image: bisharaImage,
            socialLinks: {
                github: 'https://github.com/bisharababish',
                linkedin: 'https://www.linkedin.com/in/bisharababish/',
                instagram: 'https://instagram.com/bisharababish_',
            },
        },
        {
            id: 3,
            name: 'Saliba Rishmawi',
            about: 'Co-Founder specializing in AI, Image Processing, and Embedded Systems. Expert in applying cutting-edge technology to solve complex real-world problems.',
            image: SalibaImage,
            socialLinks: {
                github: 'https://github.com/Saliba-codes',
                linkedin: 'https://linkedin.com/in/saliba-rishmawi-b32a11255',
                instagram: 'https://instagram.com/saliba2002',
            },
        },
    ];

    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: false,
        amount: 0.1,
    });

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

    return (
        <TeamsSection id="teams">
            <ThreeScene />

            <TeamsContent>
                <TeamGrid
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    {teamMembers.map((member) => (
                        <ResumeCard
                            key={member.id}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <MemberImage>
                                <img src={member.image} alt={member.name} />
                            </MemberImage>
                            <MemberInfo>
                                <MemberName>{member.name}</MemberName>
                                <MemberAbout>{member.about}</MemberAbout>
                                <SocialLinks>
                                    <SocialLink
                                        href={member.socialLinks?.github || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={handleSocialClick}
                                    >
                                        <i className="fab fa-github"></i>
                                    </SocialLink>
                                    <SocialLink
                                        href={member.socialLinks?.linkedin || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={handleSocialClick}
                                    >
                                        <i className="fab fa-linkedin"></i>
                                    </SocialLink>
                                    <SocialLink
                                        href={member.socialLinks?.instagram || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={handleSocialClick}
                                    >
                                        <i className="fab fa-instagram"></i>
                                    </SocialLink>
                                </SocialLinks>
                            </MemberInfo>
                        </ResumeCard>
                    ))}
                </TeamGrid>
            </TeamsContent>
        </TeamsSection>
    );
};

export default Teams;
