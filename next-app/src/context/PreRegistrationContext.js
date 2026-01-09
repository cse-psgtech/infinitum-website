'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { authService } from '@/services/authService';

const PreRegistrationContext = createContext(undefined);

// Steps in the pre-registration flow
export const PRE_REG_STEPS = {
    EMAIL: 'email',
    VERIFY: 'verify',
    SUCCESS: 'success',
};

export function PreRegistrationProvider({ children }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(PRE_REG_STEPS.EMAIL);
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const openModal = useCallback(() => {
        setIsModalOpen(true);
        setCurrentStep(PRE_REG_STEPS.EMAIL);
        setEmail('');
        setVerificationCode('');
        setError('');
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        setCurrentStep(PRE_REG_STEPS.EMAIL);
        setEmail('');
        setVerificationCode('');
        setError('');
        setIsLoading(false);
    }, []);

    const sendVerificationCode = useCallback(async (emailInput) => {
        setIsLoading(true);
        setError('');
        try {
            await authService.sendPreRegistrationCode(emailInput);
            setEmail(emailInput);
            setCurrentStep(PRE_REG_STEPS.VERIFY);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send verification code. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const verifyCode = useCallback(async (code) => {
        setIsLoading(true);
        setError('');
        try {
            await authService.verifyPreRegistration(email, code);
            setVerificationCode(code);
            setCurrentStep(PRE_REG_STEPS.SUCCESS);
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid verification code. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [email]);

    const resetFlow = useCallback(() => {
        setCurrentStep(PRE_REG_STEPS.EMAIL);
        setEmail('');
        setVerificationCode('');
        setError('');
    }, []);

    const value = {
        isModalOpen,
        currentStep,
        email,
        verificationCode,
        isLoading,
        error,
        openModal,
        closeModal,
        sendVerificationCode,
        verifyCode,
        resetFlow,
        setError,
    };

    return (
        <PreRegistrationContext.Provider value={value}>
            {children}
        </PreRegistrationContext.Provider>
    );
}

export function usePreRegistration() {
    const context = useContext(PreRegistrationContext);
    if (context === undefined) {
        throw new Error('usePreRegistration must be used within a PreRegistrationProvider');
    }
    return context;
}
