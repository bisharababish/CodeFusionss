import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import bisharaImage from '../components/images/Team/Bishara.jpeg';
import JudahImage from '../components/images/Team/Judah.jpeg';
import SalibaImage from '../components/images/Team/Saliba.jpeg';
import BisharaCV from '../components/images/Team/BisharaBabishCV.pdf';
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
            color: '#ffffff',
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

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

        const light1 = new THREE.PointLight('#ffffff', 1.2, 100);
        light1.position.set(25, 25, 25);
        scene.add(light1);

        const light2 = new THREE.PointLight('#ffffff', 1.2, 100);
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
            title: 'Web Designer & Application Co-Developer',
            image: bisharaImage,
            aboutMe: 'I am Bishara Babish, a 22-year-old Computer Science student at Al-Quds University with a keen interest in web design, application development, and documentation. My academic journey and diverse experiences have equipped me with a robust skill set, making me adept at tackling complex projects and delivering high-quality results.',
            education: 'Currently, I am pursuing my Bachelor\'s degree in Computer Science, where I have developed a solid foundation in various programming languages and technologies. My expertise includes Java, C++, SQL, JavaScript, HTML, and CSS, among others. Throughout my studies, I have actively participated in multiple projects, honing my skills in both frontend and backend development. I had the privilege of participating in an engineering exchange program in Germany, which broadened my perspective and provided me with valuable international experience. During this program, I collaborated with diverse teams, enhancing my problem-solving abilities and cultural awareness. My time at ZeMa International further refined my web design and development skills. I worked on several projects, where I was responsible for designing intuitive user interfaces and ensuring seamless user experiences. This role solidified my understanding of industry standards and best practices in web development.',
            interests: 'Beyond my professional pursuits, I have a passion for gaming and coding. These hobbies not only provide a creative outlet but also keep me updated with the latest trends and technologies in the industry. Additionally, I have a strong interest in learning new things about the earth, which fuels my curiosity and drives my desire for continuous learning.',
            socialLinks: {
                github: 'https://github.com/bisharababish',
                linkedin: 'https://www.linkedin.com/in/bisharababish/',
                instagram: 'https://instagram.com/bisharababish_',
                cv: BisharaCV
            },
        },
        {
            id: 2,
            name: 'Judah Sleibi',
            title: 'Quality Assurance1& AI Specialist',
            image: JudahImage,
            aboutMe: 'I am Judah Sleibi, a dedicated Computer Science student specializing in Quality Assurance, Artificial Intelligence, and Data Science. My passion lies in ensuring that every product meets the highest standards of quality through rigorous testing and analysis.',
            education: 'Throughout my academic journey at Al-Quds University, I have developed strong expertise in software testing methodologies, automated testing frameworks, and quality assurance best practices. My coursework has provided me with deep knowledge in AI algorithms, machine learning, and data analysis techniques.',
            projects: 'In our MRI Brain Tumor Recognition project, I serve as the Quality Assurance Specialist. My responsibilities include designing comprehensive test cases, implementing automated testing procedures, and ensuring the reliability and accuracy of our AI model. I also contribute to the development of the machine learning algorithms that power our tumor detection system.',
            interests: 'I am passionate about exploring the intersection of AI and healthcare, constantly seeking ways to apply cutting-edge technology to solve real-world medical challenges. In my free time, I enjoy staying updated with the latest developments in machine learning and participating in coding competitions.',
            conclusion: 'My goal is to contribute to innovative projects that make a meaningful impact on society, particularly in the healthcare sector where technology can save lives and improve patient outcomes.',
            socialLinks: {
                github: 'https://github.com/judahsleibi34',
                linkedin: 'https://linkedin.com/in/judah-sleibi-b8578b321',
                instagram: 'https://instagram.com/judah_sleibi',
                cv: BisharaCV
            },
        },
        {
            id: 3,
            name: 'Saliba Rishmawi',
            title: 'AI & Embedded Systems Specialist',
            image: SalibaImage,
            aboutMe: 'I am Saliba Rishmawi, a Computer Science student with a strong focus on Artificial Intelligence, Image Processing, and Embedded Systems. My expertise lies in developing intelligent systems that can process and analyze visual data in real-time.',
            education: 'My academic background at Al-Quds University has equipped me with comprehensive knowledge in computer vision, neural networks, and embedded systems programming. I have extensive experience with Python, TensorFlow, OpenCV, and various embedded platforms.',
            projects: 'As the AI Specialist in our MRI Brain Tumor Recognition project, I am responsible for developing and optimizing the deep learning models used for tumor detection. I work on image preprocessing, model training, and performance optimization to ensure our system provides accurate and reliable results.',
            interests: 'I am deeply interested in the applications of AI in medical imaging and the potential of embedded systems to bring AI capabilities to edge devices. I enjoy experimenting with new architectures and techniques to improve model accuracy and efficiency.',
            conclusion: 'I believe that the future of healthcare lies in intelligent systems that can assist medical professionals in making faster and more accurate diagnoses. I am excited to be part of projects that push the boundaries of what is possible with AI technology.',
            socialLinks: {
                github: 'https://github.com/Saliba-codes',
                linkedin: 'https://linkedin.com/in/saliba-rishmawi-b32a11255',
                instagram: 'https://instagram.com/saliba2002',
                cv: BisharaCV
            },
        },
    ];

    const currentMember = teamMembers[selectedMember];

    return (
        <div style={{
            position: 'relative',
            minHeight: '100vh',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)',
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
                                background: selectedMember === index ? 'white' : 'rgba(255,255,255,0.1)',
                                color: selectedMember === index ? '#2d3748' : 'white',
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
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (selectedMember !== index) {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
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
                        background: 'rgba(255,255,255,0.05)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '20px',
                        padding: '40px',
                        border: '1px solid rgba(255,255,255,0.1)',
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
                                border: '4px solid rgba(255,255,255,0.2)',
                                boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
                            }}
                        />
                        <h2 style={{
                            fontSize: '28px',
                            fontWeight: 700,
                            color: 'white',
                            marginBottom: '10px'
                        }}>
                            {currentMember.name}
                        </h2>
                        <p style={{
                            fontSize: '16px',
                            color: 'rgba(255,255,255,0.7)',
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
                                    background: 'rgba(255,255,255,0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontSize: '20px',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'white';
                                    e.currentTarget.style.color = '#2d3748';
                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                    e.currentTarget.style.color = 'white';
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
                                    background: 'rgba(255,255,255,0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontSize: '20px',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'white';
                                    e.currentTarget.style.color = '#2d3748';
                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                    e.currentTarget.style.color = 'white';
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
                                    background: 'rgba(255,255,255,0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontSize: '20px',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'white';
                                    e.currentTarget.style.color = '#2d3748';
                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                    e.currentTarget.style.color = 'white';
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
                                    background: 'rgba(255,255,255,0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontSize: '20px',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'white';
                                    e.currentTarget.style.color = '#2d3748';
                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                    e.currentTarget.style.color = 'white';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                <i className="fas fa-file-pdf"></i>
                            </a>
                        </div>
                    </div>

                    {/* Right Side - Detailed Information */}
                    <div style={{
                        flex: '1',
                        minWidth: '300px',
                        color: 'white',
                        overflowY: 'auto',
                        maxHeight: '600px',
                        paddingRight: '20px'
                    }}>
                        <div style={{ marginBottom: '30px' }}>
                            <h3 style={{
                                fontSize: '20px',
                                fontWeight: 700,
                                color: '#ef4444',
                                marginBottom: '15px'
                            }}>
                                About Me:
                            </h3>
                            <p style={{
                                fontSize: '15px',
                                lineHeight: '1.8',
                                color: 'rgba(255,255,255,0.85)'
                            }}>
                                {currentMember.aboutMe}
                            </p>
                        </div>

                        <div style={{ marginBottom: '30px' }}>
                            <h3 style={{
                                fontSize: '20px',
                                fontWeight: 700,
                                color: '#ef4444',
                                marginBottom: '15px'
                            }}>
                                Education and Experience:
                            </h3>
                            <p style={{
                                fontSize: '15px',
                                lineHeight: '1.8',
                                color: 'rgba(255,255,255,0.85)'
                            }}>
                                {currentMember.education}
                            </p>
                        </div>


                        <div style={{ marginBottom: '30px' }}>
                            <h3 style={{
                                fontSize: '20px',
                                fontWeight: 700,
                                color: '#ef4444',
                                marginBottom: '15px'
                            }}>
                                Personal Interests:
                            </h3>
                            <p style={{
                                fontSize: '15px',
                                lineHeight: '1.8',
                                color: 'rgba(255,255,255,0.85)'
                            }}>
                                {currentMember.interests}
                            </p>
                        </div>


                    </div>
                </motion.div>
            </div>

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        </div>
    );
};

export default Teams;