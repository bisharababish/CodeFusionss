import React from 'react';
import styled from 'styled-components';
import { TeamMember } from '../types';
import bisharaImage from '../components/images/Bish.png';
import JudahImage from '../components/images/Judah.png';
import SalibaImage from '../components/images/Saliba.png';

const TeamSection = styled.section`
  padding: 6rem 0;
  background-color: var(--darker-bg);
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  
  h2 {
    font-size: clamp(1.8rem, 4vw, 2.5rem);
    margin-bottom: 1rem;
  }
  
  p {
    max-width: 600px;
    margin: 0 auto;
    opacity: 0.8;
  }
`;

const TeamGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
`;

const TeamCard = styled.div`
  background-color: rgba(15, 15, 26, 0.5);
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.05);
  text-align: center;
  width: 300px; /* Fixed width for all cards */
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const MemberImage = styled.div`
  width: 100%;
  height: 300px; 
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
    position: absolute;
    top: 0;
    left: 0;
  }
  
  ${TeamCard}:hover & img {
    transform: scale(1.05);
  }
`;

const MemberInfo = styled.div`
  padding: 1.5rem;
  
  h3 {
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }
  
  p {
    font-size: 0.9rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
  
  a {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;                                  
    border-radius: 50%;
    background-color: rgba(108, 92, 231, 0.1);
    transition: all 0.3s ease;
    
    i {
      font-size: 0.9rem;
      color: var(--light-text);
    }
    
    &:hover {
      background-color: var(--primary-color);
      transform: translateY(-3px);
      
      i {
        color: white;
      }
    }
  }
`;

const Team: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Judah Sleibi',
      role: 'Co-Founder<br>Quality assurance Team Leader<br>Quality Assurance Engineer<br>Artificial Intelligence Specialist<br>Data Scientist Specialist<br>SQL Developer',
      image: JudahImage,
      socialLinks: {
        github: 'https://github.com/judahsleibi34',
        linkedin: 'https://linkedin.com/in/judah-sleibi-b8578b321',
        instagram: 'https://instagram.com/judah_sleibi'
      }
    },
    {
      id: 2,
      name: 'Bishara Babish',
      role: 'Co-Founder<br>Development Team Lead<br>Full-Stack Developer',
      image: bisharaImage,
      socialLinks: {
        github: 'https://github.com/bisharababish',
        linkedin: 'https://www.linkedin.com/in/bisharababish/',
        instagram: 'https://instagram.com/bisharababish_'
      }
    },
    {
      id: 3,
      name: 'Saliba Rishmawi',
      role: 'Co-Founder<br>Artificial Intelligence Specialist<br>Image Processing Specialist<br>Linux System Developer<br>Embedded Systems Developer',
      image: SalibaImage,
      socialLinks: {
        github: 'https://github.com/Saliba-codes',
        linkedin: 'https://linkedin.com/in/saliba-rishmawi-b32a11255',
        instagram: 'https://instagram.com/saliba2002'
      }
    }
  ];

  return (
    <TeamSection id="team">
      <div className="container">
        <SectionHeader>
          <h2>Meet Our Team</h2>
          <p>The talented people behind Code Fusion</p>
        </SectionHeader>

        <TeamGrid>
          {teamMembers.map(member => (
            <TeamCard key={member.id}>
              <MemberImage>
                <img src={member.image} alt={member.name} />
              </MemberImage>
              <MemberInfo>
                <h3>{member.name}</h3>
                <p dangerouslySetInnerHTML={{ __html: member.role }}></p>
                <SocialLinks>
                  {member.socialLinks?.github && (
                    <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-github"></i>
                    </a>
                  )}
                  {member.socialLinks?.linkedin && (
                    <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  )}
                  {member.socialLinks?.instagram && (
                    <a href={member.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-instagram"></i>
                    </a>
                  )}
                  {member.socialLinks?.twitter && (
                    <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-twitter"></i>
                    </a>
                  )}
                </SocialLinks>
              </MemberInfo>
            </TeamCard>
          ))}
        </TeamGrid>
      </div>
    </TeamSection>
  );
};

export default Team;