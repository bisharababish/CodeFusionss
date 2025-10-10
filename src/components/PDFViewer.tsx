import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PDFContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(10px);
`;

const PDFModal = styled(motion.div)`
  background: var(--cards-bg);
  border-radius: 20px;
  padding: 2rem;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-color);
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.5);
`;

const PDFHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const PDFTitle = styled.h3`
  color: var(--main-text);
  font-size: 1.5rem;
  margin: 0;
  background: linear-gradient(135deg, #4B2E83, #2F80ED);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const CloseButton = styled(motion.button)`
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
  width: 100%;
  height: 70vh;
  border: none;
  border-radius: 10px;
  background: white;
`;

const DownloadButton = styled(motion.a)`
  background: linear-gradient(135deg, #4B2E83, #2F80ED);
  color: white;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 15px;
  text-align: center;
  margin-top: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-block;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(75, 46, 131, 0.4);
  }
`;

interface PDFViewerProps {
    pdfUrl: string;
    title: string;
    onClose: () => void;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl, title, onClose }) => {

    return (
        <PDFContainer onClick={onClose}>
            <PDFModal
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}
            >
                <PDFHeader>
                    <PDFTitle>{title}</PDFTitle>
                    <CloseButton
                        onClick={onClose}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Close
                    </CloseButton>
                </PDFHeader>

                <PDFFrame
                    src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
                    title={title}
                />

                <DownloadButton
                    href={pdfUrl}
                    download={title}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Download PDF
                </DownloadButton>
            </PDFModal>
        </PDFContainer>
    );
};

export default PDFViewer;
