import { Link, useLocation } from 'react-router-dom';
import { Box, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLanding = location.pathname === '/';

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Lookbook', path: '/magazine' },
    { name: 'About', path: '#about' },
    { name: 'Process', path: '#process' },
    { name: 'Contact', path: '#contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ 
          y: 0,
          backgroundColor: isScrolled || !isLanding || isMenuOpen ? 'var(--surface-2)' : 'rgba(255, 255, 255, 0)',
          backdropFilter: isScrolled || !isLanding || isMenuOpen ? 'blur(16px)' : 'blur(0px)',
          borderBottom: isScrolled || !isLanding || isMenuOpen ? '1px solid var(--border)' : '1px solid rgba(255,255,255,0)',
        }}
        transition={{ duration: 0.5 }}
        style={{
          position: isLanding && !isScrolled ? 'absolute' : 'fixed',
          width: '100%',
          left: 0,
          top: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 var(--container-padding, 60px)',
          height: isScrolled ? '65px' : '75px',
        }}
      >
        <Link to="/" className="nav-logo" onClick={() => setIsMenuOpen(false)}>
          <img src="/logo.png" alt="SIRO Uniforms" style={{ height: '42px' }} />
        </Link>

        {/* Desktop Links */}
        <div className="nav-links">
          {navLinks.map((link) => (
            link.path.startsWith('#') ? (
              <a key={link.name} href={link.path} style={{ color: (isScrolled || !isLanding) ? 'var(--text-muted)' : 'rgba(255,255,255,0.9)' }}>
                {link.name}
              </a>
            ) : (
              <Link key={link.name} to={link.path} className={location.pathname === link.path ? 'active' : ''} style={{ color: (isScrolled || !isLanding) ? 'var(--text-muted)' : 'rgba(255,255,255,0.9)' }}>
                {link.name}
              </Link>
            )
          ))}
          <Link to="/explore" className="btn btn-primary" style={{padding: '8px 16px', fontSize: '0.85rem'}}>
            <Box size={16} /> Catalogue
          </Link>
        </div>
        
        {/* Mobile Menu Toggle Button */}
        <motion.button 
          className="mobile-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileTap={{ scale: 0.9 }}
          style={{ 
            background: 'rgba(0,0,0,0.05)',
            border: 'none',
            padding: '10px',
            borderRadius: '12px',
            color: (isScrolled || !isLanding || isMenuOpen) ? 'var(--brand)' : '#fff',
            cursor: 'pointer',
            zIndex: 1001,
          }}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={22} />}
          <span style={{ fontSize: '0.8rem', fontWeight: 700, marginLeft: '4px' }} className="hide-mobile">MENU</span>
        </motion.button>
      </motion.nav>

      {/* Floating Mobile Menu Card */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20, x: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              position: 'fixed',
              top: isScrolled ? '68px' : '78px',
              right: '16px',
              width: 'calc(100% - 32px)',
              maxWidth: '260px',
              backgroundColor: 'rgba(255, 255, 255, 0.88)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderRadius: '24px',
              padding: '20px',
              zIndex: 1100,
              boxShadow: '0 16px 32px rgba(0,0,0,0.12), 0 0 0 1px rgba(255,255,255,0.4)',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              border: '1px solid rgba(255,255,255,0.25)'
            }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {link.path.startsWith('#') ? (
                  <a href={link.path} onClick={() => setIsMenuOpen(false)} style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--brand)', display: 'block', padding: '10px 12px', borderRadius: '12px', transition: 'background 0.2s' }}>
                    {link.name}
                  </a>
                ) : (
                  <Link to={link.path} onClick={() => setIsMenuOpen(false)} style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--brand)', display: 'block', padding: '10px 12px', borderRadius: '12px', transition: 'background 0.2s' }}>
                    {link.name}
                  </Link>
                )}
              </motion.div>
            ))}
            <div style={{ height: '1px', background: 'rgba(0,0,0,0.06)', margin: '8px 4px' }} />
            <Link to="/explore" onClick={() => setIsMenuOpen(false)} className="btn btn-primary" style={{padding: '12px', fontSize: '0.85rem', width: '100%', justifyContent: 'center', borderRadius: '14px'}}>
              <Box size={16} /> Catalogue
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop for closing */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.1)',
              backdropFilter: 'blur(4px)',
              zIndex: 1090
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
