import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import bisharaImage from './images/Team/Bishara.jpeg';
import JudahImage from './images/Team/Judah.jpeg';
import SalibaImage from './images/Team/Saliba.jpeg';

const Teams = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const [selectedMember, setSelectedMember] = useState(0);

    useEffect(() => {
        if (!mountRef.current) return;

        const currentMount = mountRef.current;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        currentMount.appendChild(renderer.domElement);

        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 500;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 80;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.1,
            color: '#F4EFEA',
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        const geometry1 = new THREE.SphereGeometry(8, 32, 32);
        const material1 = new THREE.MeshPhongMaterial({
            color: '#F4EFEA',
            wireframe: true,
            transparent: true,
            opacity: 0.15
        });
        const sphere = new THREE.Mesh(geometry1, material1);
        scene.add(sphere);

        const geometry2 = new THREE.ConeGeometry(5, 10, 8);
        const material2 = new THREE.MeshPhongMaterial({
            color: '#F4EFEA',
            wireframe: true,
            transparent: true,
            opacity: 0.1
        });
        const cone = new THREE.Mesh(geometry2, material2);
        cone.position.set(-25, 15, -15);
        scene.add(cone);

        const light1 = new THREE.PointLight('#F4EFEA', 1.2, 100);
        light1.position.set(25, 25, 25);
        scene.add(light1);

        const light2 = new THREE.PointLight('#F4EFEA', 1.2, 100);
        light2.position.set(-25, -25, -25);
        scene.add(light2);

        camera.position.z = 40;

        let mouseX = 0;
        let mouseY = 0;

        const handleMouseMove = (event: MouseEvent) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', handleMouseMove);

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

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            if (currentMount && renderer.domElement && currentMount.contains(renderer.domElement)) {
                currentMount.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    const teamMembers = [
        {
            id: 1,
            name: 'Bishara Babish',
            title: 'Front-End & Mobile Developer',
            image: bisharaImage,
            aboutMe: 'Bishara is a Computer Science graduate from <strong>Al-Quds University</strong> with a focus on <strong>front-end and mobile development</strong>, <strong>IoT projects</strong>, and <strong>full-stack applications</strong>. Skilled in <strong>JavaScript</strong>, <strong>React</strong>, <strong>Node.js</strong>, and <strong>responsive design</strong>, he has contributed to projects ranging from <strong>AI-driven medical tools</strong> to <strong>e-commerce platforms</strong> and <strong>interactive games</strong>.',
            education: 'He gained international experience in <strong>Germany</strong>, where he worked on IoT automation and prototyping projects at <strong>ZeMa International</strong> and <strong>Fab Lab Siegen</strong>. These opportunities strengthened his technical expertise, problem-solving skills, and ability to collaborate in diverse, global teams.',
            interests: 'Bishara combines creativity with strong technical foundations, focusing on building practical, user-friendly web and mobile applications that meet modern business and user needs.',
            socialLinks: {
                github: 'https://github.com/bisharababish',
                linkedin: 'https://www.linkedin.com/in/bisharababish/',
                instagram: 'https://instagram.com/bisharababish_',
                cv: '/cv/BisharaBabishCV.pdf'
            },
        },
        {
            id: 2,
            name: 'Judah Sleibi',
            title: 'AI & QA Engineer',
            image: JudahImage,
            aboutMe: 'Judah is a <strong>Mechatronics Engineering graduate</strong> and a <strong>Master\'s student in Artificial Intelligence</strong> at the <strong>Arab American University</strong>. A self-taught developer with a passion for AI, he has built expertise in <strong>machine learning</strong>, <strong>computer vision</strong>, and <strong>data analytics</strong>, combining his engineering background with advanced research and applied projects.',
            education: 'His work spans from developing the <strong>SparkVision AI Agent</strong>, a hybrid NLP and CNN-based system for detecting digital eye strain in children, to designing <strong>predictive models for early disease detection</strong> and analyzing large-scale datasets for actionable insights. Judah\'s research contributions include a <strong>published paper on AI applications in healthcare</strong>, showcasing his ability to turn complex problems into innovative solutions with real-world impact.',
            interests: 'Alongside his AI focus, Judah has strong experience in <strong>software quality assurance and testing</strong>. He has completed professional training and applied his skills in <strong>manual, automated, API, and mobile testing</strong>, using tools like <strong>Selenium</strong>, <strong>Cypress</strong>, <strong>Appium</strong>, and <strong>Postman</strong>. His QA work includes projects such as the <strong>Jenan Market multi-tenant e-commerce platform</strong>, where he led efforts in <strong>functional validation, performance testing, and scalability assurance</strong>.',
            socialLinks: {
                github: 'https://github.com/judahsleibi34',
                linkedin: 'https://linkedin.com/in/judah-sleibi-b8578b321',
                instagram: 'https://instagram.com/judah_sleibi',
                cv: '/cv/JudahSleibiCV.pdf'
            },
        },
        {
            id: 3,
            name: 'Saliba Rishmawi',
            title: 'AI, Software & Cybersecurity Developer',
            image: SalibaImage,
            aboutMe: 'Saliba is a Computer Science graduate from <strong>Al-Quds University</strong> with a focus on <strong>machine learning</strong>, <strong>computer vision</strong>, <strong>software development</strong>, and <strong>cybersecurity</strong>. Skilled in <strong>Python</strong>, <strong>Java</strong>, <strong>SQL</strong>, <strong>AI frameworks</strong> like PyTorch and U-Net, and with a solid foundation in networking and security, he has worked on projects that apply advanced technologies to real-world challenges.',
            education: 'He gained international experience in <strong>Germany</strong>, completing an exchange semester at <strong>HTW Saar</strong> and joining the <strong>Fab Lab Siegen Summer Program</strong>, where he collaborated on projects in engineering, prototyping, and entrepreneurship. Saliba also co-founded <strong>CodeFusion</strong>, a software development team building AI-driven tools, mobile/desktop applications, and automation solutions.',
            interests: 'His project experience includes developing an <strong>AI-powered brain tumor detection system</strong>, building an <strong>autonomous car prototype</strong>, and creating a <strong>NAS server</strong> for secure data storage and sharing. These experiences highlight his ability to integrate technical expertise, creativity, and cybersecurity awareness into effective solutions.',
            socialLinks: {
                github: 'https://github.com/Saliba-codes',
                linkedin: 'https://linkedin.com/in/saliba-rishmawi-b32a11255',
                instagram: 'https://instagram.com/saliba2002',
                cv: '/cv/SalibaRishmawiCV.pdf'
            },
        },
    ];

    const currentMember = teamMembers[selectedMember];

    return (
        <div style={{
            position: 'relative',
            minHeight: '100vh',
            overflow: 'hidden',
            background: '#0A0A0A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 20px'
        }}>
            <div ref={mountRef} style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0.3,
                zIndex: 0
            }} />

            <div style={{
                position: 'relative',
                zIndex: 1,
                maxWidth: '1200px',
                width: '100%'
            }}>
                {/* Navigation Tabs */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '20px',
                    marginBottom: '40px',
                    flexWrap: 'wrap'
                }}>
                    {teamMembers.map((member, index) => (
                        <button
                            key={member.id}
                            onClick={() => setSelectedMember(index)}
                            style={{
                                padding: '15px 30px',
                                background: selectedMember === index ? 'linear-gradient(135deg, #4B2E83, #2F80ED)' : '#1A1A1A',
                                color: selectedMember === index ? '#F4EFEA' : '#F4EFEA',
                                border: 'none',
                                borderRadius: '10px',
                                fontSize: '16px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                backdropFilter: 'blur(10px)'
                            }}
                            onMouseEnter={(e) => {
                                if (selectedMember !== index) {
                                    e.currentTarget.style.background = '#6C4CC4';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (selectedMember !== index) {
                                    e.currentTarget.style.background = '#1A1A1A';
                                }
                            }}
                        >
                            {member.name}
                        </button>
                    ))}
                </div>

                {/* Profile Content */}
                <motion.div
                    key={selectedMember}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '40px',
                        background: '#1A1A1A',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '20px',
                        padding: '40px',
                        border: '1px solid #B0B6C1',
                        flexWrap: 'wrap'
                    }}
                >
                    {/* Left Side - Image and Basic Info */}
                    <div style={{
                        flex: '0 0 300px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center'
                    }}>
                        <img
                            src={currentMember.image}
                            alt={currentMember.name}
                            style={{
                                width: '250px',
                                height: '250px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                marginBottom: '25px',
                                border: '4px solid #B0B6C1',
                                boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
                            }}
                        />
                        <h2 style={{
                            fontSize: '28px',
                            fontWeight: 700,
                            color: '#F4EFEA',
                            marginBottom: '10px'
                        }}>
                            {currentMember.name}
                        </h2>
                        <p style={{
                            fontSize: '16px',
                            color: '#B0B6C1',
                            marginBottom: '25px'
                        }}>
                            {currentMember.title}
                        </p>
                        <div style={{
                            display: 'flex',
                            gap: '15px',
                            justifyContent: 'center'
                        }}>
                            <a
                                href={currentMember.socialLinks.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    width: '45px',
                                    height: '45px',
                                    borderRadius: '10px',
                                    background: '#1A1A1A',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#F4EFEA',
                                    fontSize: '20px',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'linear-gradient(135deg, #4B2E83, #2F80ED)';
                                    e.currentTarget.style.color = '#F4EFEA';
                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = '#1A1A1A';
                                    e.currentTarget.style.color = '#F4EFEA';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                <i className="fab fa-github"></i>
                            </a>
                            <a
                                href={currentMember.socialLinks.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    width: '45px',
                                    height: '45px',
                                    borderRadius: '10px',
                                    background: '#1A1A1A',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#F4EFEA',
                                    fontSize: '20px',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'linear-gradient(135deg, #4B2E83, #2F80ED)';
                                    e.currentTarget.style.color = '#F4EFEA';
                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = '#1A1A1A';
                                    e.currentTarget.style.color = '#F4EFEA';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                <i className="fab fa-linkedin"></i>
                            </a>
                            <a
                                href={currentMember.socialLinks.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    width: '45px',
                                    height: '45px',
                                    borderRadius: '10px',
                                    background: '#1A1A1A',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#F4EFEA',
                                    fontSize: '20px',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'linear-gradient(135deg, #4B2E83, #2F80ED)';
                                    e.currentTarget.style.color = '#F4EFEA';
                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = '#1A1A1A';
                                    e.currentTarget.style.color = '#F4EFEA';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a
                                href={currentMember.socialLinks.cv}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    width: '45px',
                                    height: '45px',
                                    borderRadius: '10px',
                                    background: '#1A1A1A',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#F4EFEA',
                                    fontSize: '20px',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'linear-gradient(135deg, #4B2E83, #2F80ED)';
                                    e.currentTarget.style.color = '#F4EFEA';
                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = '#1A1A1A';
                                    e.currentTarget.style.color = '#F4EFEA';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                <i className="fas fa-file-pdf"></i>
                            </a>
                        </div>
                    </div>

                    {/* Right Side - Detailed Information */}
                    <div
                        className="team-content"
                        style={{
                            flex: '1',
                            minWidth: '300px',
                            color: '#F4EFEA',
                            overflowY: 'auto',
                            maxHeight: '600px',
                            paddingRight: '20px'
                        }}
                    >
                        <div style={{ marginBottom: '30px' }}>
                            <h3 style={{
                                fontSize: '20px',
                                fontWeight: 700,
                                background: 'linear-gradient(135deg, #4B2E83, #2F80ED)',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                color: 'transparent',
                                marginBottom: '15px',
                                textShadow: '0 0 10px rgba(75, 46, 131, 0.3)'
                            }}>
                                About Me:
                            </h3>
                            <p
                                style={{
                                    fontSize: '15px',
                                    lineHeight: '1.8',
                                    color: '#B0B6C1'
                                }}
                                dangerouslySetInnerHTML={{ __html: currentMember.aboutMe }}
                            />
                        </div>

                        <div style={{ marginBottom: '30px' }}>
                            <h3 style={{
                                fontSize: '20px',
                                fontWeight: 700,
                                background: 'linear-gradient(135deg, #4B2E83, #2F80ED)',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                color: 'transparent',
                                marginBottom: '15px',
                                textShadow: '0 0 10px rgba(75, 46, 131, 0.3)'
                            }}>
                                Education and Experience:
                            </h3>
                            <p
                                style={{
                                    fontSize: '15px',
                                    lineHeight: '1.8',
                                    color: '#B0B6C1'
                                }}
                                dangerouslySetInnerHTML={{ __html: currentMember.education }}
                            />
                        </div>


                        <div style={{ marginBottom: '30px' }}>
                            <h3 style={{
                                fontSize: '20px',
                                fontWeight: 700,
                                background: 'linear-gradient(135deg, #4B2E83, #2F80ED)',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                color: 'transparent',
                                marginBottom: '15px',
                                textShadow: '0 0 10px rgba(75, 46, 131, 0.3)'
                            }}>
                                Personal Interests:
                            </h3>
                            <p
                                style={{
                                    fontSize: '15px',
                                    lineHeight: '1.8',
                                    color: '#B0B6C1'
                                }}
                                dangerouslySetInnerHTML={{ __html: currentMember.interests }}
                            />
                        </div>


                    </div>
                </motion.div>
            </div>

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
            <style dangerouslySetInnerHTML={{
                __html: `
                    .team-content strong {
                        color: #00C2FF !important;
                        font-weight: 700 !important;
                        text-shadow: 0 0 8px rgba(0, 194, 255, 0.3) !important;
                        transition: all 0.3s ease !important;
                    }
                    
                    .team-content p:hover strong {
                        color: #2F80ED !important;
                        text-shadow: 0 0 12px rgba(47, 128, 237, 0.4) !important;
                    }
                `
            }} />
        </div>
    );
};

export default Teams;