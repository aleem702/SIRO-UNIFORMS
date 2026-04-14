import { Package, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Navbar({ pathname }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = isLanding ? window.innerHeight - 75 : 50;
      setIsScrolled(window.scrollY > threshold);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const isLanding = pathname === '/';
  const isCollectionPage = pathname === '/collection';

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Collection', path: '/collection' },
    { name: 'Lookbook', path: '/magazine' },
    { name: 'About', path: '/#about' },
    { name: 'Process', path: '/#process' },
    { name: 'Contact', path: '/#contact' },
  ];

  return (
    <>
      <motion.nav
        animate={{ 
          y: isNavbarHidden ? -75 : 0,
          backgroundColor: isScrolled || !isLanding || isMenuOpen ? 'var(--surface)' : 'rgba(255, 255, 255, 0)',
          backdropFilter: isScrolled || !isLanding || isMenuOpen ? 'blur(12px)' : 'blur(0px)',
          borderBottom: isScrolled || !isLanding || isMenuOpen ? '1px solid var(--border)' : '1px solid rgba(255,255,255,0)',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        style={{
          position: 'fixed',
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
        <a href="/" className="nav-logo" onClick={() => setIsMenuOpen(false)}>
          <img src="/logo.png" alt="SIRO Uniforms" style={{ height: '48px' }} />
        </a>

        {/* Center Toggle Arrow for Collection Page */}
        {isCollectionPage && (
          <motion.button
            onClick={() => setIsNavbarHidden(!isNavbarHidden)}
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.05)' }}
            animate={{
              bottom: isNavbarHidden ? -32 : 10,
              rotate: isNavbarHidden ? 180 : 0
            }}
            style={{
              position: 'absolute',
              left: '50%',
              x: '-50%',
              background: isNavbarHidden ? 'var(--surface)' : 'transparent',
              border: isNavbarHidden ? '1px solid var(--border)' : 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--brand)',
              zIndex: 1001,
              boxShadow: isNavbarHidden ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
            }}
          >
            <ChevronDown size={18} />
          </motion.button>
        )}

        {/* Desktop Links */}
        <div className="nav-links">
          {navLinks.map((link) => (
             <a 
               key={link.name} 
               href={link.path} 
               className={pathname === link.path ? 'active' : ''}
               style={{ color: (isScrolled || !isLanding) ? 'var(--text-muted)' : 'var(--brand)' }}
             >
               {link.name}
             </a>
          ))}
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
            color: (isScrolled || !isLanding || isMenuOpen) ? 'var(--brand)' : 'var(--brand)',
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
              backgroundColor: 'var(--glass)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
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
                <a href={link.path} onClick={() => setIsMenuOpen(false)} style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--brand)', display: 'block', padding: '10px 12px', borderRadius: '12px', transition: 'background 0.2s', textDecoration: 'none' }}>
                  {link.name}
                </a>
              </motion.div>
            ))}
            <div style={{ height: '1px', background: 'rgba(0,0,0,0.06)', margin: '8px 4px' }} />
            <a href="/collection" onClick={() => setIsMenuOpen(false)} className="btn btn-primary" style={{padding: '12px', fontSize: '0.85rem', width: '100%', justifyContent: 'center', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none'}}>
              <Package size={16} /> Catalogue
            </a>
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
