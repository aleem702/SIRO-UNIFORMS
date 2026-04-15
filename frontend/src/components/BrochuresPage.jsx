import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Download, ChevronLeft, ExternalLink, FileText, ArrowRight } from 'lucide-react';
import Footer from './Footer';

const BRANDS = [
  { 
    id: 'valji', 
    name: 'Valji', 
    logo: '/brands/valji.png',
    brochures: [
      { name: 'Sawan', file: '/brochures/Valji/Sawan (2).pdf' },
      { name: 'The Corporate Class', file: '/brochures/Valji/The Corporate Class.pdf' },
      { name: 'The Corporate Studio 1', file: '/brochures/Valji/The Corporate Studio-1.pdf' },
      { name: 'Vedantic', file: '/brochures/Valji/vedantic.pdf' },
    ]
  },
  { 
    id: 'qmax', 
    name: 'Qmax', 
    logo: '/brands/Qmax.jpg',
    brochures: [
      { name: 'Class of 2025', file: '/brochures/QMax/CLASS OF 2025 - Copy.pdf' },
      { name: 'Genius', file: '/brochures/QMax/GENIUS.pdf' },
      { name: 'Little Passport', file: '/brochures/QMax/LITTLE PASPORT.pdf' },
    ]
  },
  { 
    id: 'sparsh', 
    name: 'Sparsh', 
    logo: '/brands/sparsh.webp',
    brochures: [
      { name: 'Safeguard', file: '/brochures/Sparsh/SAFEGUARD.pdf' }
    ]
  },
  { 
    id: 'subbhtex', 
    name: 'Subbhtex', 
    logo: '/brands/subbhtex.webp',
    brochures: [
      { name: 'Corporate Vol 1', file: '/brochures/subbtex/E-CATLOGUE CORPORATE VOLUME 1.pdf' }
    ]
  },
  { 
    id: 'wocky', 
    name: 'Wocky Tocky', 
    logo: '/brands/Wocky-Tocky.png',
    brochures: [
      { name: 'Aqua May 2025', file: '/brochures/mocky-tocky/Aqua May 2025 (1).pdf' },
      { name: 'Hospital & PC Suitings', file: '/brochures/mocky-tocky/Hospital & PC Suitings (1).pdf' },
    ]
  },
];

export default function BrochuresPage() {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [activePdf, setActivePdf] = useState(null);

  const closeModal = () => {
    setSelectedBrand(null);
    setActivePdf(null);
  };

  return (
    <div className="viewer-page" style={{ 
      minHeight: '100vh', 
      background: 'var(--surface)',
      paddingTop: '120px',
      paddingBottom: '80px',
      overflow: 'hidden',
      color: 'var(--text-main)',
      position: 'relative'
    }}>
      {/* Background Architectural Grid Lines */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)', backgroundSize: '100px 100px', pointerEvents: 'none', zIndex: 0 }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="pill-small" 
            style={{ 
              display: 'inline-block', 
              background: 'rgba(0,0,0,0.04)', 
              color: 'var(--text-muted)',
              marginBottom: '24px',
              border: '1px solid rgba(0,0,0,0.05)'
            }}
          >
            PARTNER CATALOGS
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-display" 
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: 'var(--brand)', marginBottom: '24px' }}
          >
            Brand Brochures
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}
          >
            Explore the specialized uniform libraries from our trusted fabric and manufacturing counterparts worldwide.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <motion.div 
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.08 } }
          }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
            maxWidth: '1200px',
            margin: '0 auto'
          }}
        >
          {BRANDS.map((brand, i) => (
            <motion.button
              key={brand.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedBrand(brand)}
              style={{
                background: 'transparent',
                border: 'none',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                aspectRatio: '1',
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              
              <div style={{ 
                flex: 1, 
                width: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                padding: '24px'
              }}>
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    mixBlendMode: 'multiply'
                  }} 
                />
              </div>
              <h3 style={{
                fontSize: '1rem',
                fontWeight: 800,
                color: 'var(--brand)',
                marginTop: '16px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                {brand.name}
              </h3>
              <p style={{ fontSize: '0.75rem', color: '#888', marginTop: '6px', fontWeight: 600 }}>{brand.brochures.length} Catalogs</p>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Shared Modal Architecture */}
      <AnimatePresence>
        {selectedBrand && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(20px)',
              zIndex: 2000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              style={{
                backgroundColor: 'var(--surface)',
                borderRadius: '32px',
                width: '100%',
                maxWidth: activePdf ? '1200px' : '800px', // Expand width if viewing PDF
                height: activePdf ? '90vh' : 'auto', // Force height for PDF iframe
                maxHeight: '90vh',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 40px 100px rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.4)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {/* Contextual Header */}
              <div style={{ 
                padding: '24px 32px', 
                borderBottom: '1px solid rgba(0,0,0,0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#ffffff',
                flexShrink: 0
              }}>
                
                {/* Left Side Header Controls */}
                {activePdf ? (
                  <button 
                    onClick={() => setActivePdf(null)}
                    aria-label="Back to brochure selection"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--brand)',
                      fontWeight: 700,
                      fontSize: '0.9rem'
                    }}
                  >
                    <div style={{ background: 'rgba(0,0,0,0.05)', padding: '8px', borderRadius: '50%' }}>
                      <ChevronLeft size={18} />
                    </div>
                    Back to Selection
                  </button>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <img src={selectedBrand.logo} alt="" style={{ height: '32px', width: 'auto', objectFit: 'contain' }} />
                    <div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--brand)', lineHeight: 1.2 }}>{selectedBrand.name}</h3>
                      <span style={{ fontSize: '0.75rem', color: '#888', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Digital Library</span>
                    </div>
                  </div>
                )}
                
                {/* Universal Close Button */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {activePdf && (
                    <a 
                      href={activePdf} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        color: 'var(--brand)',
                        textDecoration: 'none',
                        background: 'rgba(0,0,0,0.04)',
                        padding: '10px 16px',
                        borderRadius: '20px'
                      }}
                    >
                      <ExternalLink size={14} /> Open Native
                    </a>
                  )}
                  <button 
                    onClick={closeModal}
                    aria-label="Close brochure modal"
                    title="Close"
                    style={{
                      background: 'rgba(0,0,0,0.05)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: 'var(--brand)',
                      transition: 'all 0.2s'
                    }}
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>


              {/* Modal Body State Machine */}
              {activePdf ? (
                /* PDF Viewer Mode */
                <div style={{ flex: 1, backgroundColor: '#ececec', position: 'relative' }}>
                  <iframe 
                    src={activePdf} 
                    style={{ width: '100%', height: '100%', border: 'none' }}
                    title="PDF Brochure Viewer"
                  />
                </div>
              ) : (
                /* Catalog Selection Mode */
                <div style={{
                  flex: 1,
                  padding: '40px',
                  backgroundColor: '#fdfdfd',
                  overflowY: 'auto'
                }}>
                  
                  {selectedBrand.brochures.length > 0 ? (
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                      gap: '40px',
                      justifyItems: 'center'
                    }}>
                      {selectedBrand.brochures.map((brochure, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ y: -8, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setActivePdf(brochure.file)}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            textAlign: 'center',
                            width: '100%',
                            padding: '16px'
                          }}
                        >
                          {/* Book Cover Placeholder */}
                          <div style={{
                            width: '220px',
                            height: '310px',
                            background: 'linear-gradient(135deg, #2a2a2a 0%, #111 100%)', // Sleek dark placeholder cover
                            borderRadius: '32px',
                            boxShadow: '0 24px 48px rgba(0,0,0,0.15)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '24px',
                            position: 'relative',
                            overflow: 'hidden',
                            border: '1px solid rgba(255,255,255,0.05)'
                          }}>
                            {/* Spine Line */}
                            <div style={{ position: 'absolute', left: '24px', top: 0, bottom: 0, width: '2px', backgroundColor: 'rgba(255,255,255,0.05)' }} />
                            
                            {/* Brand Logo on Cover */}
                            <div style={{
                              width: '80px',
                              height: '40px',
                              marginBottom: '24px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <img 
                                src={selectedBrand.logo} 
                                alt="" 
                                style={{ 
                                  maxHeight: '100%', 
                                  maxWidth: '100%',
                                  objectFit: 'contain', 
                                  filter: 'brightness(0) invert(1)',
                                  opacity: 0.9
                                }} 
                              />
                            </div>
                            <span style={{ 
                              color: 'rgba(255,255,255,0.95)', 
                              fontWeight: 900, 
                              fontSize: '1.4rem', 
                              lineHeight: 1.2,
                              textAlign: 'center', 
                              padding: '0 24px',
                              textTransform: 'uppercase',
                              letterSpacing: '1px'
                            }}>
                              {brochure.name}
                            </span>
                          </div>

                          {/* Pill Tag */}
                          <div style={{
                            border: '1px solid rgba(0,0,0,0.08)',
                            padding: '6px 16px',
                            borderRadius: '20px',
                            fontSize: '0.7rem',
                            fontWeight: 800,
                            letterSpacing: '1px',
                            color: 'var(--brand)',
                            marginBottom: '16px',
                            backgroundColor: '#fff'
                          }}>
                            {new Date().getFullYear()} PORTFOLIO
                          </div>
                          
                          {/* Title */}
                          <h4 style={{ 
                            fontSize: '1.4rem', 
                            fontWeight: 900, 
                            color: 'var(--brand)', 
                            lineHeight: 1.1, 
                            marginBottom: '16px',
                            maxWidth: '240px'
                          }}>
                            {brochure.name}
                          </h4>
                          
                          {/* Accent Line */}
                          <div style={{ 
                            width: '32px', 
                            height: '2px', 
                            backgroundColor: 'var(--accent)', 
                            marginBottom: '16px' 
                          }} />
                          
                          {/* Subtitle */}
                          <p style={{ 
                            fontSize: '0.85rem', 
                            color: '#666', 
                            fontWeight: 500 
                          }}>
                            Comprehensive Textile Collection
                          </p>
                        </motion.button>
                      ))}
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '60px 0', opacity: 0.5 }}>
                      <p>No brochures currently loaded for this brand.</p>
                    </div>
                  )}
                  
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Final Conversion Block ── */}
      <section style={{ padding: '100px 0', borderTop: '1px solid var(--border)', position: 'relative', zIndex: 1 }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ width: '48px', height: '3px', background: 'var(--accent)', borderRadius: '100px', margin: '0 auto 40px' }} />
          
          <span style={{ 
            fontSize: '0.65rem', fontWeight: 900, letterSpacing: '5px', 
            color: 'var(--accent)', textTransform: 'uppercase', display: 'block', marginBottom: '20px' 
          }}>SELECTION ASSISTANCE</span>
          
          <h2 style={{ 
            fontSize: 'clamp(2rem, 5vw, 3rem)', 
            fontWeight: 900, 
            color: 'var(--brand)', 
            marginBottom: '24px',
            lineHeight: 1.1
          }}>
            Can't find the exact<br />fabric or style?
          </h2>
          
          <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 48px', lineHeight: 1.6 }}>
            Our library is extensive and not all partner catalogs are listed here. Contact our design desk for personalized fabric sourcing.
          </p>
          
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/contact" className="btn btn-primary" style={{ padding: '16px 40px', borderRadius: '100px' }}>
              CONTACT DESIGN DESK <ArrowRight size={16} style={{ marginLeft: '8px' }} />
            </a>
            <a href="/collection" className="btn" style={{ border: '1px solid var(--border)', padding: '16px 40px', borderRadius: '100px' }}>
              VISIT STUDIO
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
