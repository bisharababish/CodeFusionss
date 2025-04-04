import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

const primaryColor = '#6C63FF';
const primaryRgb = '108, 99, 255';

const FooterContainer = styled(motion.footer)`
  background-color: rgba(10, 10, 20, 0.95);
  padding: 3rem 0 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  width: 100%;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 2rem 0 1.2rem;
  }
  
  @media (max-width: 480px) {
    padding: 1.5rem 0 1rem;
  }
`;

const BackgroundGlow = styled(motion.div)` 
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(${primaryRgb}, 0.15) 0%, rgba(${primaryRgb}, 0) 70%);
  pointer-events: none;
  z-index: 0;
`;

const FooterContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 0 1rem;
  }
`;

const FooterLinks = styled(motion.div)`
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
`;

const FooterLink = styled(motion.a)`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  padding: 0.5rem;
  position: relative;
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 0.6rem;
  }
  
  &:hover {
    color: ${primaryColor};
  }
`;

const LinkUnderline = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background-color: ${primaryColor};
  width: 100%;
`;

const SocialLinks = styled(motion.div)`
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
`;

const SocialLink = styled(motion.a)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;
  
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
    background-color: ${primaryColor};
  }
  
  i {
    font-size: 1.2rem;
    
    @media (max-width: 480px) {
      font-size: 1.1rem;
    }
  }
`;

const SocialRipple = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  border: 2px solid ${primaryColor};
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
`;

const Divider = styled(motion.div)`
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.05);
  margin-bottom: 1.5rem;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    margin-bottom: 1.3rem;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 1rem;
  }
`;

const DividerGlow = styled(motion.div)`
  position: absolute;
  width: 30px;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(${primaryRgb}, 0) 0%,
    rgba(${primaryRgb}, 0.8) 50%,
    rgba(${primaryRgb}, 0) 100%
  );
  top: 0;
`;

const CopyrightSection = styled(motion.div)`
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

const HeartIcon = styled(motion.span)`
  display: inline-block;
  margin-left: 5px;
  margin-right: 5px;
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const dividerVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 1,
      ease: [0.43, 0.13, 0.23, 0.96],
      delay: 0.3
    }
  }
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const dividerAnimation = useAnimation();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  useEffect(() => {
    const animateDivider = async () => {
      try {
        while (true) {
          await dividerAnimation.start({
            x: "100%",
            transition: { duration: 2, ease: "easeInOut" }
          });
          await dividerAnimation.start({
            x: "-30px",
            transition: { duration: 0 }
          });
          await new Promise(resolve => setTimeout(resolve, 3000));
        }
      } catch (error) {
        console.error("Animation error:", error);
      }
    };

    animateDivider();

    return () => {
      dividerAnimation.stop();
    };
  }, [dividerAnimation]);

  return (
    <FooterContainer
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      onMouseMove={handleMouseMove}
    >
      { }
      <BackgroundGlow
        animate={{
          x: mousePosition.x - 75,
          y: mousePosition.y - 75,
          opacity: 1
        }}
        initial={{ opacity: 0 }}
        transition={{ type: "spring", damping: 15 }}
      />

      <FooterContent>
        <FooterLinks variants={itemVariants}>
          {[
            { name: "Home", href: "#" },
            { name: "Projects", href: "#projects" },
            { name: "About", href: "#about" }
          ].map((item) => (
            <FooterLink
              key={item.name}
              href={item.href}
              aria-label={item.name}
              variants={itemVariants}
              onMouseEnter={() => setActiveLink(item.name)}
              onMouseLeave={() => setActiveLink(null)}
              whileTap={{ scale: 0.95 }}
            >
              {item.name}
              <AnimatePresence>
                {activeLink === item.name && (
                  <LinkUnderline
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </AnimatePresence>
            </FooterLink>
          ))}
        </FooterLinks>

        <SocialLinks variants={itemVariants}>
          {[
            { icon: "fab fa-twitter", url: "https://x.com/codefusion218", label: "Twitter" },
            { icon: "fas fa-envelope", url: "mailto:info@codefusion.me", label: "Email" }
          ].map((social, index) => (
            <SocialLink
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              variants={itemVariants}
              whileHover={{
                y: -5,
                backgroundColor: primaryColor,
                boxShadow: `0 5px 15px rgba(${primaryRgb}, 0.3)`,
                transition: { type: "spring", stiffness: 300 }
              }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.i
                className={social.icon}
                aria-hidden="true"
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 3 + index,
                  ease: "easeInOut"
                }}
              />
              <SocialRipple
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: [0, 0.5, 0],
                  scale: [0.8, 1.3, 1.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeOut"
                }}
              />
            </SocialLink>
          ))}
        </SocialLinks>

        <Divider
          variants={dividerVariants}
          initial="hidden"
          animate="visible"
        >
          <DividerGlow
            initial={{ x: "-30px" }}
            animate={dividerAnimation}
          />
        </Divider>

        <CopyrightSection variants={itemVariants}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            © {currentYear} CodeFusion. All rights reserved.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.span>Designed and developed with </motion.span>
            <HeartIcon
              animate={{
                scale: [1, 1.2, 1],
                color: ["rgba(255, 255, 255, 0.5)", "#ff6b6b", "rgba(255, 255, 255, 0.5)"]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 1
              }}
            >
              ❤️
            </HeartIcon>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              passion.
            </motion.span>
          </motion.p>
        </CopyrightSection>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;