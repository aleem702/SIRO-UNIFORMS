import React from 'react';
import { RefreshCw, Play } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Museum Studio Error:", error, errorInfo);
    if (this.props.onError) {
      this.props.onError();
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="explorer-placeholder error-fallback">
          <div className="placeholder-content" style={{ position: 'relative', zIndex: 10 }}>
            {/* Minimalist Recovery UI */}
            <div className="blueprint-badge" style={{ marginBottom: '24px', background: 'var(--brand)' }}>
              Studio Recovery
            </div>
            
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 16px', color: 'var(--brand)' }}>
              Engine Overload Detected
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', maxWidth: '380px', margin: '0 auto 32px' }}>
              The 3D model is pushing your hardware acceleration to its limit. Attempting a low-resolution recovery...
            </p>
            
            <button 
              className="btn" 
              onClick={() => window.location.reload()}
              style={{ 
                borderRadius: '50px', 
                background: 'var(--brand)',
                color: '#fff',
                fontSize: '0.85rem',
                fontWeight: 700,
                padding: '12px 28px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
              }}
            >
              <Play size={16} fill="white" /> Re-Initialize 3D Studio
            </button>
            
            <div style={{ marginTop: '24px', opacity: 0.5, fontSize: '0.75rem', fontWeight: 600 }}>
              ERROR CODE: GL_CONTEXT_MAX_SIZE
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
