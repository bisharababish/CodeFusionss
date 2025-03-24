// src/types/index.ts
export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    instagram?: string;
    twitter?: string;
  };
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link?: string;
  githubLink?: string;
  category: string;
}

export interface ProjectCategory {
  id: string;
  name: string;
  projects: Project[];
}

export interface ProjectsProps {
  limit?: number;
  autoplayInterval?: number;
}