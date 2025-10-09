import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
// Logo image is now served from public directory

const NavContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: var(--primary-btn-bg);
  padding: 1rem 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  height: 64px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  box-shadow: 0 4px 20px rgba(75, 46, 131, 0.3);
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
`;

const Logo = styled(motion.div)`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 700;
  z-index: 1001;
  
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: var(--main-text);
  }
  
  span {
    color: var(--link-default);
  }
  
  img {
    height: 40px;
    width: auto;
    margin-right: 10px;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    transition: opacity 0.3s ease, visibility 0.3s ease;
  }
`;

const NavLinks = styled(motion.nav)`
  display: flex;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  
  @media (min-width: 769px) and (max-width: 1100px) {
    position: relative;
    left: 0;
    transform: none;
    margin: 0 20px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileNavLinks = styled(motion.nav)`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 0;
    right: 0;
    width: 250px;
    height: 100vh;
    background: var(--primary-btn-bg);
    z-index: 999;
    padding-top: 80px;
    box-shadow: -5px 0 15px rgba(75, 46, 131, 0.3);
    backdrop-filter: blur(10px);
  }
`;

const NavList = styled(motion.ul)`
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 20px;
    gap: 1.5rem;
  }
`;

const NavItem = styled(motion.li)`
  position: relative;
  font-weight: 500;
  transition: color 0.3s ease;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 0;
    height: 2px;
    background-color: var(--link-default);
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: var(--link-default);
  }
  
  &:hover::after {
    width: 100%;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px 0;
    text-align: center;
    
    a {
      display: block;
      width: 100%;
    }
  }
`;

const MobileToggle = styled(motion.button)`
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 1001;
  padding: 8px;
  margin-left: auto;
  width: 40px;
  height: 40px;
  position: relative;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const HamburgerLine = styled(motion.div)`
  width: 24px;
  height: 3px;
  background: var(--main-text);
  border-radius: 2px;
  margin: 2px 0;
  transition: all 0.3s ease;
`;

const HamburgerContainer = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Overlay = styled(motion.div) <{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
  display: none;

  @media (max-width: 768px) {
    display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  }
`;

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
    transition: { type: 'tween', duration: 0.3 }
  },
  open: {
    x: 0,
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

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleNavigation = () => {
    closeMenu();
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      if (!mobile && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

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

  return (
    <NavContainer
      className="navbar-content"
      initial="hidden"
      animate="visible"
      variants={navContainerVariants}
      style={{
        boxShadow: scrolled ? '0 8px 25px rgba(75, 46, 131, 0.4)' : '0 4px 20px rgba(75, 46, 131, 0.3)',
        background: 'linear-gradient(135deg, #4B2E83, #2F80ED)'
      }}
    >
      <NavContent>
        <Logo
          whileHover="hover"
          initial="initial"
          variants={logoVariants}
        >
          <Link to="/" onClick={handleNavigation}>
            <img src="/CodeFusion.png" alt="CodeFusion Logo" />
            Code<span>Fusion</span>
          </Link>
        </Logo>

        <NavLinks>
          <NavList>
            <NavItem whileHover="hover" initial="initial" variants={navItemVariants}>
              <Link to="/" onClick={handleNavigation}>Home</Link>
            </NavItem>
            <NavItem whileHover="hover" initial="initial" variants={navItemVariants}>
              <Link to="/projects" onClick={handleNavigation}>Projects</Link>
            </NavItem>
            <NavItem whileHover="hover" initial="initial" variants={navItemVariants}>
              <Link to="/about" onClick={handleNavigation}>About</Link>
            </NavItem>
            <NavItem whileHover="hover" initial="initial" variants={navItemVariants}>
              <Link to="/teams" onClick={handleNavigation}>Team</Link>
            </NavItem>
          </NavList>
        </NavLinks>

        <MobileToggle
          ref={buttonRef}
          onClick={toggleMenu}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle menu"
        >
          <HamburgerContainer $isOpen={isOpen}>
            <HamburgerLine
              animate={isOpen ? {
                rotate: 45,
                y: 7,
                backgroundColor: 'var(--link-default)'
              } : {
                rotate: 0,
                y: 0,
                backgroundColor: 'var(--main-text)'
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
            <HamburgerLine
              animate={isOpen ? {
                opacity: 0,
                scale: 0
              } : {
                opacity: 1,
                scale: 1
              }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            />
            <HamburgerLine
              animate={isOpen ? {
                rotate: -45,
                y: -7,
                backgroundColor: 'var(--link-default)'
              } : {
                rotate: 0,
                y: 0,
                backgroundColor: 'var(--main-text)'
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </HamburgerContainer>
        </MobileToggle>

        <Overlay
          $isOpen={isOpen}
          variants={overlayVariants}
          initial="hidden"
          animate={isOpen ? "visible" : "hidden"}
          onClick={closeMenu}
        />

        <AnimatePresence>
          {isOpen && (
            <MobileNavLinks
              ref={navRef}
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              style={{
                top: '64px',
                height: 'calc(100vh - 64px)',
                paddingTop: '20px',
              }}
            >
              <NavList>
                {["Home", "Projects", "About", "Team"].map((item, index) => (
                  <NavItem
                    key={index}
                    whileHover="hover"
                    initial="initial"
                    variants={listItemVariants}
                  >
                    <Link
                      to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                      onClick={handleNavigation}
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
    </NavContainer >
  );
};

export default Navbar;