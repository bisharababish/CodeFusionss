import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';

const AboutSection = styled(motion.section)`
  padding: 5rem 1rem 3rem 1rem;  // Increased top padding to 5rem

  background-color: var(--darker-bg);

  /* Mobile-specific padding adjustments */
  @media (max-width: 480px) {
    padding: 4.5rem 0.75rem 2.5rem 0.75rem;  // Increased top padding here too
  }
`;

const AboutContent = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;

  /* Progressive padding reduction for smaller screens */
  @media (max-width: 768px) {
    padding: 0 1.25rem;
  }

  @media (max-width: 480px) {
    padding: 0 1rem;
  }

  @media (max-width: 360px) {
    padding: 0 0.75rem;
  }
`;

const AboutText = styled(motion.div)`
  h2 {
    font-size: 2.5rem;
    margin-top: 2rem;  // Add this line to increase space at the top
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

    /* Responsive font size and alignment for mobile */
    @media (max-width: 768px) {
      font-size: 2rem;
      text-align: center;

      &::after {
        left: 50%;
        transform: translateX(-50%);
      }
    }

    @media (max-width: 480px) {
      font-size: 1.75rem;
      margin-bottom: 1.25rem;
    }

    @media (max-width: 360px) {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
  }

  p {
    margin-bottom: 1.5rem;
    line-height: 1.7;
    opacity: 0.9;

    /* Mobile text adjustments */
    @media (max-width: 768px) {
      text-align: center;
      font-size: 0.95rem;
      line-height: 1.6;
      margin-bottom: 1.25rem;
    }

    @media (max-width: 480px) {
      font-size: 0.9rem;
      line-height: 1.5;
      margin-bottom: 1rem;
    }
  }
`;

const KnowledgeGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2rem;

  /* Progressive grid adjustments for different mobile sizes */
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
    margin-top: 1.5rem;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  @media (max-width: 480px) {
    margin-top: 1.25rem;
    gap: 0.875rem;
  }

  @media (max-width: 360px) {
    margin-top: 1rem;
    gap: 0.75rem;
  }
`;

const KnowledgeItem = styled(motion.div)`
  width: 100%;
  padding: 1.5rem;
  background-color: var(--dark-bg);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  /* Mobile touch target and padding adjustments */
  @media (max-width: 768px) {
    padding: 1.25rem;
    min-height: 100px; /* Ensure good touch target size */
  }

  @media (max-width: 480px) {
    padding: 1rem;
    border-radius: 6px;
  }

  @media (max-width: 360px) {
    padding: 0.875rem;
  }
`;

const KnowledgeTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  /* Mobile font size adjustments */
  @media (max-width: 768px) {
    font-size: 1.35rem;
    margin-bottom: 0.875rem;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
    gap: 0.375rem;
  }

  @media (max-width: 360px) {
    font-size: 1.125rem;
    margin-bottom: 0.625rem;
  }
`;

const TechnologiesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  /* Adjust gaps for smaller screens */
  @media (max-width: 480px) {
    gap: 0.375rem;
  }

  @media (max-width: 360px) {
    gap: 0.25rem;
  }
`;

const TechItem = styled(motion.span)`
  color: var(--light-color);
  padding: 0.25rem 0.5rem;
  font-size: 0.9rem;

  /* Adjust font size and padding for better mobile display */
  @media (max-width: 768px) {
    padding: 0.2rem 0.4rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    padding: 0.15rem 0.35rem;
  }

  @media (max-width: 360px) {
    font-size: 0.8rem;
    padding: 0.1rem 0.3rem;
  }
`;

const About: React.FC = () => {
  const knowledgeAreas = [
    {
      name: 'Web & App Development',
      icon: 'fas fa-laptop-code',
      technologies: ['React.js', 'TypeScript', 'Node.js', 'Next.js', 'HTML/CSS', 'JavaScript'],
    },
    {
      name: 'Database',
      icon: 'fas fa-database',
      technologies: ['SQL', 'PhpMyAdmin', 'MongoDB', '.NET', 'Firebase'],
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const techItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <AboutSection id="about">
      <AboutContent>
        <AboutText>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Passionate team of tech enthusiasts
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            At Code Fusion, we specialize in developing innovative software solutions
            that help businesses grow and adapt to the ever-changing digital landscape.
            Our team combines technical expertise with creative problem-solving to deliver
            results that exceed expectations.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            We have extensive experience in web development, AI integration, and hardware programming.
            Whether you need a custom website, a complex web application, or an innovative AI solution,
            we have the skills and knowledge to bring your ideas to life.
          </motion.p>
          <KnowledgeGrid
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {knowledgeAreas.map((area, index) => (
              <KnowledgeItem
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <KnowledgeTitle>
                  <i className={area.icon}></i> {area.name}
                </KnowledgeTitle>
                <TechnologiesList>
                  {area.technologies.map((tech, techIndex) => (
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
          </KnowledgeGrid>
        </AboutText>
      </AboutContent>
    </AboutSection>
  );
};

export default About;