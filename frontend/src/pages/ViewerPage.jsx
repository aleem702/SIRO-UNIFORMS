import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Layers, Info } from 'lucide-react';
import { useDesignDetail } from '../hooks/useDesigns';
import ModelViewer from '../components/ModelViewer';
import ModelSelector from '../components/ModelSelector';
import LeadCaptureModal from '../components/LeadCaptureModal';

const MODEL_TYPES = ['shirt'];

export default function ViewerPage() {
  const [searchParams]    = useSearchParams();
  const code              = searchParams.get('design');
  const { design, loading } = useDesignDetail(code);
  const [modelType, setModelType] = useState('shirt');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const navigate = useNavigate();

  if (loading) return <div className="viewer-loading container" style={{padding: '100px'}}>Loading exclusive design metadata...</div>;
  if (!design) return (
    <div className="viewer-error container" style={{padding: '100px', textAlign: 'center'}}>
      <h2>Design pattern not found</h2>
      <p>The code "{code}" does not exist in our production database.</p>
      <button className="btn btn-primary" onClick={() => navigate('/explore')} style={{marginTop: '20px'}}>
        <ArrowLeft size={18} /> Return to Catalog
      </button>
    </div>
  );

  return (
    <div className="viewer-page view-transition">
      <motion.aside 
        className={`viewer-sidebar ${isSidebarOpen ? 'open' : ''}`}
        initial={window.innerWidth > 768 ? { x: -40, opacity: 0 } : { y: 100 }}
        animate={window.innerWidth > 768 ? { x: 0, opacity: 1 } : { y: isSidebarOpen ? 0 : 'calc(100% - 80px)' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        <div className="sidebar-mobile-handle show-mobile" onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={{ 
          width: '40px', height: '4px', background: 'var(--border)', borderRadius: '2px', margin: '0 auto 20px', cursor: 'pointer' 
        }} />

        <button 
          onClick={() => navigate('/explore')} 
          style={{border: 'none', background: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px'}}
        >
          <ArrowLeft size={20} /> Back to Collection
        </button>

        <div className="design-meta">
          <span className="design-code-badge">{design.code}</span>
          <h2 style={{fontSize: '2rem', marginTop: '12px'}}>{design.name}</h2>
          
          <div style={{marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px'}}>
            <div style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
              <div className="feature-icon" style={{width: '32px', height: '32px', marginBottom: 0}}><Layers size={16} /></div>
              <span style={{fontSize: '0.9rem'}}><strong>Fabric:</strong> {design.fabric_type}</span>
            </div>
            <div style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
              <div className="feature-icon" style={{width: '32px', height: '32px', marginBottom: 0}}><Info size={16} /></div>
              <span style={{fontSize: '0.9rem'}}><strong>Category:</strong> {design.category}</span>
            </div>
          </div>

          <p className="description" style={{marginTop: '24px', opacity: 0.7}}>
            {design.description || "Premium production-ready textile design optimized for industrial manufacturing."}
          </p>
        </div>
        
        <ModelSelector
          options={MODEL_TYPES}
          selected={modelType}
          onChange={setModelType}
        />

        <div style={{marginTop: 'auto', background: 'var(--surface-2)', padding: '24px', borderRadius: 'var(--radius-md)'}}>
          <button
            className="btn btn-primary"
            onClick={() => setIsModalOpen(true)}
          >
            <ShoppingBag size={18} /> Request Bulk Quote
          </button>
          <p style={{fontSize: '0.75rem', marginTop: '16px', textAlign: 'center', color: 'var(--text-muted)'}}>
            Enterprise lead time: 20-30 days globally.
          </p>
        </div>
      </motion.aside>

      <motion.main 
        className="viewer-canvas-wrapper"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <ModelViewer
          modelType={modelType}
          textureUrl={design.texture_url || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAyNCIgaGVpZ2h0PSIxMDI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiLz48L3N2Zz4='}
          color={design.color}
        />
      </motion.main>

      <LeadCaptureModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        designCode={design.code} 
      />

      {/* Floating Toggle for Mobile */}
      {!isSidebarOpen && (
        <motion.button
          className="show-mobile"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setIsSidebarOpen(true)}
          style={{
            position: 'fixed',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--brand)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '50px',
            border: 'none',
            fontWeight: 700,
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Info size={18} /> View Details & Quote
        </motion.button>
      )}
    </div>
  );
}
