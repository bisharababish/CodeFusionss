import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CodeFusion from '../components/images/CodeFusion.png';

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
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 140%; 
    height: 140%;
    height: 140%;
    background-image: url(${CodeFusion});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.10; 
    z-index: -2;
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

const SocialLinksWrapper = styled.div`
  position: absolute;
  right: 3rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  @media (min-width: 768px) and (max-width: 1024px) {
    right: 2rem;
    gap: 1.2rem;
  }
  
  @media (max-width: 768px) {
    position: static;
    margin-top: 2rem;
    transform: none;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 1rem;
  }
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: rgba(30, 30, 38, 0.8);
  color: white;
  transition: all 0.3s ease;
  position: relative;
  
  i {
    font-size: 1.25rem;
  }
  
  span {
    position: absolute;
    right: calc(100% + 15px);
    white-space: nowrap;
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
    padding: 0.5rem 0.75rem;
    border-radius: 4px;
    font-size: 0.85rem;
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s ease;
    transform: translateX(10px);
    
    &::after {
      content: '';
      position: absolute;
      right: -10px;
      top: 50%;
      transform: translateY(-50%);
      border-width: 5px;
      border-style: solid;
      border-color: transparent transparent transparent rgba(0, 0, 0, 0.8);
    }
  }
  
  &:hover {
    opacity: 0.9;
    transform: scale(1.05);
    
    span {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @media (max-width: 768px) {
    width: 42px;
    height: 42px;
    
    span {
      display: none;
    }
  }
`;

const ContactLabel = styled.div`
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1rem;
  opacity: 0.7;
  font-weight: 600;
  
  @media (max-width: 768px) {
    width: 100%;
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
          <SocialLinksWrapper>
            <ContactLabel>Connect With Us</ContactLabel>
            <SocialLink href="https://www.instagram.com/codefusionn/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
              <span>Follow us on Instagram</span>
            </SocialLink>

            <SocialLink href="mailto:codefusion218@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email">
              <i className="fas fa-envelope"></i>
              <span>codefusion218@gmail.com</span>
            </SocialLink>

            <SocialLink href="https://wa.me/+972568302915" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <i className="fab fa-whatsapp"></i>
              <span>+972 56-830-2915</span>
            </SocialLink>

            <SocialLink href="https://x.com/codefusion218" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X">
              <i className="fab fa-twitter"></i>
              <span>Follow us on Twitter/X</span>
            </SocialLink>
          </SocialLinksWrapper>
        </ContactSection>
      </div>
    </HeroSection>
  );
};

export default Hero;