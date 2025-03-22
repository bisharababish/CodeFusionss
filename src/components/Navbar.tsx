import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import CodeFusion from '../components/images/CodeFusion.png';

// Styled components with motion
const NavContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(8, 8, 15, 0.95);
  padding: 1rem 0;
  z-index: 1000;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  height: 64px; 
  display: flex;
  align-items: center;
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Logo = styled(motion.div)`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 700;
  
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: var(--light-text);
  }
  
  span {
    color: var(--primary-color);
  }
  
  img {
    height: 70px; 
    width: auto;
    margin-right: 10px;
    object-fit: contain;
    transform: translateY(4px); 
  }
`;

const NavLinks = styled(motion.nav)`
  @media (max-width: 768px) {
    display: none; /* Hide desktop nav on mobile */
  }
`;

const MobileNavLinks = styled(motion.nav)`
  display: none; /* Hidden by default */
  
  @media (max-width: 768px) {
    display: block; /* Only show on mobile */
    position: fixed;
    top: 0;
    right: 0;
    width: 70%;
    height: 100vh;
    background-color: var(--darker-bg);
    z-index: 999;
  }
`;

const NavList = styled(motion.ul)`
  display: flex;
  list-style: none;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
  }
`;

const NavItem = styled(motion.li)`
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

const MobileToggle = styled(motion.button)`
  display: none;
  background: transparent;
  color: var(--light-text);
  font-size: 1.5rem;
  border: none;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
    z-index: 1000;
  }
`;

const LogoContainer = styled(motion.div)`
  height: 40px;
  overflow: visible;
  display: flex;
  align-items: center;
`;

const LogoLink = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--light-text);
  cursor: pointer;
`;

// Animation variants
const navContainerVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      duration: 0.5
    }
  }
};

const logoVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { type: 'spring', stiffness: 300 }
  }
};

const navItemVariants = {
  initial: { y: 0 },
  hover: {
    y: -3,
    transition: { type: 'spring', stiffness: 300 }
  }
};

const mobileMenuVariants = {
  closed: {
    x: '100%',
    opacity: 0,
    transition: { type: 'tween', duration: 0.3 }
  },
  open: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 0.3,
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const listItemVariants = {
  closed: { x: 20, opacity: 0 },
  open: { x: 0, opacity: 1 }
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

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

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        navRef.current &&
        buttonRef.current &&
        !navRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close menu when screen resizes above mobile breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  return (
    <NavContainer
      initial="hidden"
      animate="visible"
      variants={navContainerVariants}
      style={{
        boxShadow: scrolled ? '0 5px 15px rgba(0, 0, 0, 0.1)' : 'none',
        backgroundColor: scrolled ? 'rgba(8, 8, 15, 0.98)' : 'rgba(8, 8, 15, 0.85)'
      }}
    >
      <div className="container">
        <NavContent>
          <Logo whileHover="hover" initial="initial" variants={logoVariants}>
            <LogoLink href="/">
              <LogoContainer>
                <motion.img
                  src={CodeFusion}
                  alt="CodeFusion Logo"
                  animate={{ rotate: [0, 0, 10, -10, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    times: [0, 0.2, 0.5, 0.8, 1]
                  }}
                />
              </LogoContainer>
              Code
              <motion.span
                initial={{ opacity: 0.8 }}
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Fusion
              </motion.span>
            </LogoLink>
          </Logo>

          <MobileToggle
            ref={buttonRef}
            onClick={toggleMenu}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? '✕' : '☰'}
          </MobileToggle>

          {/* Desktop Navigation - Always rendered but hidden on mobile via CSS */}
          <NavLinks>
            <NavList>
              <NavItem whileHover="hover" initial="initial" variants={navItemVariants}>
                <Link to="/">Home</Link>
              </NavItem>
              <NavItem whileHover="hover" initial="initial" variants={navItemVariants}>
                <Link to="/projects">Projects</Link>
              </NavItem>
              <NavItem whileHover="hover" initial="initial" variants={navItemVariants}>
                <Link to="/about">About</Link>
              </NavItem>
            </NavList>
          </NavLinks>

          {/* Mobile Navigation - Only visible when menu is open */}
          <AnimatePresence>
            {isOpen && (
              <MobileNavLinks
                ref={navRef}
                variants={mobileMenuVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <NavList>
                  {["Home", "Projects", "About"].map((item, index) => (
                    <NavItem
                      key={index}
                      whileHover="hover"
                      initial="initial"
                      variants={listItemVariants}
                    >
                      <Link
                        to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                        onClick={closeMenu}
                      >
                        {item}
                      </Link>
                    </NavItem>
                  ))}
                </NavList>
              </MobileNavLinks>
            )}
          </AnimatePresence>
        </NavContent>
      </div>
    </NavContainer>
  );
};

export default Navbar;