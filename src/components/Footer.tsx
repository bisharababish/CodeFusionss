// src/components/Footer.tsx
import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: rgba(10, 10, 20, 0.95);
  padding: 3rem 0 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 2rem;
  
  a {
    color: rgba(255, 255, 255, 0.7);
    transition: color 0.3s ease;
    
    &:hover {
      color: var(--primary-color);
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 3rem;
  
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
    
    &:hover {
      background-color: var(--primary-color);
      transform: translateY(-3px);
    }
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.05);
  margin-bottom: 1.5rem;
`;

const CopyrightSection = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
  
  p {
    margin: 0.5rem 0;
  }
`;

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <FooterContainer>
            <FooterContent>
                <FooterLinks>
                    <a href="/">Home</a>
                    <a href="/About">About</a>
                    <a href="/Projects">Projects</a>
                </FooterLinks>

                <SocialLinks>
                    <a href="https://x.com/codefusion218" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                        <i className="fab fa-twitter" aria-hidden="true"></i>
                    </a>
                    <a href="mailto:bishara.babish23@gmail.com" aria-label="Email">
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