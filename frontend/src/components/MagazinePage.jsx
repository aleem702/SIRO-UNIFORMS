import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, X, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import FlipbookCatalog from '../components/FlipbookCatalog';
import Footer from '../components/Footer';

export default function MagazinePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="view-transition">
      <div className="catalog-header container" style={{ textAlign: 'center', paddingTop: '80px' }}>
        <h1 className="text-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '8px', letterSpacing: '-0.02em' }}>
          {"SIRO Uniforms Lookbook".split(" ").map((word, i) => (
            <motion.span
              key={i}
              style={{ display: 'inline-block', marginRight: '0.25em' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: i * 0.1 
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto' }}
        >
          Explore our premium selection of Corporate, Healthcare, and Hospitality attire in this comprehensive, high-fidelity digital showcase.
        </motion.p>
      </div>

      <div className="container">
        <div className="magazine-grid" style={{ display: 'flex', justifyContent: 'center', marginTop: '-20px' }}>
          <motion.div 
            className="magazine-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.6 }}
            onClick={() => setIsModalOpen(true)}
            whileHover={{ y: -12, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ maxWidth: '200px' }}
          >
            <div className="card-cover-wrapper" style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-museum)' }}>
              <img src="/book/1.jpeg" alt="STRIPES Lookbook" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div className="card-overlay" style={{ background: 'linear-gradient(to top, rgba(10,14,19,0.7), transparent)' }}>
                <span className="text-display" style={{ fontSize: '0.8rem', letterSpacing: '2px' }}>OPEN EXHIBIT</span>
              </div>
            </div>
            <div className="card-content" style={{ textAlign: 'center', padding: '16px 0' }}>
              <div className="pill-small" style={{ marginBottom: '8px', display: 'inline-block' }}>2025 PORTFOLIO</div>
              <h3 className="text-display" style={{ fontSize: '1.3rem', marginBottom: '4px', color: 'var(--brand)' }}>STRIPES Uniform Bazaar</h3>
              <div style={{ width: '40px', height: '1px', background: 'var(--accent)', margin: '8px auto' }} />
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 500 }}>Comprehensive Textile Collection</p>
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="flipbook-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <BookOpen size={28} />
                <h2>SIRO UNIFORMS <span>/ 2025 PORTFOLIO</span></h2>
              </div>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="modal-body">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300, delay: 0.1 }}
                style={{ width: '100%', maxWidth: '1200px' }}
              >
                <FlipbookCatalog />
              </motion.div>
            </div>
            <div className="modal-footer" style={{ height: '60px', textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>
              Swipe or click edges to turn pages
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container" style={{padding: '60px 0', textAlign: 'center'}}>
        <h2 style={{fontSize: '2rem', marginBottom: '16px'}}>Ready to explore further?</h2>
        <p style={{color: 'var(--text-muted)', marginBottom: '32px'}}>Check out our full collection in the catalog or contact us for a custom consultation.</p>
        <div style={{display: 'flex', gap: '16px', justifyContent: 'center'}}>
          <a href="/collection" className="btn btn-primary">Browse Catalog</a>
          <a href="#contact" className="btn" style={{border: '1px solid var(--border)'}}>Contact Us</a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
