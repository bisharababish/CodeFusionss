import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CodeFusion from '../components/images/CodeFusion.png';
import { motion } from 'framer-motion';

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
    background-image: url(${CodeFusion});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.15;
    z-index: -2;
    animation: floatBackground 20s ease-in-out infinite; // Background image animation
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

  h1 {
    font-size: clamp(2.5rem, 6vw, 4rem);
    margin-bottom: 1.5rem;
    line-height: 1.1;
    overflow: hidden;
  }
`;

const WordContainer = styled(motion.div)`
  display: inline-block;
  margin-right: 0.5rem;
  overflow: hidden;
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
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  align-items: center;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const AnimatedButton = styled(motion.div)`
  .button {
    position: relative;
    overflow: hidden;
    z-index: 1;

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

  @media (max-width: 768px) {
    width: 42px;
    height: 42px;

    span {
      display: none;
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

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ContactSection = styled(motion.div)`
  margin-top: 2rem;

  @media (max-width: 768px) {
    margin-top: 3rem;
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
  const particles = Array.from({ length: count }, (_, i) => {
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
`;

const AnimatedWord = styled(motion.span)`
  display: inline-block;
  margin-right: 0.25rem;
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
  const words = text.split(" ");

  const paragraphWordVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: startDelay + custom * wordDelay,
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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
        staggerChildren: 0.15,
        delayChildren: 0.8
      }
    }
  };

  const highlightedWordVariants = {
    hidden: {
      x: 1000,
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

          <AnimatedParagraph text={paragraphText} />

          <ButtonGroup
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 1.8 }}
          >
            <AnimatedButton
              whileHover={{ scale: 1.05 }}
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
          transition={{ duration: 0.5, delay: 2 }}
        >
          <SocialLinksWrapper
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 2.2 }}
          >
            <ContactLabel
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.7 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 2.3 }}
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
                transition={{ duration: 0.4, delay: 2.4 + index * 0.1 }}
                whileHover={{
                  scale: 1.1,
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