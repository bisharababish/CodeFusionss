import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: rgba(10, 10, 20, 0.95);
  padding: 3rem 0 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 2rem 0 1.2rem;
  }
  
  @media (max-width: 480px) {
    padding: 1.5rem 0 1rem;
  }
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 0 1rem;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    gap: 1.8rem;
    margin-bottom: 1.8rem;
  }
  
  @media (max-width: 480px) {
    gap: 1.2rem;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 360px) {
    gap: 1rem;
    flex-direction: column;
    align-items: center;
  }
  
  a {
    color: rgba(255, 255, 255, 0.7);
    transition: color 0.3s ease;
    font-size: 1rem;
    padding: 0.5rem;
    
    @media (max-width: 768px) {
      font-size: 0.95rem;
    }
    
    @media (max-width: 480px) {
      font-size: 0.9rem;
      padding: 0.6rem;
    }
    
    &:hover {
      color: var(--primary-color);
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    gap: 1.3rem;
    margin-bottom: 2.5rem;
  }
  
  @media (max-width: 480px) {
    gap: 1.1rem;
    margin-bottom: 2rem;
  }
  
  @media (max-width: 360px) {
    gap: 1.5rem;
  }
  
  a {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    transition: all 0.3s ease;
    
    @media (max-width: 768px) {
      width: 38px;
      height: 38px;
    }
    
    @media (max-width: 480px) {
      width: 36px;
      height: 36px;
    }
    
    @media (max-width: 360px) {
      width: 42px;
      height: 42px;
    }
    
    &:hover {
      background-color: var(--primary-color);
      transform: translateY(-3px);
    }
    
    i {
      font-size: 1.2rem;
      
      @media (max-width: 480px) {
        font-size: 1.1rem;
      }
    }
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.05);
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    margin-bottom: 1.3rem;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 1rem;
  }
`;

const CopyrightSection = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
  padding: 0 1rem;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
  
  @media (max-width: 360px) {
    font-size: 0.75rem;
    line-height: 1.4;
  }
  
  p {
    margin: 0.5rem 0;
    
    @media (max-width: 480px) {
      margin: 0.4rem 0;
    }
  }
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterLinks>
          <a href="/" aria-label="Home">Home</a>
          <a href="/Projects" aria-label="Projects">Projects</a>
          <a href="/About" aria-label="About">About</a>
        </FooterLinks>

        <SocialLinks>
          <a
            href="https://x.com/codefusion218"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <i className="fab fa-twitter" aria-hidden="true"></i>
          </a>
          <a
            href="mailto:bishara.babish23@gmail.com"
            aria-label="Email"
          >
            <i className="fas fa-envelope" aria-hidden="true"></i>
          </a>
        </SocialLinks>

        <Divider />

        <CopyrightSection>
          <p>© {currentYear} CodeFusion. All rights reserved.</p>
          <p>Designed and developed with passion.</p>
        </CopyrightSection>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;