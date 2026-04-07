import React, { useState, useEffect, Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Search, Filter, Box, Loader2, ChevronUp, ChevronDown, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDesigns } from '../hooks/useDesigns';
import ShirtModel from '../components/ShirtModel';
import ErrorBoundary from '../components/ErrorBoundary';

export default function Products3DPage() {
  const { designs, loading, error } = useDesigns();
  const [activeDesign, setActiveDesign] = useState(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [isMobileCatalogueOpen, setIsMobileCatalogueOpen] = useState(false);

  // Set initial active design once loaded
  useEffect(() => {
    if (designs.length > 0 && !activeDesign) {
      setActiveDesign(designs[0]);
    }
  }, [designs, activeDesign]);

  const filteredDesigns = useMemo(() => {
    return designs.filter(d => {
      const matchesFilter = filter === 'all' || d.category?.toLowerCase() === filter.toLowerCase();
      const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase()) || 
                           d.code.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [designs, filter, search]);

  const categories = ['all', ...new Set(designs.map(d => d.category?.toLowerCase()).filter(Boolean))];

  if (loading) return (
    <div className="explorer-loading">
      <Loader2 className="animate-spin" size={48} />
      <p>Initializing Studio...</p>
    </div>
  );

  return (
    <div className="explorer-root">
      {/* 1. 3D STUDIO CANVAS (MVP BALANCED MODE) */}
      <section className="studio-canvas">
        <ErrorBoundary>
          <Suspense fallback={<div className="studio-loader">Loading Exhibit...</div>}>
            <Canvas 
              shadows={false} 
              dpr={[1, 1.5]}
              gl={{ 
                antialias: true, 
                stencil: false, 
                powerPreference: 'high-performance',
                alpha: true
              }}
            >
              <PerspectiveCamera makeDefault position={[0, 0, 5.5]} fov={35} />
              
              {/* Ultra-Stable Local 3-Point Lighting Rig */}
              <ambientLight intensity={0.8} />
              <directionalLight position={[5, 5, 5]} intensity={1.2} />
              <pointLight position={[-5, 5, -5]} intensity={0.6} color="#ffffff" />
              <pointLight position={[0, -5, 5]} intensity={0.4} color="#cfe2ff" />

              {activeDesign && (
                <ShirtModel 
                  // Pass only the color tint for the MVP
                  color={activeDesign.color} 
                />
              )}
              
              <OrbitControls autoRotate autoRotateSpeed={0.5} enablePan={false} minDistance={3} maxDistance={8} />
            </Canvas>
          </Suspense>
        </ErrorBoundary>

        {/* Studio Info Overlay */}
        <AnimatePresence mode="wait">
          {activeDesign && (
            <motion.div 
              key={activeDesign.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="studio-label"
            >
              <span className="label-code">{activeDesign.code}</span>
              <h1>{activeDesign.name}</h1>
              <p>{activeDesign.description || "Premium SIRO Uniform Exhibit"}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Catalogue Toggle Button */}
        <button 
          className="mobile-catalogue-toggle show-mobile"
          onClick={() => {
            setIsMobileCatalogueOpen(!isMobileCatalogueOpen);
            if (!isMobileCatalogueOpen) {
              const sidebar = document.querySelector('.exhibit-sidebar');
              sidebar?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          <span>{isMobileCatalogueOpen ? 'Close Catalogue' : 'View Catalogue'}</span>
        </button>
      </section>

      {/* 2. EXHIBIT CATALOGUE */}
      <aside className={`exhibit-sidebar ${isMobileCatalogueOpen ? 'open' : ''}`}>
        <header className="sidebar-header">
          <h2>Catalogue</h2>
        </header>

        <nav className="sidebar-controls">
          <div className="control-group">
            <div className="select-wrapper">
              <Filter className="select-icon" size={14} />
              <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                className="category-select"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="control-group">
            <div className="search-wrapper">
              <Search className="search-icon" size={14} />
              <input 
                type="text" 
                placeholder="Search exhibit..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </nav>

        <div className="sidebar-scroll">
          <div className="exhibit-grid">
            {filteredDesigns.map(design => (
              <motion.div 
                key={design.code || design.id}
                layout
                onClick={() => {
                  setActiveDesign(design);
                }}
                className={`exhibit-item ${activeDesign?.code === design.code ? 'active' : ''}`}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="item-swatch" style={{ background: design.color || '#eee' }} />
                <div className="item-info">
                  <span className="item-code">{design.code}</span>
                  <h3 className="item-name">{design.name}</h3>
                </div>
                {activeDesign?.code === design.code && (
                  <motion.div layoutId="active-indicator" className="item-indicator" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
