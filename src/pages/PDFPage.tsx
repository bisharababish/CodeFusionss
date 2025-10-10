import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const PDFContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--website-bg);
  display: flex;
  flex-direction: column;
`;

const PDFHeader = styled.div`
  background: var(--cards-bg);
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PDFTitle = styled.h1`
  color: var(--main-text);
  margin: 0;
  font-size: 1.5rem;
  background: linear-gradient(135deg, #4B2E83, #2F80ED);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const CloseButton = styled.button`
  background: linear-gradient(135deg, #FF4F8B, #2F80ED);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 25px rgba(255, 79, 139, 0.4);
  }
`;

const PDFFrame = styled.iframe`
  flex: 1;
  border: none;
  width: 100%;
`;

const PDFPage: React.FC = () => {
    const { pdfName } = useParams<{ pdfName: string }>();

    const pdfUrls = {
        'BisharaBabishCV': 'https://github.com/bisharababish/CodeFusion-Portfolio/raw/main/public/BisharaBabishCV.pdf',
        'JudahSleibiCV': 'https://github.com/bisharababish/CodeFusion-Portfolio/raw/main/public/JudahSleibiCV.pdf',
        'SalibaRishmawiCV': 'https://github.com/bisharababish/CodeFusion-Portfolio/raw/main/public/SalibaRishmawiCV.pdf'
    };

    const pdfUrl = pdfName ? pdfUrls[pdfName as keyof typeof pdfUrls] : '';
    const title = pdfName ? `${pdfName.replace('CV', ' - CV')}` : 'CV';

    const handleClose = () => {
        window.close();
    };

    return (
        <PDFContainer>
            <PDFHeader>
                <PDFTitle>{title}</PDFTitle>
                <CloseButton onClick={handleClose}>
                    Close
                </CloseButton>
            </PDFHeader>
            {pdfUrl ? (
                <PDFFrame
                    src={pdfUrl}
                    title={title}
                />
            ) : (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    color: 'var(--main-text)'
                }}>
                    PDF not found
                </div>
            )}
        </PDFContainer>
    );
};

export default PDFPage;
