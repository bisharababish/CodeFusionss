import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import CodeFusion from '../components/images/CodeFusion.png';

// Styled components
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
    color: var(--light-text);
  }
  
  span {
    color: var(--primary-color);
  }
  
  img {
    height: 40px;
    width: auto;
    margin-right: 10px;
    object-fit: contain;
  }
`;

const NavLinks = styled(motion.nav)`
  display: flex;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

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
    background-color: var(--darker-bg);
    z-index: 999;
    padding-top: 80px;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.2);
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
    align-items: flex-start;
    padding: 20px;
    gap: 1.5rem;
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

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px 0;
    
    a {
      display: block;
      width: 100%;
    }
  }
`;

const MobileToggle = styled(motion.button)`
  display: none;
  background: transparent;
  color: var(--light-text);
  font-size: 1.8rem;
  border: none;
  cursor: pointer;
  z-index: 1001;
  padding: 5px;
  margin-left: 15px;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const SearchContainer = styled(motion.div)`
  position: relative;
  display: flex;
  align-items: center;
  margin-left: auto;
  width: 220px;

 
`;

const SearchInput = styled(motion.input)`
  padding: 0.5rem 2.5rem 0.5rem 1rem;
  border-radius: 20px;
  border: none;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  outline: none;
  transition: all 0.3s ease;
  width: 100%;
  font-size: 0.9rem;

  &:focus {
    background-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 0 2px var(--primary-color);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  @media (max-width: 768px) {
    padding: 0.5rem 2rem 0.5rem 1rem;
  }
`;

const SearchButton = styled(motion.button)`
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  padding: 0;

  @media (max-width: 768px) {
    right: 8px;
  }
`;

interface OverlayProps {
  $isOpen: boolean;
}

const Overlay = styled(motion.div) <OverlayProps>`
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
  const [searchQuery, setSearchQuery] = useState('');
  const navRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      if ((window as any).find) {
        const bodyText = document.body.innerText || document.body.textContent || '';
        const found = bodyText.toLowerCase().includes(searchQuery.toLowerCase());
        if (!found) {
          alert('No results found');
        }
      }
      searchRef.current?.blur();
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        navRef.current &&
        buttonRef.current &&
        !navRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node) &&
        (!searchRef.current || !searchRef.current.contains(event.target as Node))
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
      <NavContent>
        {/* Logo - Always visible */}
        <Logo whileHover="hover" initial="initial" variants={logoVariants}>
          <Link to="/" onClick={closeMenu}>
            <img src={CodeFusion} alt="CodeFusion Logo" />
            Code<span>Fusion</span>
          </Link>
        </Logo>

        {/* Desktop Navigation Links - Centered */}
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

        {/* Search Bar - Right side */}
        <SearchContainer>
          <form onSubmit={handleSearch} style={{ width: '100%' }}>
            <SearchInput
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              ref={searchRef}
            />
            <SearchButton
              type="submit"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </SearchButton>
          </form>
        </SearchContainer>

        {/* Mobile Hamburger Menu */}
        <MobileToggle
          ref={buttonRef}
          onClick={toggleMenu}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle menu"
        >
          {isOpen ? '✕' : '☰'}
        </MobileToggle>

        {/* Mobile Navigation Overlay */}
        <Overlay
          $isOpen={isOpen}
          variants={overlayVariants}
          initial="hidden"
          animate={isOpen ? "visible" : "hidden"}
          onClick={closeMenu}
        />

        {/* Mobile Navigation Menu */}
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
    </NavContainer>
  );
};

export default Navbar;