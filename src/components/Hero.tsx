import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CodeFusion from '../components/images/Logo/CodeFusion.png';
import { motion } from 'framer-motion';

const breakpoints = {
  smallMobile: '320px',
  mobile: '480px',
  largeMobile: '600px',
  tablet: '768px',
  largeTablet: '992px'
};

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 8rem 0 6rem;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 6rem 0; 
    min-height: calc(100vh - 60px);
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 5rem 0.5rem; 
    align-items: flex-start;
  }

  @media (max-width: ${breakpoints.smallMobile}) {
    padding: 4rem 0.5rem; 
  }

  &::before {
    content: '';
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 140%;
    height: 140%;
    background-image: url(${CodeFusion});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.15;
    z-index: -2;
    animation: floatBackground 20s ease-in-out infinite;
    
    @media (max-width: ${breakpoints.tablet}) {
      width: 160%;
      opacity: 0.12;
      animation: floatBackground 15s ease-in-out infinite;
    }
    
    @media (max-width: ${breakpoints.mobile}) {
      width: 180%;
      opacity: 0.1;
    }
    
    @media (max-width: ${breakpoints.smallMobile}) {
      width: 200%;
      opacity: 0.08;
    }
  }

  @keyframes floatBackground {
    0% {
      transform: translate(-50%, -50%) translateX(0) translateY(0);
    }
    50% {
      transform: translate(-50%, -50%) translateX(20px) translateY(20px);
    }
    100% {
      transform: translate(-50%, -50%) translateX(0) translateY(0);
    }
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
    animation: floatGradient 15s ease-in-out infinite alternate;
    
    @media (max-width: ${breakpoints.tablet}) {
      width: 300px;
      height: 300px;
      filter: blur(60px);
    }
    
    @media (max-width: ${breakpoints.mobile}) {
      width: 200px;
      height: 200px;
      bottom: -50px;
      left: -50px;
      filter: blur(40px);
    }
    
    @media (max-width: ${breakpoints.smallMobile}) {
      width: 150px;
      height: 150px;
      filter: blur(30px);
    }
  }

  @keyframes floatGradient {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(100px, 100px);
    }
  }
`;

const HeroContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  width: 100%;
  
  @media (max-width: ${breakpoints.tablet}) {
    max-width: 90%;
    margin: 0 auto;
    margin-top: 60px; 
  }
  @media (max-width: ${breakpoints.mobile}) {
    max-width: 100%;
    padding: 0 1rem;
    margin-top: 80px;
  }
  @media (max-width: ${breakpoints.smallMobile}) {
    margin-top: 70px; 
  }

  h1 {
    font-size: clamp(2.5rem, 6vw, 4rem);
    margin-bottom: 1.5rem;
    line-height: 1.1;
    overflow: hidden;
    
    @media (max-width: ${breakpoints.tablet}) {
      font-size: clamp(2.2rem, 5vw, 3.5rem);
      margin-bottom: 1.2rem;
      line-height: 1.2;
    }
    
    @media (max-width: ${breakpoints.mobile}) {
      font-size: clamp(1.8rem, 7vw, 2.8rem);
      margin-bottom: 1rem;
      line-height: 1.3;
    }
    
    @media (max-width: ${breakpoints.smallMobile}) {
      font-size: clamp(1.6rem, 7vw, 2.2rem);
      margin-bottom: 0.8rem;
    }
  }
`;

const WordContainer = styled(motion.div)`
  display: inline-block;
  margin-right: 0.5rem;
  overflow: hidden;
  
  @media (max-width: ${breakpoints.mobile}) {
    margin-right: 0.3rem;
  }
  
  @media (max-width: ${breakpoints.smallMobile}) {
    margin-right: 0.2rem;
  }
`;

const Word = styled(motion.span)`
  display: inline-block;
  white-space: nowrap;
`;

const HighlightedWordContainer = styled(motion.div)`
  display: inline-block;
  overflow: hidden;
`;

const HighlightedWord = styled(motion.span)`
  color: var(--primary-color);
  font-weight: 700;
  display: inline-block;
  margin-right: 0.5rem;
  
  @media (max-width: ${breakpoints.mobile}) {
    margin-right: 0.3rem;
  }
  
  @media (max-width: ${breakpoints.smallMobile}) {
    margin-right: 0.2rem;
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  align-items: center;

  @media (max-width: ${breakpoints.largeMobile}) {
    gap: 0.8rem;
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
`;

const AnimatedButton = styled(motion.div)`
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
  }

  .button {
    position: relative;
    overflow: hidden;
    z-index: 1;
    
    @media (max-width: ${breakpoints.mobile}) {
      display: block;
      width: 100%;
      text-align: center;
      padding: 0.8rem 1rem;
    }
    
    @media (max-width: ${breakpoints.smallMobile}) {
      padding: 0.7rem 0.8rem;
      font-size: 0.9rem;
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.2);
      z-index: -1;
      transition: left 0.3s ease;
    }

    &:hover::before {
      left: 100%;
    }
    
    &:active {
      transform: scale(0.98);
    }
  }
`;

const SocialLinksWrapper = styled(motion.div)`
  position: absolute;
  right: 3rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: 769px) and (max-width: ${breakpoints.largeTablet}) {
    right: 2rem;
    gap: 1.2rem;
  }

  @media (max-width: ${breakpoints.tablet}) {
    position: static;
    margin-top: 2.5rem;
    transform: none;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.2rem;
    width: 100%;
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    margin-top: 2rem;
    gap: 1rem;
    justify-content: space-around;
  }
  
  @media (max-width: ${breakpoints.smallMobile}) {
    margin-top: 1.5rem;
    gap: 0.8rem;
  }
`;

const SocialLink = styled(motion.a)`
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

  @media (max-width: ${breakpoints.tablet}) {
    width: 44px;
    height: 44px;

    i {
      font-size: 1.15rem;
    }

    span {
      display: none; 
    }
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    width: 40px;
    height: 40px;

    i {
      font-size: 1.1rem;
    }
  }
  
  @media (max-width: ${breakpoints.smallMobile}) {
    width: 36px;
    height: 36px;

    i {
      font-size: 1rem;
    }
  }
`;

const ContactLabel = styled(motion.div)`
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1rem;
  opacity: 0.7;
  font-weight: 600;

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
    text-align: center;
    margin-bottom: 0.8rem;
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.85rem;
    letter-spacing: 0.8px;
    margin-bottom: 0.7rem;
  }
  
  @media (max-width: ${breakpoints.smallMobile}) {
    font-size: 0.8rem;
    letter-spacing: 0.6px;
    margin-bottom: 0.6rem;
  }
`;

const ContactSection = styled(motion.div)`
  margin-top: 2rem;

  @media (max-width: ${breakpoints.tablet}) {
    margin-top: 1.8rem;
    width: 100%;
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    margin-top: 1.5rem;
  }
  
  @media (max-width: ${breakpoints.smallMobile}) {
    margin-top: 1.2rem;
  }
`;

const ParticlesContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
  
  @media (max-width: ${breakpoints.tablet}) {
    opacity: 0.8;
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    opacity: 0.7;
  }
  
  @media (max-width: ${breakpoints.smallMobile}) {
    opacity: 0.6;
  }
`;

interface ParticleStyleProps {
  size: number;
  top: string;
  left: string;
  duration: number;
  delay: number;
}

const Particle = styled.div<ParticleStyleProps>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  background: var(--primary-color);
  opacity: 0.5;
  top: ${props => props.top};
  left: ${props => props.left};
  animation: float ${props => props.duration}s linear infinite;
  animation-delay: ${props => props.delay}s;

  @media (max-width: ${breakpoints.tablet}) {
    width: ${props => props.size * 0.8}px;
    height: ${props => props.size * 0.8}px;
    opacity: 0.45;
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    width: ${props => props.size * 0.7}px;
    height: ${props => props.size * 0.7}px;
    opacity: 0.4;
  }
  
  @media (max-width: ${breakpoints.smallMobile}) {
    width: ${props => props.size * 0.6}px;
    height: ${props => props.size * 0.6}px;
    opacity: 0.35;
  }

  @keyframes float {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 0.5;
    }
    50% {
      opacity: 0.3;
    }
    100% {
      transform: translateY(-100vh) rotate(360deg);
      opacity: 0;
    }
  }
`;

interface ParticleProps {
  count: number;
}

const Particles: React.FC<ParticleProps> = ({ count }) => {
  const [windowWidth, setWindowWidth] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  let particleCount = count;
  if (windowWidth <= parseInt(breakpoints.smallMobile)) {
    particleCount = Math.max(8, Math.floor(count * 0.3));
  } else if (windowWidth <= parseInt(breakpoints.mobile)) {
    particleCount = Math.max(12, Math.floor(count * 0.5));
  } else if (windowWidth <= parseInt(breakpoints.tablet)) {
    particleCount = Math.max(15, Math.floor(count * 0.7));
  }

  const particles = Array.from({ length: particleCount }, (_, i) => {
    const size = Math.random() * 5 + 1;
    const top = `${Math.random() * 100 + 50}%`;
    const left = `${Math.random() * 100}%`;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;

    return (
      <Particle
        key={i}
        size={size}
        top={top}
        left={left}
        duration={duration}
        delay={delay}
      />
    );
  });

  return <ParticlesContainer>{particles}</ParticlesContainer>;
};

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/codefusionn/",
    icon: "fab fa-instagram",
    text: "Follow us on Instagram"
  },
  {
    label: "Email",
    href: "mailto:codefusion218@gmail.com",
    icon: "fas fa-envelope",
    text: "codefusion218@gmail.com"
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/+972568302915",
    icon: "fab fa-whatsapp",
    text: "+972 56-830-2915"
  },
  {
    label: "Twitter/X",
    href: "https://x.com/codefusion218",
    icon: "fab fa-twitter",
    text: "Follow us on Twitter/X"
  }
];

const AnimatedParagraphContainer = styled.p`
  font-size: clamp(1rem, 2vw, 1.2rem);
  margin-bottom: 2rem;
  opacity: 0.8;
  max-width: 600px;
  
  @media (max-width: ${breakpoints.tablet}) {
    font-size: clamp(0.95rem, 2.5vw, 1.1rem);
    margin-bottom: 1.8rem;
    max-width: 100%;
    line-height: 1.6;
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    font-size: clamp(0.9rem, 3vw, 1rem);
    margin-bottom: 1.5rem;
    line-height: 1.5;
  }
  
  @media (max-width: ${breakpoints.smallMobile}) {
    font-size: clamp(0.85rem, 3.5vw, 0.95rem);
    margin-bottom: 1.2rem;
    line-height: 1.4;
  }
`;

const AnimatedWord = styled(motion.span)`
  display: inline-block;
  margin-right: 0.25rem;
  
  @media (max-width: ${breakpoints.mobile}) {
    margin-right: 0.2rem;
  }
  
  @media (max-width: ${breakpoints.smallMobile}) {
    margin-right: 0.15rem;
  }
`;

interface AnimatedParagraphProps {
  text: string;
  startDelay?: number;
  wordDelay?: number;
}

const AnimatedParagraph: React.FC<AnimatedParagraphProps> = ({
  text,
  startDelay = 1.5,
  wordDelay = 0.05
}) => {
  const [windowWidth, setWindowWidth] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  let adjustedStartDelay = startDelay;
  let adjustedWordDelay = wordDelay;

  if (windowWidth <= parseInt(breakpoints.smallMobile)) {
    adjustedStartDelay = startDelay * 0.5;
    adjustedWordDelay = wordDelay * 0.5;
  } else if (windowWidth <= parseInt(breakpoints.mobile)) {
    adjustedStartDelay = startDelay * 0.6;
    adjustedWordDelay = wordDelay * 0.6;
  } else if (windowWidth <= parseInt(breakpoints.tablet)) {
    adjustedStartDelay = startDelay * 0.8;
    adjustedWordDelay = wordDelay * 0.8;
  }

  const words = text.split(" ");

  const paragraphWordVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: adjustedStartDelay + custom * adjustedWordDelay,
        ease: "easeOut"
      }
    })
  };

  return (
    <AnimatedParagraphContainer>
      {words.map((word, index) => (
        <AnimatedWord
          key={index}
          custom={index}
          variants={paragraphWordVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
        >
          {word}
        </AnimatedWord>
      ))}
    </AnimatedParagraphContainer>
  );
};

const Hero: React.FC = () => {
  const regularWords = ["Driving", "innovation", "and", "creating", "a"];
  const highlightedWords = ["brighter", "digital", "future."];
  const paragraphText = "Welcome to Code Fusion, a passionate team of developers specialized in building custom solutions for businesses and startups. From web applications to AI integration, we bring your ideas to life.";

  const [windowWidth, setWindowWidth] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getAnimationParams = () => {
    if (windowWidth <= parseInt(breakpoints.smallMobile)) {
      return {
        wordStagger: 0.05,
        highlightedStagger: 0.08,
        highlightedDelay: 0.4,
        buttonDelay: 1,
        contactDelay: 1.2,
        socialDelay: 1.3,
        socialStagger: 0.05,
        highlightedDistance: 200
      };
    } else if (windowWidth <= parseInt(breakpoints.mobile)) {
      return {
        wordStagger: 0.06,
        highlightedStagger: 0.1,
        highlightedDelay: 0.5,
        buttonDelay: 1.2,
        contactDelay: 1.4,
        socialDelay: 1.5,
        socialStagger: 0.06,
        highlightedDistance: 250
      };
    } else if (windowWidth <= parseInt(breakpoints.tablet)) {
      return {
        wordStagger: 0.08,
        highlightedStagger: 0.12,
        highlightedDelay: 0.6,
        buttonDelay: 1.5,
        contactDelay: 1.7,
        socialDelay: 1.8,
        socialStagger: 0.08,
        highlightedDistance: 500
      };
    } else {
      return {
        wordStagger: 0.1,
        highlightedStagger: 0.15,
        highlightedDelay: 0.8,
        buttonDelay: 1.8,
        contactDelay: 2,
        socialDelay: 2.2,
        socialStagger: 0.1,
        highlightedDistance: 1000
      };
    }
  };

  const animParams = getAnimationParams();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: animParams.wordStagger }
    }
  };

  const wordVariants = {
    hidden: {
      y: 50,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  const highlightedContainerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: animParams.highlightedStagger,
        delayChildren: animParams.highlightedDelay
      }
    }
  };

  const highlightedWordVariants = {
    hidden: {
      x: animParams.highlightedDistance,
      opacity: 0
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 70
      }
    }
  };

  return (
    <HeroSection>
      <Particles count={25} />

      <div className="container">
        <HeroContent
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
              style={{ display: "inline" }}
            >
              {regularWords.map((word, index) => (
                <WordContainer key={index} variants={wordVariants}>
                  <Word>{word}</Word>{' '}
                </WordContainer>
              ))}
            </motion.div>

            <motion.div
              variants={highlightedContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
              style={{ display: "inline" }}
            >
              {highlightedWords.map((word, index) => (
                <HighlightedWordContainer key={index} variants={highlightedWordVariants}>
                  <HighlightedWord>
                    {word}
                  </HighlightedWord>
                </HighlightedWordContainer>
              ))}
            </motion.div>
          </motion.h1>

          <AnimatedParagraph
            text={paragraphText}
            startDelay={windowWidth <= parseInt(breakpoints.mobile) ? 1 : 1.5}
            wordDelay={windowWidth <= parseInt(breakpoints.mobile) ? 0.03 : 0.05}
          />

          <ButtonGroup
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.5, delay: animParams.buttonDelay }}
          >
            <AnimatedButton
              whileHover={{
                scale: windowWidth <= parseInt(breakpoints.mobile) ? 1.02 : 1.05
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/projects" className="button">
                View Our Work
              </Link>
            </AnimatedButton>
          </ButtonGroup>
        </HeroContent>

        <ContactSection
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5, delay: animParams.contactDelay }}
        >
          <SocialLinksWrapper
            initial={{
              x: windowWidth <= parseInt(breakpoints.tablet) ? 50 : 100,
              opacity: 0
            }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6, delay: animParams.socialDelay }}
          >
            <ContactLabel
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.7 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{
                duration: 0.5,
                delay: animParams.socialDelay + 0.1
              }}
            >
              Connect With Us
            </ContactLabel>

            {socialLinks.map((link, index) => (
              <SocialLink
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{
                  duration: 0.4,
                  delay: animParams.socialDelay + 0.2 + index * animParams.socialStagger
                }}
                whileHover={{
                  scale: windowWidth <= parseInt(breakpoints.mobile) ? 1.05 : 1.1,
                  backgroundColor: "rgba(70, 70, 90, 0.9)",
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <i className={link.icon}></i>
                <span>{link.text}</span>
              </SocialLink>
            ))}
          </SocialLinksWrapper>
        </ContactSection>
      </div>
    </HeroSection>
  );
};

export default Hero;