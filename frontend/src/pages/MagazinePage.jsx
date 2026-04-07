import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, X, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import FlipbookCatalog from '../components/FlipbookCatalog';
import Footer from '../components/Footer';

export default function MagazinePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="view-transition">
      <div className="catalog-header container">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          SIRO Uniforms Lookbook
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Explore our premium selection of Corporate, Healthcare, and Hospitality attire in this comprehensive, high-fidelity digital showcase.
        </motion.p>
      </div>

      <div className="container">
        <div className="magazine-grid">
          <motion.div 
            className="magazine-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            onClick={() => setIsModalOpen(true)}
          >
            <div className="card-cover-wrapper">
              <img src="/book/1.jpeg" alt="STRIPES Lookbook" />
              <div className="card-overlay">
                <span>Open Lookbook <ChevronRight size={18} /></span>
              </div>
            </div>
            <div className="card-content">
              <h3>STRIPES Uniform Bazaar</h3>
              <p>2025 Comprehensive Textile Collection</p>
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
        <p style={{color: 'var(--text-muted)', marginBottom: '32px'}}>Check out our full collection in the catalog or try our 3D viewer.</p>
        <div style={{display: 'flex', gap: '16px', justifyContent: 'center'}}>
          <a href="/explore" className="btn btn-primary">Browse Catalog</a>
          <a href="/viewer?design=STRP-101" className="btn" style={{border: '1px solid var(--border)'}}>Try 3D Viewer</a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
