import React, { forwardRef } from 'react';
import HTMLPageFlip from 'react-pageflip';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Page = forwardRef((props, ref) => {
  return (
    <div 
      className="page" 
      ref={ref} 
      data-density={props.density || 'soft'}
      onClick={() => props.onClick(props.image)}
      style={{ cursor: 'zoom-in' }}
    >
      <div className="page-content" style={{padding: 0, overflow: 'hidden', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <img 
          src={props.image} 
          alt={`Page ${props.number}`} 
          style={{
            maxWidth: '100%', 
            maxHeight: '100%', 
            objectFit: 'contain',
            display: 'block'
          }} 
        />
        {/* Subtle inner shadow for the spine */}
        <div style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: '30px',
          [props.number % 2 === 0 ? 'right' : 'left']: 0,
          background: `linear-gradient(${props.number % 2 === 0 ? 'to left' : 'to right'}, rgba(0,0,0,0.1), transparent)`,
          pointerEvents: 'none'
        }} />
      </div>
    </div>
  );
});

export default function FlipbookCatalog() {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  const [dimensions, setDimensions] = React.useState(() => {
    const mobile = window.innerWidth < 768;
    // Maximize width for mobile (95% of screen)
    const w = mobile ? Math.min(window.innerWidth * 0.95, 450) : 450;
    // Enforce strict 450x600 aspect ratio (1.333) to kill white bars
    const h = mobile ? w * (600 / 450) : 600; 
    return { width: w, height: h };
  });
  const [scale, setScale] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(0);
  const flipBookRef = React.useRef(null);
  const constraintsRef = React.useRef(null);

  React.useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      const w = mobile ? Math.min(window.innerWidth * 0.95, 450) : 450;
      const h = mobile ? w * (600 / 450) : 600; 
      setDimensions({ width: w, height: h });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (scale > 1) return;
      if (e.key === 'ArrowRight') flipBookRef.current?.pageFlip().flipNext();
      if (e.key === 'ArrowLeft') flipBookRef.current?.pageFlip().flipPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scale]);

  const handleWheel = (e) => {
    if (isMobile) return;
    const delta = e.deltaY;
    const zoomStep = 0.2;
    setScale(prev => {
      const newScale = prev - (delta > 0 ? zoomStep : -zoomStep);
      return Math.min(Math.max(newScale, 1), 3);
    });
  };

  const onFlip = (e) => {
    setCurrentPage(e.data);
  };

  const bookWidth = isMobile ? dimensions.width : dimensions.width * 2;
  const bookHeight = dimensions.height;

  const dragLimits = {
    left: -((bookWidth * scale - bookWidth) / 2),
    right: (bookWidth * scale - bookWidth) / 2,
    top: -((bookHeight * scale - bookHeight) / 2),
    bottom: (bookHeight * scale - bookHeight) / 2
  };

  // We have 16 images in public/book/ (1.jpeg to 16.jpeg)
  const pageImageUrls = Array.from({ length: 16 }, (_, i) => `/book/${i + 1}.jpeg`);
  const isLastPage = currentPage >= pageImageUrls.length - (isMobile ? 1 : 2);
  const isFirstPage = currentPage === 0;
  return (
    <div 
      className="flipbook-wrapper" 
      ref={constraintsRef}
      onWheel={handleWheel}
      style={{ 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        overflow: 'hidden',
        touchAction: 'none'
      }}
    >
      <motion.div
        key={isMobile ? 'mobile' : 'desktop'}
        drag={scale > 1}
        dragConstraints={dragLimits}
        dragElastic={0.1}
        dragMomentum={false}
        animate={{ 
          scale: scale,
          x: scale === 1 ? 0 : undefined,
          y: scale === 1 ? 0 : undefined
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 250 }}
        style={{ 
          originX: 0.5, 
          originY: 0.5,
          cursor: scale > 1 ? 'grab' : 'default',
          touchAction: 'none'
        }}
        whileDrag={{ cursor: 'grabbing' }}
      >
        <HTMLPageFlip
          ref={flipBookRef}
          width={dimensions.width}
          height={dimensions.height}
          size="fixed"
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={scale === 1}
          clickEventForward={true}
          className="siro-lookbook"
          style={{ pointerEvents: scale > 1 ? 'none' : 'auto' }}
          startPage={0}
          drawShadow={true}
          flippingTime={1000}
          useMouseEvents={scale === 1}
          usePortrait={isMobile}
          startZIndex={0}
          autoSize={true}
          disableFlipByClick={isMobile ? false : true}
          onFlip={onFlip}
        >
          {pageImageUrls.map((url, index) => (
            <Page 
              key={index} 
              number={index + 1} 
              image={url} 
              density={index === 0 || index === 15 ? 'hard' : 'soft'}
              onClick={() => {}}
            />
          ))}
        </HTMLPageFlip>
      </motion.div>

      {/* Desktop Navigation Arrows */}
      {!isMobile && scale === 1 && (
        <>
          <button 
            onClick={() => flipBookRef.current?.pageFlip().flipPrev()}
            disabled={isFirstPage}
            className="nav-arrow prev"
            style={{
              position: 'absolute',
              left: '40px',
              opacity: isFirstPage ? 0 : 1,
              pointerEvents: isFirstPage ? 'none' : 'auto',
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            <ChevronLeft size={32} color="white" />
          </button>
          <button 
            onClick={() => flipBookRef.current?.pageFlip().flipNext()}
            disabled={isLastPage}
            className="nav-arrow next"
            style={{
              position: 'absolute',
              right: '40px',
              opacity: isLastPage ? 0 : 1,
              pointerEvents: isLastPage ? 'none' : 'auto',
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            <ChevronRight size={32} color="white" />
          </button>
        </>
      )}

      {!isMobile && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'rgba(255,255,255,0.4)',
          fontSize: '0.75rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          pointerEvents: 'none'
        }}>
          {scale > 1 ? 'Scroll to Zoom • Drag to Pan' : 'Scroll to Zoom • Arrows or Corner to Flip'}
        </div>
      )}
    </div>
  );
}
