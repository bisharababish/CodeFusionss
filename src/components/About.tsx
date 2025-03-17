import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';

const AboutSection = styled.section`
  padding: 6rem 0;
  background-color: var(--darker-bg);
`;

const AboutContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const AboutText = styled.div`
  h2 {
    font-size: clamp(1.8rem, 4vw, 2.5rem);
    margin-bottom: 1.5rem;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -10px;
      width: 60px;
      height: 3px;
      background-color: var(--primary-color);
    }
  }

  p {
    margin-bottom: 1.5rem;
    line-height: 1.7;
    opacity: 0.9;
  }
`;

const KnowledgeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const KnowledgeItem = styled(motion.div)`
  width: 100%;
  padding: 1.5rem;
  background-color: var(--dark-bg);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const KnowledgeTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TechnologiesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TechItem = styled.span`
  color: var(--light-color);
  padding: 0.25rem 0.5rem;
  font-size: 0.9rem;
`;

const About: React.FC = () => {
  const knowledgeAreas = [
    {
      name: 'Web & App Development',
      icon: 'fas fa-laptop-code',
      technologies: ['React.js', 'TypeScript', 'Node.js', 'Next.js', 'HTML/CSS', 'JavaScript']
    },
    {
      name: 'Database',
      icon: 'fas fa-database',
      technologies: ['SQL', 'PhpMyAdmin', 'MongoDB', '.NET', 'Firebase']
    },
    {
      name: 'Exploratory Data Analysis',
      icon: 'fas fa-chart-line',
      technologies: ['Matplotlib', 'Seaborn']
    },
    {
      name: 'Data analysis',
      icon: 'fas fa-chart-pie',
      technologies: ['Minitab', 'Python', 'Excel', 'Pandas', 'NumPy']
    },
    {
      name: 'Machine learning',
      icon: 'fas fa-brain',
      technologies: ['TensorFlow', 'PyTorch', 'Decision Tree']
    },
    {
      name: 'Quality Assurance',
      icon: 'fas fa-bug',
      technologies: ['Selenium', 'JUnit', 'TestNG', 'Postman', 'Jmeter']
    },
    {
      name: 'Arduino & Raspberry-pi',
      icon: 'fas fa-microchip',
      technologies: ['C/C++', 'Python', 'GPIO']
    },
    {
      name: 'Linux',
      icon: 'fab fa-linux',
      technologies: ['Bash', 'Shell Scripting', 'System Administration']
    },
    {
      name: 'Latex',
      icon: 'fas fa-square-root-alt',
      technologies: ['Overleaf', 'TeX', 'BibTeX']
    },
    {
      name: 'Office & Adobe Software',
      icon: 'fab fa-microsoft',
      technologies: ['Word', 'Excel', 'PowerPoint', 'Photoshop', 'Illustrator', 'Premiere Pro']
    }
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 }
  };

  return (
    <AboutSection id="about">
      <AboutContent>
        <AboutText>
          <h2>Passionate team of tech enthusiasts</h2>
          <p>
            At Code Fusion, we specialize in developing innovative software solutions
            that help businesses grow and adapt to the ever-changing digital landscape.
            Our team combines technical expertise with creative problem-solving to deliver
            results that exceed expectations.
          </p>
          <p>
            We have extensive experience in web development, AI integration, and hardware programming.
            Whether you need a custom website, a complex web application, or an innovative AI solution,
            we have the skills and knowledge to bring your ideas to life.
          </p>
          <KnowledgeGrid ref={ref}>
            {knowledgeAreas.map((area, index) => (
              <KnowledgeItem
                key={index}
                variants={itemVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                exit="exit"
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <KnowledgeTitle>
                  <i className={area.icon}></i> {area.name}
                </KnowledgeTitle>
                <TechnologiesList>
                  {area.technologies.map((tech, techIndex) => (
                    <TechItem key={techIndex}>{tech}</TechItem>
                  ))}
                </TechnologiesList>
              </KnowledgeItem>
            ))}
          </KnowledgeGrid>
        </AboutText>
      </AboutContent>
    </AboutSection>
  );
};

export default About;