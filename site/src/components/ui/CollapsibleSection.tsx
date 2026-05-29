'use client';

import React, { useState } from 'react';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function CollapsibleSection({ title, children, defaultOpen = false }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  // Defer mounting the body (and any heavy third-party iframes within) until
  // the section is first opened. Once mounted it stays mounted so the
  // collapse animation still has content to animate on subsequent toggles.
  const [hasOpened, setHasOpened] = useState(defaultOpen);

  const toggle = () => {
    setIsOpen((prev) => {
      if (!prev) setHasOpened(true);
      return !prev;
    });
  };

  const renderTitle = () => {
    const parts = title.split(' — ');
    if (parts.length > 1) {
      const mainTitle = parts[0];
      const description = parts.slice(1).join(' — ');
      return (
        <span>
          {mainTitle}
          <span style={{ 
            fontSize: '0.9rem', 
            color: 'var(--ivory-dim)', 
            marginLeft: '8px', 
            fontWeight: 'normal',
            opacity: 0.8
          }}>
            — {description}
          </span>
        </span>
      );
    }
    return <span>{title}</span>;
  };

  return (
    <div style={{ marginBottom: '16px', border: '1px solid var(--rule-dark)', borderRadius: '8px', overflow: 'hidden' }}>
      <button 
        onClick={toggle}
        aria-expanded={isOpen}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 20px',
          background: 'rgba(255,255,255,0.02)',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'var(--font-display)',
          fontSize: '1.2rem',
          color: 'var(--ivory)',
          textAlign: 'left',
          transition: 'background 0.2s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
        onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
      >
        {renderTitle()}
        <span style={{ 
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', 
          transition: 'transform 0.3s ease',
          fontSize: '1rem',
          color: 'var(--ivory-dim)'
        }}>
          ▼
        </span>
      </button>
      
      <div style={{
        display: 'grid',
        gridTemplateRows: isOpen ? '1fr' : '0fr',
        opacity: isOpen ? 1 : 0,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        <div style={{ overflow: 'hidden' }}>
          <div className="collapsible-section-body" style={{ padding: '20px' }} hidden={!isOpen && !hasOpened}>
            {hasOpened ? children : null}
          </div>
        </div>
      </div>
    </div>
  );
}
