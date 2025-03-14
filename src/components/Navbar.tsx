import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CodeFusionLogo from '../components/images/CodeFusionLogo.png';

const NavContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(8, 8, 15, 0.95);
  padding: 1rem 0;
  z-index: 1000;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 700;
  
  span {
    color: var(--primary-color);
  }

  img {
    height: 40px; // Adjust as needed
    margin-right: 10px; // Adjust as needed
  }
`;

const NavLinks = styled.nav`
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${props => (props.className === 'active' ? '0' : '-100%')};
    width: 70%;
    height: 100vh;
    background-color: var(--darker-bg);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    z-index: 999;
  }
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
  }
`;

const NavItem = styled.li`
  position: relative;
  font-weight: 500;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 0;
    height: 2px;
    background-color: var(--primary-color);
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const MobileToggle = styled.button`
  display: none;
  background: transparent;
  color: var(--light-text);
  font-size: 1.5rem;
  
  @media (max-width: 768px) {
    display: block;
    z-index: 1000;
  }
`;

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavContainer style={{
      boxShadow: scrolled ? '0 5px 15px rgba(0, 0, 0, 0.1)' : 'none',
      backgroundColor: scrolled ? 'rgba(8, 8, 15, 0.98)' : 'rgba(8, 8, 15, 0.85)'
    }}>
      <div className="container">
        <NavContent>
          <Logo>
            <Link to="/">
              <img src={CodeFusionLogo} alt="CodeFusion Logo" />
              Code<span>Fusion</span>
            </Link>
          </Logo>

          <MobileToggle onClick={toggleMenu}>
            {isOpen ? '✕' : '☰'}
          </MobileToggle>

          <NavLinks className={isOpen ? 'active' : ''}>
            <NavList>
              <NavItem>
                <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
              </NavItem>
              <NavItem>
                <Link to="/projects" onClick={() => setIsOpen(false)}>Projects</Link>
              </NavItem>
              <NavItem>
                <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
              </NavItem>
            </NavList>
          </NavLinks>
        </NavContent>
      </div>
    </NavContainer>
  );
};

export default Navbar;