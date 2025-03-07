import React from 'react';
import styled from 'styled-components';

const AboutSection = styled.section`
  padding: 6rem 0;
  background-color: var(--darker-bg);
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
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

const TechnologiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const TechItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  i {
    color: var(--primary-color);
  }
`;

const About: React.FC = () => {
  const technologies = [
    { name: 'React.js', icon: 'fab fa-react' },
    { name: 'TypeScript', icon: 'fas fa-code' },
    { name: 'Python', icon: 'fab fa-python' },
    { name: 'Node.js', icon: 'fab fa-node-js' },
    { name: 'OpenCV', icon: 'fas fa-camera' },
    { name: 'Next.js', icon: 'fas fa-network-wired' },
    { name: 'HTML/CSS', icon: 'fab fa-html5' },
    { name: 'JavaScript', icon: 'fab fa-js' },
    { name: 'SystemVerilog', icon: 'fas fa-microchip' },
  ];

  return (
    <AboutSection id="about">
      <div className="container">
        <AboutContent>
          <AboutText>
            <h2>Passionate team of tech enthusiasts</h2>
            <p>
              Welcome to Code Fusion, we specialize in developing innovative software solutions
              that help businesses grow and adapt to the ever-changing digital landscape.
              Our team combines technical expertise with creative problem-solving to deliver
              results that exceed expectations.
            </p>
            <p>
              We have extensive experience in web development, AI integration, and hardware programming.
              Whether you need a custom website, a complex web application, or an innovative AI solution,
              we have the skills and knowledge to bring your ideas to life.
            </p>
            <TechnologiesGrid>
              {technologies.map((tech, index) => (
                <TechItem key={index}>
                  <i className={tech.icon}></i>
                  <span>{tech.name}</span>
                </TechItem>
              ))}
            </TechnologiesGrid>
          </AboutText>
        </AboutContent>
      </div>
    </AboutSection>
  );
};

export default About;