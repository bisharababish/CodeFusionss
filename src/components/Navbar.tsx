import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import CodeFusion from '../components/images/CodeFusion.png';

// Styled components (keep your existing styles)
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

const SearchResultsOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 2000;
  padding: 100px 20px 20px;
  overflow-y: auto;
  backdrop-filter: blur(5px);
`;

const SearchResultsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: rgba(15, 15, 26, 0.9);
  border-radius: 10px;
  padding: 20px;
  border: 1px solid rgba(108, 92, 231, 0.3);
`;

const SearchResultItem = styled.div`
  padding: 15px;
  margin-bottom: 15px;
  background: rgba(30, 30, 45, 0.7);
  border-radius: 5px;
  border-left: 3px solid var(--primary-color);
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(40, 40, 60, 0.9);
    transform: translateX(5px);
  }
`;

const SearchResultTitle = styled.h3`
  color: var(--primary-color);
  margin-bottom: 8px;
`;

const SearchResultText = styled.div`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
`;

const CloseSearchButton = styled(motion.button)`
  position: fixed;
  top: 20px;
  right: 20px;
  background: var(--primary-color);
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 2001;
  display: flex;
  align-items: center;
  justify-content: center;
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

interface SearchResult {
  id: string;
  section: string;
  text: string;
  element: HTMLElement;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const removeHighlights = () => {
    const highlights = document.querySelectorAll('.search-highlight');
    highlights.forEach(highlight => {
      const parent = highlight.parentNode;
      if (parent) {
        parent.replaceChild(
          document.createTextNode(highlight.textContent || ''),
          highlight
        );
      }
    });
  };

  const highlightAndScrollToMatches = (query: string) => {
    if (!query.trim()) {
      removeHighlights();
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    removeHighlights();
    const results: SearchResult[] = [];
    const regex = new RegExp(query, 'gi');

    // Search through all text nodes in the document
    const textNodes: Node[] = [];
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null
    );

    let node;
    let firstMatch: HTMLElement | null = null;

    while ((node = walker.nextNode())) {
      if (node.nodeType === Node.TEXT_NODE &&
        node.textContent &&
        node.textContent.trim().length > 0 &&
        regex.test(node.textContent)) {
        textNodes.push(node);
      }
    }

    // Process matches
    textNodes.forEach((textNode) => {
      const parent = textNode.parentNode as HTMLElement;
      if (parent && parent.nodeName !== 'SCRIPT' && parent.nodeName !== 'STYLE') {
        // Highlight the match
        const span = document.createElement('span');
        span.innerHTML = textNode.textContent!.replace(
          regex,
          match => `<mark class="search-highlight" style="background-color: yellow; color: black;">${match}</mark>`
        );
        parent.replaceChild(span, textNode);

        // Find the closest section
        let sectionElement = parent.closest('section') || parent.closest('div[id]');
        let sectionName = 'Content';

        if (sectionElement && sectionElement.id) {
          sectionName = sectionElement.id.charAt(0).toUpperCase() + sectionElement.id.slice(1);
        }

        // Get text snippet around the match
        const fullText = textNode.textContent || '';
        const matchIndex = fullText.toLowerCase().indexOf(query.toLowerCase());
        const start = Math.max(0, matchIndex - 30);
        const end = Math.min(fullText.length, matchIndex + query.length + 30);
        const snippet = fullText.substring(start, end);

        results.push({
          id: `${sectionName}-${results.length}-${matchIndex}`,
          section: sectionName,
          text: snippet.replace(
            regex,
            match => `<mark style="background-color: yellow; color: black;">${match}</mark>`
          ),
          element: parent
        });

        if (!firstMatch) {
          firstMatch = parent;
        }
      }
    });

    setSearchResults(results);
    setShowSearchResults(true);

    if (firstMatch) {
      setTimeout(() => {
        scrollToResult(firstMatch);
      }, 100);
    }
  };

  const scrollToResult = (element: HTMLElement | null) => {
    if (!element) return;

    // Scroll to the element
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });

    // Add temporary highlight effect
    const originalBorder = element.style.border;
    element.style.transition = 'all 0.5s ease';
    element.style.border = '2px solid rgba(108, 92, 231, 0.8)';
    element.style.borderRadius = '4px';
    element.style.padding = '2px';

    setTimeout(() => {
      element.style.border = originalBorder;
      element.style.padding = '';
    }, 2000);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    highlightAndScrollToMatches(searchQuery);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (!e.target.value.trim()) {
      removeHighlights();
      setShowSearchResults(false);
    }
  };

  const closeSearchResults = () => {
    removeHighlights();
    setShowSearchResults(false);
    setSearchQuery('');
    if (searchRef.current) {
      searchRef.current.value = '';
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
        {/* Logo */}
        <Logo whileHover="hover" initial="initial" variants={logoVariants}>
          <Link to="/" onClick={(e) => {
            e.preventDefault();
            closeMenu();
            scrollToTop();
          }}>
            <img src={CodeFusion} alt="CodeFusion Logo" />
            Code<span>Fusion</span>
          </Link>
        </Logo>

        {/* Desktop Navigation Links */}
        <NavLinks>
          <NavList>
            <NavItem whileHover="hover" initial="initial" variants={navItemVariants}>
              <Link to="/" onClick={closeMenu}>Home</Link>
            </NavItem>
            <NavItem whileHover="hover" initial="initial" variants={navItemVariants}>
              <Link to="/projects" onClick={closeMenu}>Projects</Link>
            </NavItem>
            <NavItem whileHover="hover" initial="initial" variants={navItemVariants}>
              <Link to="/about" onClick={closeMenu}>About</Link>
            </NavItem>
          </NavList>
        </NavLinks>

        {/* Search Bar */}
        <SearchContainer>
          <form onSubmit={handleSearch} style={{ width: '100%' }}>
            <SearchInput
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
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

      {/* Search Results Overlay */}
      <AnimatePresence>
        {showSearchResults && (
          <>
            <CloseSearchButton
              onClick={closeSearchResults}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ×
            </CloseSearchButton>
            <SearchResultsOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SearchResultsContainer>
                <h2 style={{ color: 'white', marginBottom: '20px' }}>
                  Search Results for: "{searchQuery}"
                </h2>
                {searchResults.length > 0 ? (
                  searchResults.map((result, index) => (
                    <SearchResultItem
                      key={`${result.id}-${index}`}
                      onClick={() => {
                        scrollToResult(result.element);
                        setShowSearchResults(false);
                      }}
                    >
                      <SearchResultTitle>{result.section} Section</SearchResultTitle>
                      <SearchResultText
                        dangerouslySetInnerHTML={{ __html: result.text }}
                      />
                    </SearchResultItem>
                  ))
                ) : (
                  <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    No results found for "{searchQuery}"
                  </p>
                )}
              </SearchResultsContainer>
            </SearchResultsOverlay>
          </>
        )}
      </AnimatePresence>
    </NavContainer>
  );
};

export default Navbar;