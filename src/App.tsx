// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage from './pages/AboutPage';
import TeamsPage from './pages/TeamsPage';
import PDFPage from './pages/PDFPage';

const App: React.FC = () => {
  return (
    <Router>
      <GlobalStyles />
      <div style={{ minHeight: '100vh' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/team" element={<TeamsPage />} />
          <Route path="/pdf/:pdfName" element={<PDFPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;