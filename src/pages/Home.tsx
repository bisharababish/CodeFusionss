// src/pages/Home.tsx
import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Team from '../components/Team';

const Home: React.FC = () => {
    return (
        <>
            <Hero />
            <About />
            <Projects limit={5} />
            <Team />
        </>
    );
};

export default Home;

