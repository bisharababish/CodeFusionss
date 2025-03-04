// src/types/index.ts
export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
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
}
