import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useVelocity, useAnimationFrame } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCcw, ArrowRightLeft, Play, Pause, Maximize2 } from 'lucide-react';

const SECTORS = [
  { id: 'corporate', name: 'Corporate' },
  { id: 'healthcare', name: 'Healthcare' },
  { id: 'hospitality', name: 'Hospitality' },
  { id: 'education', name: 'Education' },
];

const SUBDIVISIONS = {
  corporate: ['All', 'Shirt', 'Pant', 'Blazer', 'Suit'],
  healthcare: ['All', 'Scrubs', 'Lab Coats', 'Aprons'],
  hospitality: ['All', 'Chef Coats', 'Aprons', 'Shirt'],
  education: ['All', 'Blazers', 'Shirts', 'Pants']
};

const DESIGNS = {
  corporate: [
    {
      id: 'c1-clean',
      name: 'Executive Shadow (Clean)',
      category: 'Shirt',
      image: '/images/studio/corp_woman.png',
      isSequence: true,
      framePath: '/images/studio/frames/clean-sequence/',
      frameCount: 185
    },

    { id: 'c2', name: 'Director Suite', category: 'Suit', image: '/images/studio/corp_man.png' },
    { id: 'c3', name: 'Legacy Uniform', category: 'Blazer', image: '/images/studio/corporate_hero.png' },
  ],

  healthcare: [
    { id: 'm1', name: 'Aero-Med Tech', category: 'Scrubs', image: '/images/studio/med_man.png' },
    { id: 'm2', name: 'Regen Scrubs', category: 'Scrubs', image: '/images/studio/medical_hero.png' },
  ],
  hospitality: [
    { id: 'h1', name: 'Culinary Executive', category: 'Chef Coats', image: '/images/studio/hos_woman.png' },
    { id: 'h2', name: 'Chef Signature', category: 'Chef Coats', image: '/images/studio/hospitality_hero.png' },
  ],
  education: [
    { id: 'e1', name: 'Institutional Blazer', category: 'Blazers', image: '/images/studio/edu_man.png' },
    { id: 'e2', name: 'Legacy Blazer', category: 'Blazers', image: '/images/studio/academic_hero.png' },
  ]
};

const ImageSequenceViewer = ({ basePath, frameCount, isActive }) => {
  const [currentFrame, setCurrentFrame] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const sequenceRef = useRef([]);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // --- LIQUID MOTION PHYSICS (Rotation) ---
  const frameProgress = useMotionValue(1);
  const springFrame = useSpring(frameProgress, {
    stiffness: 120,
    damping: 60,
    mass: 0.5
  });

  // --- KINETIC ZOOM & PAN PHYSICS ---
  const zoomScale = useMotionValue(1);
  const springZoom = useSpring(zoomScale, { stiffness: 150, damping: 40 });

  const panX = useMotionValue(0);
  const panY = useMotionValue(0);
  const springPanX = useSpring(panX, { stiffness: 400, damping: 50 }); // Ultra-stiff for "Direct-Drive" feel
  const springPanY = useSpring(panY, { stiffness: 400, damping: 50 });

  const [isZooming, setIsZooming] = useState(false);
  const zoomTimerRef = useRef(null);

  const velocity = useVelocity(springFrame);
  const blurValue = useTransform(velocity, [-3000, 0, 3000], [0.8, 0, 0.8]);



  useEffect(() => {
    if (!isActive) return;

    let loadedCount = 0;
    const frames = [];

    const loadFrame = (index, isPriority = false) => {
      if (frames[index]) return;

      return new Promise((resolve) => {
        const img = new Image();
        const frameNum = index.toString().padStart(6, '0');
        img.src = `${basePath}frame_${frameNum}.webp`;
        img.onload = () => {
          loadedCount++;
          if (loadedCount % 10 === 0 || loadedCount === frameCount) {
            setLoadProgress(Math.round((loadedCount / frameCount) * 100));
          }

          if (loadedCount === frameCount) {
            setIsLoading(false);
          }
          frames[index] = img;
          resolve();
        };
      });
    };

    const loadAll = async () => {
      const criticalFrames = [1, 5, 10, 20, 30];
      await Promise.all(criticalFrames.map(f => loadFrame(f, true)));
      for (let i = 1; i <= frameCount; i++) {
        loadFrame(i);
      }
    };

    loadAll();
    sequenceRef.current = frames;
  }, [basePath, frameCount, isActive]);

  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const watchdogTimerRef = useRef(null);

  useAnimationFrame(() => {
    if (isLoading) return;

    if (isAutoPlaying) {
      frameProgress.set(frameProgress.get() + 0.3);
    }

    let rawValue = springFrame.get();
    let wrappedFrame = Math.floor(((rawValue - 1) % frameCount + frameCount) % frameCount) + 1;

    if (wrappedFrame !== currentFrame) {
      setCurrentFrame(wrappedFrame);
      if (canvasRef.current && sequenceRef.current[wrappedFrame]) {
        const img = sequenceRef.current[wrappedFrame];
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
  });

  useEffect(() => {
    if (!isLoading && canvasRef.current && sequenceRef.current[currentFrame]) {
      const img = sequenceRef.current[currentFrame];
      canvasRef.current.width = img.width;
      canvasRef.current.height = img.height;
      const ctx = canvasRef.current.getContext('2d');
      ctx.drawImage(img, 0, 0, img.width, img.height);
    }
  }, [isLoading, currentFrame]);

  const resetWatchdog = () => {
    setIsAutoPlaying(false);
    if (watchdogTimerRef.current) clearTimeout(watchdogTimerRef.current);
    watchdogTimerRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 1000);
  };

  const handleDrag = (event, info) => {
    resetWatchdog();
    const scale = zoomScale.get();

    if (scale > 1.1) {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      // STRICT LIMITS: Garment can only move by the "extra" pixels generated by scale
      const limitX = (rect.width * scale - rect.width) / 1.8;
      const limitY = (rect.height * scale - rect.height) / 1.5;

      const nextX = panX.get() + info.delta.x;
      const nextY = panY.get() + info.delta.y;

      // Hard Clamping with 10% elastic "Buffer" for that museum feel
      panX.set(Math.min(Math.max(nextX, -limitX), limitX));
      panY.set(Math.min(Math.max(nextY, -limitY), limitY));
    } else {
      const sensitivity = 2.5;
      frameProgress.set(frameProgress.get() - (info.delta.x / sensitivity));
    }
  };

  const handleWheel = (e) => {
    if (!containerRef.current) return;

    const zoomSpeed = 0.0025;
    const oldScale = zoomScale.get();
    const newScale = Math.min(Math.max(oldScale - e.deltaY * zoomSpeed, 1), 3);

    if (newScale !== oldScale) {
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - rect.width / 2;
      const mouseY = e.clientY - rect.top - rect.height / 2;

      const scaleChange = newScale / oldScale;

      let nextX = mouseX - (mouseX - panX.get()) * scaleChange;
      let nextY = mouseY - (mouseY - panY.get()) * scaleChange;

      // Final edge-clamp to prevent focal jump at max scale
      const limitX = (rect.width * newScale - rect.width) / 1.8;
      const limitY = (rect.height * newScale - rect.height) / 1.5;

      if (newScale <= 1.01) {
        nextX = 0;
        nextY = 0;
      } else {
        nextX = Math.min(Math.max(nextX, -limitX), limitX);
        nextY = Math.min(Math.max(nextY, -limitY), limitY);
      }

      panX.set(nextX);
      panY.set(nextY);
      zoomScale.set(newScale);

      setIsZooming(true);
      if (zoomTimerRef.current) clearTimeout(zoomTimerRef.current);
      zoomTimerRef.current = setTimeout(() => setIsZooming(false), 2000);
    }
  };

  const handleDoubleClick = () => {
    zoomScale.set(1);
    panX.set(0);
    panY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onDoubleClick={handleDoubleClick}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // REMOVED OVERFLOW HIDDEN FROM HERE TO PREVENT CLIPPING BUTTONS
      }}
    >
      {isLoading && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255,255,255,0.8)',
          backdropFilter: 'blur(10px)',
          zIndex: 10,
          borderRadius: '24px'
        }}>
          <div style={{ fontSize: '0.6rem', fontWeight: 900, letterSpacing: '2px', color: 'var(--brand)', marginBottom: '12px' }}>
            INITIALIZING_SYSTEM_{loadProgress}%
          </div>
          <div style={{ width: '120px', height: '2px', background: 'rgba(0,0,0,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
            <motion.div
              animate={{ width: `${loadProgress}%` }}
              style={{ height: '100%', background: 'var(--brand)' }}
            />
          </div>
        </div>
      )}

      {/* CLIPPED VIEWPORT FOR GARMENT - Boundary for Zoom/Pan */}
      <div style={{ width: '100%', height: '100%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', inset: 0 }}>
        <motion.div
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={zoomScale.get() > 1.1 ? 0 : 0.8}
          onDrag={handleDrag}
          onPointerDown={resetWatchdog}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: zoomScale.get() > 1.1 ? 'move' : 'grab',
            x: springPanX,
            y: springPanY,
            scale: springZoom,
            touchAction: 'none'
          }}
        >
          <canvas
            ref={canvasRef}
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              objectFit: 'contain',
              pointerEvents: 'none',
              filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.15))',
              opacity: isLoading ? 0 : 1,
              transition: 'opacity 0.4s ease',
              willChange: 'opacity, transform'
            }}
          />
        </motion.div>
      </div>

      {/* STUDIO CONTROL PILLAR - Vertical Alignment in Architectural Gap */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            position: 'absolute',
            // Fixed anchor inside the stage/sidebar gap for exact placement.
            right: '-82px',
            top: 'calc(50% - 44px)',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            zIndex: 160
          }}
        >
          {/* Play/Pause Toggle */}
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: '0 15px 35px rgba(0,0,0,0.12)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            title={isAutoPlaying ? "Pause Rotation" : "Play Rotation"}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: isAutoPlaying ? 'var(--brand)' : 'white',
              color: isAutoPlaying ? 'white' : 'var(--brand)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0,0,0,0.08)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {isAutoPlaying ? (
              <Pause size={16} fill="white" strokeWidth={2.5} />
            ) : (
              <Play size={16} style={{ marginLeft: '2px' }} strokeWidth={2.5} />
            )}
          </motion.button>

          {/* Reset View */}
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: '0 15px 35px rgba(0,0,0,0.12)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDoubleClick}
            title="Reset View"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'white',
              color: 'var(--brand)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0,0,0,0.08)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <motion.div whileHover={{ rotate: -180 }} transition={{ duration: 0.4 }}>
              <RotateCcw size={16} strokeWidth={2.5} />
            </motion.div>
          </motion.button>
        </motion.div>
      )}

      {/* Zoom HUD */}
      <AnimatePresence>
        {isZooming && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            style={{
              position: 'absolute',
              top: '40px',
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '8px 16px',
              background: 'rgba(0,0,0,0.8)',
              backdropFilter: 'blur(10px)',
              color: 'white',
              borderRadius: '100px',
              fontSize: '0.6rem',
              fontWeight: 900,
              letterSpacing: '2px',
              zIndex: 100,
              display: 'flex',
              gap: '12px',
              alignItems: 'center'
            }}
          >
            <span style={{ opacity: 0.6 }}>MAGNIFICATION</span>
            <span style={{ color: 'var(--accent)' }}>{Math.round(springZoom.get() * 100) / 100}X</span>
            <div style={{ width: '1px', height: '10px', background: 'rgba(255,255,255,0.2)' }} />
            <span style={{ fontSize: '0.5rem', opacity: 0.5 }}>DBL-CLICK TO RESET</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{
        position: 'absolute',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '0.55rem',
        fontWeight: 800,
        textTransform: 'uppercase',
        letterSpacing: '2.5px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        whiteSpace: 'nowrap',
        opacity: 0.4
      }}>
        <span>DRAG TO ROTATE</span>
        <div style={{ width: '4px', height: '4px', background: 'currentColor', borderRadius: '50%' }} />
        <span>WHEEL TO ZOOM</span>
      </div>

    </div>
  );
};

const PillDropdown = ({ label, value, options, onChange, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <motion.button
        whileHover={{ scale: 1.01, backgroundColor: 'rgba(0,0,0,0.06)' }}
        whileTap={{ scale: 0.99 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '12px 20px',
          borderRadius: '16px',
          background: 'rgba(0,0,0,0.03)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(0,0,0,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          color: '#1a1a1a',
          gap: '12px',
          outline: 'none',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {Icon && <Icon size={14} style={{ opacity: 0.6 }} />}
          <span style={{ fontSize: '0.6rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px', color: '#888' }}>{label}</span>
          <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{value}</span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 90 : 0 }}>
          <ChevronRight size={16} strokeWidth={2.5} style={{ opacity: 0.5 }} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            style={{
              position: 'absolute',
              bottom: 'calc(100% + 12px)',
              left: 0,
              right: 0,
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              padding: '8px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              border: '1px solid rgba(0,0,0,0.05)',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}
          >
            {options.map((opt) => (
              <button
                key={opt.id || opt}
                onClick={() => {
                  onChange(opt.id || opt);
                  setIsOpen(false);
                }}
                style={{
                  padding: '10px 16px',
                  borderRadius: '12px',
                  border: 'none',
                  background: (opt.id || opt) === value ? 'rgba(0,0,0,0.05)' : 'transparent',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: (opt.id || opt) === value ? 700 : 500,
                  color: '#1a1a1a',
                  transition: 'all 0.2s'
                }}
              >
                {opt.name || opt}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};




const CollectionsPage = () => {
  const [selectedSector, setSelectedSector] = useState('corporate');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef(null);

  // Carousel Physics
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 30 });

  const filteredDesigns = DESIGNS[selectedSector].filter(d =>
    selectedCategory === 'All' || d.category === selectedCategory
  );

  const handleDragEnd = (e, info) => {
    const threshold = 100;
    if (info.offset.x < -threshold && activeIndex < filteredDesigns.length - 1) {
      setActiveIndex(prev => prev + 1);
    } else if (info.offset.x > threshold && activeIndex > 0) {
      setActiveIndex(prev => prev - 1);
    }
  };

  // Sync index if filtering changes
  useEffect(() => {
    setActiveIndex(0);
  }, [selectedSector, selectedCategory]);

  // Handle URL parameters for direct sector deep-links
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sector = params.get('sector');
    if (sector && SECTORS.some(s => s.id === sector)) {
      setSelectedSector(sector);
      setSelectedCategory('All');
    }
  }, []);


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#f6f6f6',
        backgroundImage: `
          radial-gradient(circle at 50% 50%, #ffffff 0%, #eeeeee 100%),
          url('https://www.transparenttextures.com/patterns/concrete-wall.png')
        `,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start', // Align to left so stage starts at 0
        justifyContent: 'center',
        overflow: 'hidden',
        color: '#1a1a1a',
        fontFamily: "'Outfit', sans-serif"
      }}
    >

      {/* 3D CAROUSEL STAGE - Now focused solo view */}
      <div
        ref={containerRef}
        style={{
          width: 'calc(100% - 480px)', // Accounting for 400px sidebar + 80px margin
          flex: 1,
          position: 'relative',
          perspective: '1500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >

        <AnimatePresence mode="wait">
          {filteredDesigns[activeIndex] && (
            <motion.div
              key={filteredDesigns[activeIndex].id}
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              style={{
                position: 'absolute',
                top: '120px',    // Architectural Sync with Sidebar Top
                bottom: '60px',  // Architectural Sync with Sidebar Bottom
                left: '10%',
                right: '10%',
                zIndex: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}



            >
              {/* THE MODEL - Solo Scrubber */}
              <motion.div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}
              >
                {filteredDesigns[activeIndex].isSequence ? (
                  <ImageSequenceViewer
                    basePath={filteredDesigns[activeIndex].framePath}
                    frameCount={filteredDesigns[activeIndex].frameCount}
                    isActive={true}
                  />
                ) : (
                  <img
                    src={filteredDesigns[activeIndex].image}
                    alt={filteredDesigns[activeIndex].name}
                    style={{
                      maxHeight: '100%',
                      maxWidth: '100%',
                      objectFit: 'contain',
                      mixBlendMode: 'multiply',
                      filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.15))'
                    }}
                  />
                )}

                {/* 360 Icon Removed as per request */}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>



      {/* NAVIGATION CHEVRONS - Anchored to center view stage */}
      <div style={{
        position: 'absolute',
        top: 'calc(50% + 30px)', // Balanced with weighted center of Sidebar (120px to 60px)
        left: '0',
        width: 'calc(100% - 480px)', // Match the carousel stage width
        padding: '0 5vw',
        display: 'flex',
        justifyContent: 'space-between',
        pointerEvents: 'none',
        zIndex: 150,
        transform: 'translateY(-50%)'
      }}>


        <button
          onClick={() => setActiveIndex(prev => Math.max(0, prev - 1))}
          aria-label="Previous design"
          style={{
            pointerEvents: 'auto',
            background: 'none',
            border: 'none',
            color: '#1a1a1a',
            cursor: 'pointer',
            opacity: activeIndex === 0 ? 0.1 : 0.8,
            transition: 'all 0.3s'
          }}
        >
          <ChevronLeft size={48} strokeWidth={2.5} />
        </button>
        <button
          onClick={() => setActiveIndex(prev => Math.min(filteredDesigns.length - 1, prev + 1))}
          aria-label="Next design"
          style={{
            pointerEvents: 'auto',
            background: 'none',
            border: 'none',
            color: '#1a1a1a',
            cursor: 'pointer',
            opacity: activeIndex === filteredDesigns.length - 1 ? 0.1 : 0.8,
            transition: 'all 0.3s'
          }}
        >
          <ChevronRight size={48} strokeWidth={2.5} />
        </button>

      </div>

      {/* ARCHIVE INDEX: RIGHT-SIDE MASTER CONTROL */}
      {/* ARCHIVE DASHBOARD - MODULAR DUAL-PILL ARCHITECTURE */}
      <div style={{
        position: 'absolute',
        right: '40px',
        top: '120px',
        bottom: '240px', // Lifted to make room for the second pill
        width: '400px', // Explicit width for consistency
        backgroundColor: 'rgba(255, 255, 255, 0.82)',
        backdropFilter: 'blur(60px) saturate(200%)',
        border: '1px solid rgba(255, 255, 255, 0.6)',
        borderRadius: '32px',
        boxShadow: '0 40px 120px rgba(0,0,0,0.1), inset 0 0 60px rgba(255,255,255,0.4)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 200,
        overflow: 'hidden'
      }}>
        {/* Index Body (Design Sequence) */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '32px', minHeight: 0 }}>
          <div style={{
            fontSize: '0.65rem',
            fontWeight: 950,
            color: '#888',
            letterSpacing: '5px',
            marginBottom: '24px',
            opacity: 0.6
          }}>DESIGN</div>
          <div
            style={{ flex: 1, overflowY: 'auto', paddingRight: '10px', position: 'relative', minHeight: 0 }}
            className="custom-scrollbar"
            data-lenis-prevent
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filteredDesigns.map((d, idx) => (
                <button
                  key={d.id}
                  onClick={() => setActiveIndex(idx)}
                  style={{
                    background: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    padding: '0',
                    borderRadius: '20px',
                    // Unified Premium Glass Card Look
                    backgroundColor: activeIndex === idx ? '#ffffff' : 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: activeIndex === idx ? 'blur(12px)' : 'blur(4px)',
                    border: activeIndex === idx ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(0,0,0,0.04)',
                    boxShadow: activeIndex === idx ? '0 15px 45px rgba(0,0,0,0.06)' : 'none',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    display: 'flex',
                    alignItems: 'stretch',
                    justifyContent: 'flex-start',
                    gap: '0',
                    position: 'relative',
                    overflow: 'hidden',
                    minHeight: '110px',
                    outline: 'none' // Remove default browser focus rings
                  }}
                >
                  <div style={{
                    width: '100px',
                    height: '110px',
                    backgroundColor: 'transparent',
                    overflow: 'hidden',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0',
                    // No borderRadius here so it sits completely flush inside the parent button
                  }}>
                    <img
                      src={d.image}
                      alt=""
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: activeIndex === idx ? 1 : 0.6,
                        filter: activeIndex === idx ? 'none' : 'grayscale(0.2)',
                        transition: 'all 0.4s ease',
                        borderRadius: '20px'
                      }}
                    />
                  </div>

                  {/* Content Area (Right) */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '16px 24px', gap: '4px' }}>
                    {/* Dynamic Indicator */}
                    {activeIndex === idx && (
                      <motion.div
                        layoutId="archive-selection"
                        style={{
                          position: 'absolute',
                          left: '100px',
                          top: '15%',
                          bottom: '15%',
                          width: '3px',
                          backgroundColor: 'var(--accent)',
                          borderRadius: '0 4px 4px 0'
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}

                    <span style={{
                      fontSize: '0.65rem',
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 900,
                      letterSpacing: '3px',
                      color: activeIndex === idx ? 'var(--accent)' : '#888',
                      opacity: activeIndex === idx ? 1 : 0.6
                    }}>
                      ARC-{String(idx + 1).padStart(3, '0')}
                    </span>
                    <div style={{
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: activeIndex === idx ? '#000' : '#444',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.2
                    }}>
                      {d.name}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CONTROL PILL - SELECTORS */}
      <div style={{
        position: 'absolute',
        right: '40px',
        bottom: '60px',
        width: '400px',
        backgroundColor: 'rgba(255, 255, 255, 0.82)',
        backdropFilter: 'blur(60px) saturate(200%)',
        border: '1px solid rgba(255, 255, 255, 0.6)',
        borderRadius: '32px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.08), inset 0 0 40px rgba(255,255,255,0.4)',
        padding: '24px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        zIndex: 205, // Slightly higher to ensure selector dropdowns overlap correctly
      }}>
        <PillDropdown
          label="Sector"
          value={SECTORS.find(s => s.id === selectedSector)?.name}
          options={SECTORS}
          onChange={(val) => {
            setSelectedSector(val);
            setSelectedCategory('All');
          }}
        />
        <PillDropdown
          label="Category"
          value={selectedCategory}
          options={SUBDIVISIONS[selectedSector]}
          onChange={setSelectedCategory}
        />
      </div>


      {/* STUDIO FLOOR - Grounding the models */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '30vh',
        background: 'linear-gradient(to top, rgba(0,0,0,0.02) 0%, transparent 100%)',
        pointerEvents: 'none'
      }} />

    </motion.div>
  );
};

export default CollectionsPage;
