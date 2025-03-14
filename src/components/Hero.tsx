import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 8rem 0 6rem;
  
  &::before {
    content: '';
    position: absolute;
    top: -50px;
    right: -50px;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
    opacity: 0.1;
    filter: blur(50px);
    z-index: -1;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -100px;
    left: -100px;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
    opacity: 0.08;
    filter: blur(70px);
    z-index: -1;
  }
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  
  h1 {
    font-size: clamp(2.5rem, 6vw, 4rem);
    margin-bottom: 1.5rem;
    line-height: 1.1;
  }
  
  p {
    font-size: clamp(1rem, 2vw, 1.2rem);
    margin-bottom: 2rem;
    opacity: 0.8;
    max-width: 600px;
  }
  
  .highlight {
    color: var(--primary-color);
    font-weight: 700;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  align-items: center;
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const SocialLinks = styled.div`
  position: absolute;
  right: 3rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  /* Add this tablet/iPad specific media query */
  @media (min-width: 768px) and (max-width: 1024px) {
    right: 2rem;
    gap: 1.2rem;
  }
  
  @media (max-width: 768px) {
    position: static;
    margin-top: 2rem;
    gap: 1rem;
    transform: none;
  }
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  font-size: 1rem;
  opacity: 0.7;
  transition: all 0.3s ease;
  
  i {
    font-size: 1.5rem;
    margin-right: 0.75rem;
  }
  
span {
  display: none;
  
  @media (max-width: 768px) {
    display: inline;
  }
}
  
  &:hover {
    opacity: 1;
    color: var(--primary-color);
    transform: translateY(-3px);
  }
  
  /* Add this for better spacing on tablets */
  @media (min-width: 768px) and (max-width: 1024px) {
    padding: 0.5rem 0;
  }
  
  @media (max-width: 768px) {
    justify-content: flex-start;
    margin-bottom: 0.5rem;
  }
`;
const ContactSection = styled.div`
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    margin-top: 3rem;
  }
`;

const Hero: React.FC = () => {
  return (
    <HeroSection>
      <div className="container">
        <HeroContent>
          <h1>
            Driving innovation and creating a <span className="highlight">brighter digital future.</span>
          </h1>
          <p>
            Welcome to Code Fusion, a passionate team of developers specialized in building
            custom solutions for businesses and startups. From web applications to AI
            integration, we bring your ideas to life.
          </p>
          <ButtonGroup>
            <Link to="/projects" className="button">
              View Our Work
            </Link>
          </ButtonGroup>
        </HeroContent>

        <ContactSection>
          <SocialLinks>
            <SocialLink href="https://www.instagram.com/codefusionn/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
              <span>Follow us on Instagram</span>
            </SocialLink>

            <SocialLink href="mailto:codefusion218@gmail.com" target="_blank" rel="noopener noreferrer">
              <i className="fas fa-envelope"></i>
              <span>codefusion218@gmail.com</span>
            </SocialLink>

            <SocialLink href="https://wa.me/+972568302915" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp"></i>
              <span>+972 56-830-2915</span>
            </SocialLink>

            <SocialLink href="https://www.linkedin.com/in/bisharababish/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
              <span>Bishara's on LinkedIn</span>
            </SocialLink>
          </SocialLinks>
        </ContactSection>
      </div>
    </HeroSection>
  );
};

export default Hero;