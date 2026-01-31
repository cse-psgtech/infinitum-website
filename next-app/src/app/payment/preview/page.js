'use client';
import React, { useState } from 'react';
import '../payment.css';

// Preview component to test payment UI states without authentication
export default function PaymentPreview() {
    const [currentState, setCurrentState] = useState('success'); // 'loading', 'success', 'processing'
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [showAnimation, setShowAnimation] = useState(true);

    const handleRefreshStatus = () => {
        // Track button click with Umami analytics
        if (typeof window !== 'undefined' && window.umami) {
            window.umami.track('payment-refresh-status-click');
        }
        
        // Simulate API call
        setIsRefreshing(true);
        setShowAnimation(false);
        
        setTimeout(() => {
            setIsRefreshing(false);
            setShowAnimation(true);
            // Toggle between success and processing for demo
            setCurrentState(prev => prev === 'success' ? 'processing' : 'success');
        }, 1500);
    };

    const handleProceed = () => {
        alert('This would navigate to event registration');
    };

    // State selector UI
    const StateSelector = () => (
        <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: 'rgba(0, 0, 0, 0.8)',
            border: '1px solid rgba(199, 32, 113, 0.5)',
            padding: '16px',
            borderRadius: '8px',
            zIndex: 1000,
            fontFamily: 'Orbitron, sans-serif'
        }}>
            <p style={{ color: '#fff', fontSize: '12px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Preview State:
            </p>
            <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
                {['loading', 'success', 'processing'].map(state => (
                    <button
                        key={state}
                        onClick={() => {
                            setCurrentState(state);
                            setShowAnimation(true);
                        }}
                        style={{
                            padding: '8px 16px',
                            background: currentState === state 
                                ? state === 'processing' 
                                    ? 'rgba(250, 225, 39, 0.8)' 
                                    : 'rgba(199, 32, 113, 0.8)' 
                                : 'transparent',
                            border: `1px solid ${state === 'processing' ? 'rgba(250, 225, 39, 0.5)' : 'rgba(199, 32, 113, 0.5)'}`,
                            color: currentState === state && state === 'processing' ? '#000' : '#fff',
                            cursor: 'pointer',
                            textTransform: 'uppercase',
                            fontSize: '11px',
                            letterSpacing: '1px'
                        }}
                    >
                        {state}
                    </button>
                ))}
            </div>
        </div>
    );

    // Loading State
    if (currentState === 'loading') {
        return (
            <>
                <StateSelector />
                <div className="payment-page">
                    <div className="payment-card">
                        <div className="payment-header">
                            <div className="payment-icon-loading">
                                <div className="payment-spinner"></div>
                            </div>
                            <h1>Verifying Payment</h1>
                            <p>Please wait while we verify your payment...</p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    // Processing State (Yellow)
    if (currentState === 'processing') {
        return (
            <>
                <StateSelector />
                <div className="payment-page">
                    <div className="payment-card">
                        <div className="payment-header">
                            <div className={`payment-icon-processing ${showAnimation ? 'payment-icon-animated payment-icon-pulse' : ''}`}>
                                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className={showAnimation ? 'payment-svg-draw-processing' : ''}>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h1>Payment Processing</h1>
                            <p style={{ color: '#fae127' }}>
                                Your payment is being processed. Please wait a moment and refresh to check the status.
                            </p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '24px' }}>
                            <button
                                className="payment-btn payment-btn-processing"
                                onClick={handleRefreshStatus}
                                disabled={isRefreshing}
                                style={{ textAlign: 'center' }}
                                data-umami-event="payment-refresh-status-click"
                            >
                                {isRefreshing ? (
                                    <span className="payment-btn-loading">
                                        <span className="payment-btn-spinner"></span>
                                        Checking...
                                    </span>
                                ) : (
                                    <span className="payment-btn-content">
                                        <svg className="payment-refresh-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        Refresh Payment Status
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    // Success State (Green)
    return (
        <>
            <StateSelector />
            <div className="payment-page">
                <div className="payment-card">
                    <div className="payment-header">
                        <div className={`payment-icon-success ${showAnimation ? 'payment-icon-animated payment-icon-bounce' : ''}`}>
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className={showAnimation ? 'payment-svg-draw-success' : ''}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1>Payment Successful</h1>
                        <p>Your payment has been processed successfully.</p>
                        <p className="payment-status-text" style={{ marginTop: '16px', color: '#e04e94' }}>
                            Click the button below to proceed with your event registration.
                        </p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '24px' }}>
                        <button
                            className="payment-btn"
                            onClick={handleProceed}
                            style={{ textAlign: 'center' }}
                        >
                            Proceed for event registration
                        </button>
                        <button
                            className="payment-btn payment-btn-secondary"
                            onClick={handleRefreshStatus}
                            disabled={isRefreshing}
                            style={{ textAlign: 'center' }}
                            data-umami-event="payment-refresh-status-click"
                        >
                            {isRefreshing ? (
                                <span className="payment-btn-loading">
                                    <span className="payment-btn-spinner"></span>
                                    Checking...
                                </span>
                            ) : (
                                <span className="payment-btn-content">
                                    <svg className="payment-refresh-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    Refresh Payment Status
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
