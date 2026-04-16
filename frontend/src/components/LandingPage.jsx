import { useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Shirt, Package, Layers2, Bolt, ArrowRight, ChevronRight, ShieldCheck, Globe, Cpu, GraduationCap, Building2, ChefHat, Activity, MessageCircle, PencilRuler, ClipboardCheck, Factory } from 'lucide-react';
import Footer from '../components/Footer';

function ParallaxExhibitCard({ industry, index }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  
  const imgX = useTransform(mouseXSpring, [-0.5, 0.5], ["-8%", "8%"]);
  const imgY = useTransform(mouseYSpring, [-0.5, 0.5], ["-8%", "8%"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={`/collection?sector=${industry.slug}`}
      className={`exhibit-card-root ${industry.span}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ textDecoration: 'none' }}
    >
      <motion.div 
        className="parallax-container"
        style={{ 
          rotateX, 
          rotateY,
          overflow: 'hidden',
          borderRadius: '48px',
          isolation: 'isolate',
          WebkitBackdropFilter: 'blur(12px)',
          WebkitMaskImage: '-webkit-radial-gradient(white, black)',
          willChange: 'transform'
        }}
      >
        <div className="blueprint-pattern" />
        
        <motion.div 
          className="parallax-image-wrapper"
          style={{ x: imgX, y: imgY }}
        >
          <img src={industry.img} alt={industry.title} />
        </motion.div>

        <div className="exhibit-glass-label">
          <div className="exhibit-title-row">
            <h3 className="text-display" style={{ fontSize: '1.4rem', margin: 0, color: 'var(--brand)' }}>
              {industry.title}
            </h3>
            <div className="exhibit-icon-box">
              {industry.icon}
            </div>
          </div>
          
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
            {industry.desc}
          </p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Explore Collection
            </span>
            <ArrowRight size={14} color="var(--accent)" />
          </div>
        </div>
      </motion.div>
    </motion.a>
  );
}

export default function LandingPage() {
  const [activeStep, setActiveStep] = useState(null);
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const { scrollY } = useScroll();
  
  // Hero Pinning: Video stays clear for the first 50px of scroll to prevent snapping on refresh
  const heroOpacity = useTransform(scrollY, [50, 450], [1, 0.4]);
  
  // Museum Reveal Content Props - Sync'd to the smoothed clock for solid transitions
  const shelfOpacity = useTransform(scrollY, [20, 250], [0, 1]);
  const shelfShadow = useTransform(scrollY, [200, 500], ["0px 0px 0px rgba(0,0,0,0)", "0px -30px 60px rgba(0,0,0,0.15)"]);

  return (
    <div className="view-transition" style={{ backgroundColor: 'var(--brand)' }}>
      <motion.header 
        className="hero main-hero" 
        style={{ 
          position: 'sticky', 
          top: 0, 
          zIndex: 1,
          overflow: 'hidden' 
        }}
      >
        {/* Cinematic Hero Video - Stationary backdrop */}
        <div className="hero-video-container">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="hero-video-element"
            onLoadedData={(e) => e.target.classList.add('loaded')}
            style={{ opacity: 1 }} // Force visibility
          >
            <source src="/hero-video.webm" type="video/webm" />
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          
          {/* Animated Veil: We fade this overlay IN to dim the video, rather than fading the video OUT */}
          <motion.div 
            className="hero-video-overlay"
            style={{ 
              opacity: useTransform(scrollY, [0, 500], [0.4, 0.9])
            }}
          />
        </div>

        <motion.div 
          className="container" 
          style={{ 
            position: 'relative', 
            zIndex: 5,
            opacity: heroOpacity,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            height: '100%',
            margin: 0
          }}
        >
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            style={{ textAlign: 'left', maxWidth: '900px' }}
          >
            
            <motion.h1 
              className="text-display" 
              style={{ 
                fontSize: 'clamp(3.2rem, 12vw, 7rem)', 
                color: '#fff', 
                lineHeight: 'clamp(0.9, 5vw, 0.85)', 
                marginBottom: 'clamp(16px, 4vw, 40px)',
                letterSpacing: '-0.05em',
                fontWeight: 900,
                textTransform: 'none',
                textShadow: '0 4px 30px rgba(0,0,0,0.3)'
              }}
            >
              Professional Uniforms <br /> 
              <span style={{ color: 'var(--accent)' }}>Redefined.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              style={{ 
                borderTop: '1px solid rgba(255,255,255,0.2)',
                paddingTop: 'clamp(12px, 3vw, 24px)',
                marginBottom: 'clamp(24px, 5vw, 40px)',
                maxWidth: '600px'
              }}
            >
              <p style={{ 
                fontSize: 'clamp(1rem, 2vw, 1.4rem)', 
                fontStyle: 'italic', 
                color: 'rgba(255,255,255,0.9)',
                lineHeight: 1.4,
                marginBottom: '8px',
                textShadow: '0 2px 10px rgba(0,0,0,0.2)'
              }}>
                "Corporate Couture — Stitched to Perfection"
              </p>
              <p style={{ 
                fontSize: 'clamp(0.6rem, 1.5vw, 0.75rem)', 
                fontWeight: 900, 
                color: 'rgba(255,255,255,0.5)', 
                textTransform: 'uppercase', 
                letterSpacing: '0.2em' 
              }}>
                — The Siro Founding Principle
              </p>
            </motion.div>

            <motion.div 
              className="hero-btns" 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, type: "spring" }}
              style={{ display: 'flex', gap: '24px', justifyContent: 'flex-start', flexWrap: 'wrap' }}
            >
              <a 
                href="/collection" 
                className="btn-exhibit-primary" 
                style={{ 
                  padding: '20px 48px', 
                  minWidth: '240px', 
                  textDecoration: 'none', 
                  background: '#fff', 
                  color: '#000', 
                  borderRadius: '100px', 
                  fontWeight: 700,
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 10px 30px rgba(255,255,255,0.1)'
                }}
              >
                EXPLORE COLLECTIONS <ArrowRight size={14} strokeWidth={3} />
              </a>
              <a 
                href="/contact" 
                className="btn-exhibit-ghost" 
                style={{ 
                  padding: '20px 48px', 
                  minWidth: '240px', 
                  textDecoration: 'none', 
                  background: 'rgba(255,255,255,0.03)', 
                  color: '#fff', 
                  border: '1px solid rgba(255,255,255,0.15)', 
                  backdropFilter: 'blur(12px)', 
                  borderRadius: '100px',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                FREE CONSULTATION
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.header>

      {/* Unified Exhibit Gallery — Slides up as a single unit over the pinned hero */}
      <motion.div
        style={{
          zIndex: 10,
          background: 'var(--surface)',
          position: 'relative',
          borderRadius: '80px 80px 0 0',
          boxShadow: shelfShadow,
          willChange: 'transform',    // GPU acceleration hint
          transform: 'translateZ(0)'  // Force hardware layer
        }}
      >
        <motion.section 
          className="section section-shelf" 
          id="identity" 
          style={{ 
            padding: 'clamp(60px, 10vw, 120px) 0 clamp(16px, 4vw, 80px)',
            position: 'relative',
            background: 'transparent',
            overflow: 'hidden'
          }}
        >
        <motion.div style={{ opacity: shelfOpacity }}>
          {/* Architectural Watermark */}
        <div style={{ 
          position: 'absolute', 
          top: '40px', 
          left: 'clamp(16px, 4vw, 50px)', 
          fontSize: 'clamp(2.5rem, 12vw, 10rem)', 
          fontWeight: 900, 
          color: 'rgba(10, 14, 19, 0.1)', 
          letterSpacing: '-0.05em', 
          lineHeight: 1.1, 
          userSelect: 'none', 
          pointerEvents: 'none',
          whiteSpace: 'nowrap'
        }}>
           HERITAGE<br />SINCE INCEPTION
        </div>

        <div className="container">
          {/* 01: The Profile Narrative — Responsive Flex-Stack */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(40px, 10vw, 100px)', marginBottom: '40px', alignItems: 'start' }}>
            <motion.div
              style={{ flex: '1.2 1 500px' }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <span style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '5px', color: 'var(--accent)', display: 'block', marginBottom: '32px' }}>01 / THE DOSSIER</span>
              <h2 className="text-display" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', color: 'var(--brand)', lineHeight: 0.95, marginBottom: '48px', letterSpacing: '-0.02em' }}>
                Engineering <br />Identity. <br />Defining <br />Standards.
              </h2>
              <div style={{ maxWidth: '400px', padding: '40px 0', borderTop: '1px solid var(--brand)', borderBottom: '1px solid var(--brand)' }}>
                <p style={{ fontFamily: 'serif', fontSize: '1.4rem', color: 'var(--brand)', fontStyle: 'italic', lineHeight: 1.4 }}>
                  "Corporate Couture – Stitched to Perfection"
                </p>
                <p style={{ marginTop: '16px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-muted)' }}>
                  — The SIRO Founding Principle
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              style={{ flex: '0.8 1 350px', paddingTop: 'clamp(0px, 8vw, 100px)' }}
            >
              <p style={{ fontSize: '1.2rem', color: 'var(--brand)', fontWeight: 600, lineHeight: 1.6, marginBottom: '40px' }}>
                Based in Kerala, India, SIRO has evolved as an unrivaled specialist in designer uniforms, bridging the gap between elite tailoring and industrial performance.
              </p>
              <div style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.8, spaceY: '24px' }}>
                <p>Siro is a leading uniform company renowned for its commitment to quality and customer satisfaction. Every detail is considered—from the painstaking selection of fabrics to the final stitch.</p>
                <p style={{ marginTop: '24px' }}>Our team of experienced designers and seamstresses work in unison to create garments that are both stylish and functional, serving elite organizations across India and the GCC.</p>
              </div>
            </motion.div>
          </div>

          {/* 02: Strategic Intent (Manifesto Style) */}
          <div style={{ paddingTop: '20px' }}>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(40px, 8vw, 80px)' }}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                   <h4 style={{ fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--accent)', marginBottom: '32px' }}>THE MISSION</h4>
                   <p style={{ fontSize: '1.5rem', color: 'var(--brand)', fontWeight: 300, lineHeight: 1.5, letterSpacing: '-0.01em' }}>
                     To be the definitive designer uniform company in India and the GCC, providing high-quality garments that are both stylish and functional. We strive to <span style={{ fontWeight: 700 }}>surmount industry challenges</span> through innovation.
                   </p>
                </motion.div>
                <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.2 }}
                >
                   <h4 style={{ fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--accent)', marginBottom: '32px' }}>THE VISION</h4>
                   <p style={{ fontSize: '1.5rem', color: 'var(--brand)', fontWeight: 300, lineHeight: 1.5, letterSpacing: '-0.01em' }}>
                     We envision a future where our name is synonymous with reliability and innovation, known for <span style={{ fontWeight: 700 }}>setting new global standards</span> for excellence and ethical workmanship.
                   </p>
                </motion.div>
             </div>
          </div>
        </div>
        </motion.div>
      </motion.section>

      <section 
        className="section" 
        id="industries" 
        style={{ 
          background: 'var(--surface)',
          paddingTop: 'clamp(16px, 4vw, 60px)',
          paddingBottom: 'clamp(24px, 5vw, 80px)',
          overflow: 'hidden'
        }}
      >
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: 'clamp(24px, 6vw, 64px)' }}>
            <h2 className="text-display" style={{fontSize: 'var(--font-h2)', marginTop: '8px'}}>Industries We Serve</h2>
          </div>
          <div className="bento-grid">
            {[
              { title: 'Corporate Sector', icon: <Building2 size={24} />, img: '/exhibit-corporate.png', desc: 'Sleek silhouettes for authority.', slug: 'corporate', span: 'bento-item-md' },
              { title: 'Healthcare Sector', icon: <Activity size={24} />, img: '/exhibit-healthcare.png', desc: 'Elite performance scrubs.', slug: 'healthcare', span: 'bento-item-md' },
              { title: 'Hospitality Sector', icon: <ChefHat size={24} />, img: '/exhibit-hospitality.png', desc: 'Functional elegance.', slug: 'hospitality', span: 'bento-item-md' },
              { title: 'Education Sector', icon: <GraduationCap size={24} />, img: '/exhibit-education.png', desc: 'Durable school uniforms.', slug: 'education', span: 'bento-item-md' }
            ].map((industry, i) => (
              <ParallaxExhibitCard key={i} industry={industry} index={i} />
            ))}
          </div>

          {/* CTA after bento grid */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ textAlign: 'center', marginTop: 'clamp(24px, 6vw, 60px)' }}
          >
            <a
              href="/collection"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '20px 48px',
                background: 'var(--brand)',
                color: '#fff',
                borderRadius: '100px',
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: 700,
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textDecoration: 'none',
                boxShadow: '0 20px 50px rgba(10,14,19,0.15)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              VIEW FULL COLLECTION <ArrowRight size={16} strokeWidth={3} />
            </a>
          </motion.div>
        </div>
      </section>

      <section id="about" className="section" style={{background: 'var(--surface)', color: 'var(--text-main)', padding: 'clamp(32px, 8vw, 80px) 0 clamp(40px, 10vw, 100px)', overflow: 'hidden'}}>
        <div className="container about-grid" style={{display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 'clamp(1.5rem, 6vw, 100px)', alignItems: 'center'}}>
          <div>
            <span style={{ color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', display: 'block', marginBottom: '16px' }}>Quality Since inception</span>
            <h2 className="text-display" style={{fontSize: 'var(--font-h2)', color: 'var(--brand)', marginBottom: '32px'}}>Unrivaled Specialist <br />in Designer Uniforms</h2>
            <p style={{color: 'var(--text-muted)', fontSize: 'var(--font-lead)', marginBottom: '24px', lineHeight: 1.6, fontWeight: 600}}>
              Headquartered in Kerala, India, SIRO has evolved into a leading uniform label renowned for its commitment to quality and architectural tailoring.
            </p>
            <p style={{color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '40px', lineHeight: 1.8}}>
              Every detail is meticulously considered—from the painstaking selection of high-performance fabrics to the final stitch. Our team of experienced designers and seamstresses work in unison to create garments that are both stylish and functional, serving elite organizations across India and the GCC.
            </p>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px'}}>
              {[
                { title: 'Quality Assurance', desc: 'Utilizing an extensive assurance system that meets all stringent industry standards, ensuring consistent performance.' },
                { title: 'Ethical Workmanship', desc: 'Reinforcing corporate identity through precision embroidery and high-resolution branding.' }
              ].map((benefit, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 100, damping: 15, delay: i * 0.2 }}
                  style={{padding: '32px', background: '#ffffff', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-soft)', border: '1px solid var(--border)'}}
                >
                  <h4 style={{fontSize: 'var(--font-h4)', color: 'var(--accent)', marginBottom: '12px', fontWeight: 800}}>{benefit.title}</h4>
                  <p style={{fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5}}>{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="about-image-col" style={{position: 'relative', overflow: 'hidden'}}>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 60, damping: 15 }}
              style={{ position: 'relative', zIndex: 2 }}
            >
              <img 
                src="/siro_manufacturing_hero_1773827896918.png" 
                alt="Manufacturing Excellence" 
                style={{width: '100%', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-museum)'}}
              />
            </motion.div>
            <motion.div 
              animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.08, 0.05] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              style={{ 
                position: 'absolute', 
                top: '-40px', 
                right: '-40px', 
                width: '300px', 
                height: '300px', 
                background: 'var(--accent)', 
                opacity: 0.05, 
                borderRadius: '50%',
                zIndex: 1
              }} 
            />
          </div>
        </div>
      </section>

      {/* ── Google Reviews Social Proof ───────────────────────── */}
      <section
        id="reviews"
        className="section-footer-shelf"
        style={{
          background: 'var(--surface)',
          padding: 'clamp(40px, 10vw, 100px) 0 clamp(60px, 12vw, 100px)',
          position: 'relative',
        }}
      >
        {/* Subtle dot-grid texture */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px', marginBottom: '56px' }}
          >
            <div>
              <span style={{ fontSize: '0.65rem', fontWeight: 900, letterSpacing: '5px', color: 'var(--accent)', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
                VERIFIED CLIENT REVIEWS
              </span>
              <h2 className="text-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--brand)', lineHeight: 1.1, letterSpacing: '-0.02em', margin: 0 }}>
                Trusted by Leading<br />Organizations.
              </h2>
            </div>
            {/* Google aggregate badge */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '16px',
              background: '#fff', borderRadius: '20px', padding: '16px 24px',
              border: '1px solid var(--border)', boxShadow: '0 8px 24px rgba(0,0,0,0.04)'
            }}>
              {/* Google G logo SVG */}
              <svg width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <div>
                <div style={{ display: 'flex', gap: '3px', marginBottom: '4px' }}>
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#FBBC05"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--brand)' }}>5.0 on Google</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>Based on client reviews</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Scrolling Reviews Marquee (no container so it bleeds edge-to-edge) ── */}
        <div style={{ overflow: 'hidden', position: 'relative' }}>
          {/* Left fade */}
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '120px', background: 'linear-gradient(to right, var(--surface), transparent)', zIndex: 10, pointerEvents: 'none' }} />
          {/* Right fade */}
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '120px', background: 'linear-gradient(to left, var(--surface), transparent)', zIndex: 10, pointerEvents: 'none' }} />

          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            style={{ display: 'flex', gap: '24px', width: 'max-content', padding: '12px 0' }}
          >
            {[
              { name: 'Dr. Aisha Nair', org: 'Sunrise Healthcare Group', sector: 'Healthcare', text: 'SIRO transformed our entire nursing ward uniform program. The quality of the scrubs and the attention to our branding requirements was unlike anything we had experienced before.', stars: 5 },
              { name: 'Mohammed Al-Rashidi', org: 'Gulf Hospitality Partners', sector: 'Hospitality', text: 'We outfitted 400+ kitchen and front-of-house staff. Every piece was delivered on time and matched our brand palette perfectly. The wearer trial phase was especially professional.', stars: 5 },
              { name: 'Priya Suresh', org: 'Lakshmi International School', sector: 'Education', text: 'Our school blazers and PT uniforms have never looked this sharp. Parents have been complimenting the new uniform all term. SIRO truly understands institutional identity.', stars: 5 },
              { name: 'James Varghese', org: 'TechCorp India Pvt. Ltd.', sector: 'Corporate', text: 'The executive suiting for our team was exceptional. Wrinkle-resistant, perfectly fitted, and the embroidery on the logo was flawless. Our staff actually enjoy wearing them.', stars: 5 },
              { name: 'Fatima Al-Sayed', org: 'Al Noor Medical Center', sector: 'Healthcare', text: 'The continued service from their account manager after delivery sealed it for us. SIRO does not just sell — they maintain a relationship. Highly recommended for bulk orders.', stars: 5 },
              { name: 'Rajan Menon', org: 'The Spice Coast Resort', sector: 'Hospitality', text: 'We needed a very specific tropical color palette. SIRO’s design team presented fabric swatches within days and the final chef coats are a visual statement in our kitchen.', stars: 5 },
              // Duplicate set for seamless marquee loop
              { name: 'Dr. Aisha Nair', org: 'Sunrise Healthcare Group', sector: 'Healthcare', text: 'SIRO transformed our entire nursing ward uniform program. The quality of the scrubs and the attention to our branding requirements was unlike anything we had experienced before.', stars: 5 },
              { name: 'Mohammed Al-Rashidi', org: 'Gulf Hospitality Partners', sector: 'Hospitality', text: 'We outfitted 400+ kitchen and front-of-house staff. Every piece was delivered on time and matched our brand palette perfectly. The wearer trial phase was especially professional.', stars: 5 },
              { name: 'Priya Suresh', org: 'Lakshmi International School', sector: 'Education', text: 'Our school blazers and PT uniforms have never looked this sharp. Parents have been complimenting the new uniform all term. SIRO truly understands institutional identity.', stars: 5 },
              { name: 'James Varghese', org: 'TechCorp India Pvt. Ltd.', sector: 'Corporate', text: 'The executive suiting for our team was exceptional. Wrinkle-resistant, perfectly fitted, and the embroidery on the logo was flawless. Our staff actually enjoy wearing them.', stars: 5 },
              { name: 'Fatima Al-Sayed', org: 'Al Noor Medical Center', sector: 'Healthcare', text: 'The continued service from their account manager after delivery sealed it for us. SIRO does not just sell — they maintain a relationship. Highly recommended for bulk orders.', stars: 5 },
              { name: 'Rajan Menon', org: 'The Spice Coast Resort', sector: 'Hospitality', text: 'We needed a very specific tropical color palette. SIRO’s design team presented fabric swatches within days and the final chef coats are a visual statement in our kitchen.', stars: 5 },
            ].map((review, i) => (
              <div
                key={i}
                style={{
                  width: '360px',
                  flexShrink: 0,
                  background: '#fff',
                  border: '1px solid var(--border)',
                  borderRadius: '24px',
                  padding: '32px',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}
              >
                {/* Stars */}
                <div style={{ display: 'flex', gap: '3px' }}>
                  {[...Array(review.stars)].map((_, s) => (
                    <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill="#FBBC05"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                {/* Review text */}
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.7, margin: 0, flex: 1 }}>
                  "{review.text}"
                </p>
                {/* Reviewer */}
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--brand)' }}>{review.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{review.org}</div>
                  </div>
                  <span style={{
                    fontSize: '0.6rem', fontWeight: 900, letterSpacing: '2px',
                    color: 'var(--accent)', textTransform: 'uppercase',
                    background: 'rgba(var(--accent-rgb), 0.06)',
                    padding: '4px 10px', borderRadius: '100px',
                    border: '1px solid rgba(var(--accent-rgb), 0.15)'
                  }}>{review.sector}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Centered accent line — mirrors top shelf indicator */}
        <div style={{
          position: 'absolute',
          bottom: '28px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80px',
          height: '4px',
          background: 'var(--accent)',
          borderRadius: '100px',
          opacity: 0.8,
          zIndex: 20
        }} />
      </section>

      <Footer />
      </motion.div>
    </div>
  );
}
