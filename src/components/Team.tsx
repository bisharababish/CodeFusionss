import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { TeamMember } from '../types';
import bisharaImage from '../components/images/Team/Bish.png';
import JudahImage from '../components/images/Team/Judah.png';
import SalibaImage from '../components/images/Team/Saliba.png';

const TeamSection = styled(motion.section)`
  padding: 6rem 0;
  background-color: var(--darker-bg);

  @media (max-width: 768px) {
    padding: 4rem 0;
  }

  @media (max-width: 480px) {
    padding: 3rem 0;
  }

  @media (max-width: 320px) {
    padding: 2rem 0;
  }
`;

const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    margin-bottom: 3rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
      font-size: 2rem;
    }

    @media (max-width: 480px) {
      font-size: 1.8rem;
      margin-bottom: 0.75rem;
    }

    @media (max-width: 320px) {
      font-size: 1.5rem;
    }
  }

  p {
    max-width: 600px;
    margin: 0 auto;
    opacity: 0.8;

    @media (max-width: 768px) {
      max-width: 90%;
      font-size: 0.95rem;
    }

    @media (max-width: 480px) {
      max-width: 95%;
      font-size: 0.9rem;
    }
  }
`;

const TeamGrid = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    gap: 1.5rem;
    padding: 0 1rem;
  }

  @media (max-width: 480px) {
    gap: 1.25rem;
  }

  @media (max-width: 320px) {
    gap: 1rem;
  }
`;

const TeamCard = styled(motion.div)`
  width: 300px;
  height: 500px;
  perspective: 1000px;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 280px;
    height: 470px;
  }

  @media (max-width: 480px) {
    width: 100%;
    height: 450px;
    max-width: 320px;
  }

  @media (max-width: 320px) {
    height: 400px;
  }
`;

interface CardInnerProps {
  isFlipped: boolean;
}

const CardInner = styled(motion.div) <CardInnerProps>`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s ease;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transform: ${props => props.isFlipped ? 'rotateY(180deg)' : 'rotateY(0)'};

  /* For devices that support hover */
  @media (hover: hover) {
    ${TeamCard}:hover & {
      transform: rotateY(180deg);
    }
  }
`;

const CardFront = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 10px;
  overflow: hidden;
  background-color: rgba(15, 15, 26, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const CardBack = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 10px;
  overflow: hidden;
  background-color: rgba(15, 15, 26, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;

  @media (max-width: 768px) {
    padding: 1.25rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }

  h3 {
    margin-bottom: 0.5rem;
    font-size: 1.2rem;

    @media (max-width: 480px) {
      font-size: 1.1rem;
    }

    @media (max-width: 320px) {
      font-size: 1rem;
    }
  }

  p {
    font-size: 0.9rem;

    @media (max-width: 480px) {
      font-size: 0.85rem;
    }

    @media (max-width: 320px) {
      font-size: 0.8rem;
    }
  }
`;

const MemberImage = styled(motion.div)`
  width: 100%;
  height: 300px;
  overflow: hidden;
  position: relative;

  @media (max-width: 768px) {
    height: 280px;
  }

  @media (max-width: 480px) {
    height: 250px;
  }

  @media (max-width: 320px) {
    height: 220px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const MemberInfo = styled(motion.div)`
  padding: 1.5rem;

  @media (max-width: 768px) {
    padding: 1.25rem;
  }

  @media (max-width: 480px) {
    padding: 1rem 0.75rem;
  }

  @media (max-width: 320px) {
    padding: 0.75rem 0.5rem;
  }

  h3 {
    margin-bottom: 0.5rem;
    font-size: 1.2rem;

    @media (max-width: 480px) {
      font-size: 1.1rem;
      margin-bottom: 0.4rem;
    }

    @media (max-width: 320px) {
      font-size: 1rem;
      margin-bottom: 0.3rem;
    }
  }

  p {
    font-size: 0.9rem;
    color: var(--primary-color);
    margin-bottom: 1rem;

    @media (max-width: 768px) {
      font-size: 0.85rem;
      margin-bottom: 0.75rem;
    }

    @media (max-width: 480px) {
      font-size: 0.8rem;
      margin-bottom: 0.5rem;
      line-height: 1.4;
    }

    @media (max-width: 320px) {
      font-size: 0.75rem;
      line-height: 1.3;
    }
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    gap: 0.85rem;
    margin-top: 0.85rem;
  }

  @media (max-width: 480px) {
    gap: 0.75rem;
    margin-top: 0.75rem;
  }

  @media (max-width: 320px) {
    gap: 0.6rem;
    margin-top: 0.6rem;
  }

  a {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: rgba(108, 92, 231, 0.1);
    transition: all 0.3s ease;

    @media (max-width: 768px) {
      width: 36px;
      height: 36px;
    }

    @media (max-width: 480px) {
      width: 32px;
      height: 32px;
    }

    @media (max-width: 320px) {
      width: 30px;
      height: 30px;
    }

    i {
      font-size: 0.9rem;
      color: var(--light-text);

      @media (max-width: 480px) {
        font-size: 0.85rem;
      }

      @media (max-width: 320px) {
        font-size: 0.8rem;
      }
    }

    &:hover {
      background-color: var(--primary-color);
      transform: translateY(-3px);

      i {
        color: white;
      }
    }

    /* For touch devices */
    @media (hover: none) {
      &:active {
        background-color: var(--primary-color);
        transform: translateY(-3px);

        i {
          color: white;
        }
      }
    }
  }
`;


const Team: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});

  const toggleCardFlip = (id: number) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSocialClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Judah Sleibi',
      role: 'Co-Founder<br>Quality assurance Team Leader<br>Quality Assurance Engineer<br>Artificial Intelligence Specialist<br>Data Scientist Specialist<br>SQL Developer',
      image: JudahImage,
      bio: 'Judah Sleibi ensures top-quality products through meticulous QA expertise.',
      socialLinks: {
        github: 'https://github.com/judahsleibi34',
        linkedin: 'https://linkedin.com/in/judah-sleibi-b8578b321',
        instagram: 'https://instagram.com/judah_sleibi',
      },
    },
    {
      id: 2,
      name: 'Bishara Babish',
      role: 'Co-Founder<br>Development Team Lead<br>Full-Stack Developer',
      image: bisharaImage,
      bio: 'Bishara builds scalable, user-friendly applications as a full-stack developer.',
      socialLinks: {
        github: 'https://github.com/bisharababish',
        linkedin: 'https://www.linkedin.com/in/bisharababish/',
        instagram: 'https://instagram.com/bisharababish_',
      },
    },
    {
      id: 3,
      name: 'Saliba Rishmawi',
      role: 'Co-Founder<br>Artificial Intelligence Specialist<br>Image Processing Specialist<br>Linux System Developer<br>Embedded Systems Developer',
      image: SalibaImage,
      bio: 'Saliba applies AI, image processing, and embedded systems to solve complex problems.',
      socialLinks: {
        github: 'https://github.com/Saliba-codes',
        linkedin: 'https://linkedin.com/in/saliba-rishmawi-b32a11255',
        instagram: 'https://instagram.com/saliba2002',
      },
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const socialLinkVariants = {
    hover: { scale: 1.1, backgroundColor: 'var(--primary-color)' },
    tap: { scale: 0.9 },
  };

  return (
    <TeamSection id="team">
      <div className="container">
        <SectionHeader
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Meet Our Team</h2>
          <p>The talented people behind Code Fusion</p>
        </SectionHeader>

        <TeamGrid>
          {teamMembers.map((member) => (
            <TeamCard
              key={member.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              onClick={() => toggleCardFlip(member.id)}
            >
              <CardInner isFlipped={flippedCards[member.id] || false}>
                <CardFront>
                  <MemberImage>
                    <img src={member.image} alt={member.name} />
                  </MemberImage>
                  <MemberInfo>
                    <h3>{member.name}</h3>
                    <p dangerouslySetInnerHTML={{ __html: member.role }}></p>
                  </MemberInfo>
                </CardFront>
                <CardBack>
                  <h3>{member.name}</h3>
                  <p>{member.bio}</p>
                  <SocialLinks onClick={handleSocialClick}>
                    {member.socialLinks?.github && (
                      <motion.a
                        href={member.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub profile"
                        variants={socialLinkVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <i className="fab fa-github"></i>
                      </motion.a>
                    )}
                    {member.socialLinks?.linkedin && (
                      <motion.a
                        href={member.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn profile"
                        variants={socialLinkVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <i className="fab fa-linkedin-in"></i>
                      </motion.a>
                    )}
                    {member.socialLinks?.instagram && (
                      <motion.a
                        href={member.socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram profile"
                        variants={socialLinkVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <i className="fab fa-instagram"></i>
                      </motion.a>
                    )}
                  </SocialLinks>
                </CardBack>
              </CardInner>
            </TeamCard>
          ))}
        </TeamGrid>
      </div>
    </TeamSection>
  );
};

export default Team;