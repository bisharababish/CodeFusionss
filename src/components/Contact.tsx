// src/components/Contact.tsx
import React, { useState } from 'react';
import styled from 'styled-components';

const ContactSection = styled.section`
  padding: 6rem 0;
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

const ContactForm = styled.form`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  opacity: 0.8;
`;

const Input = styled.input`
  background-color: rgba(15, 15, 26, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.75rem;
  border-radius: 5px;
  color: var(--light-text);
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(108, 92, 231, 0.2);
  }
`;

const TextArea = styled.textarea`
  background-color: rgba(15, 15, 26, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.75rem;
  border-radius: 5px;
  color: var(--light-text);
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(108, 92, 231, 0.2);
  }
`;

const SubmitButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--secondary-color);
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Implement your form submission logic here
            // For example, send data to a backend API
            console.log('Form submitted:', formData);

            // Reset form after submission
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
        } catch (error) {
            console.error('Submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <ContactSection id="contact">
            <div className="container">
                <SectionHeader>
                    <h2>Let's Work Together</h2>
                    <p>Have a project in mind? Send us a message, and we'll get back to you shortly.</p>
                </SectionHeader>

                <ContactForm onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="message">Message</Label>
                        <TextArea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>

                    <SubmitButton type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </SubmitButton>
                </ContactForm>
            </div>
        </ContactSection>
    );
};

export default Contact;