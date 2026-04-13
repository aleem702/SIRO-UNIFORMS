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
                fontSize: 'clamp(3rem, 8vw, 7rem)', 
                color: '#fff', 
                lineHeight: 0.85, 
                marginBottom: '40px',
                letterSpacing: '-0.05em',
                fontWeight: 900,
                textTransform: 'none'
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
                paddingTop: '24px',
                marginBottom: '40px',
                maxWidth: '500px'
              }}
            >
              <p style={{ 
                fontFamily: 'serif', 
                fontSize: '1.4rem', 
                color: '#fff', 
                fontStyle: 'italic', 
                lineHeight: 1.4,
                marginBottom: '12px'
              }}>
                "Corporate Couture – Stitched to Perfection"
              </p>
              <p style={{ 
                fontFamily: 'JetBrains Mono, monospace', 
                fontSize: '0.65rem', 
                fontWeight: 700, 
                textTransform: 'uppercase', 
                letterSpacing: '0.2em', 
                color: 'rgba(255,255,255,0.5)' 
              }}>
                — The SIRO Founding Principle
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
                href="/explore" 
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
          boxShadow: shelfShadow
        }}
      >
        <motion.section 
          className="section section-shelf" 
          id="identity" 
          style={{ 
            padding: 'clamp(80px, 10vw, 120px) 0 100px',
            position: 'relative',
            background: 'transparent'
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
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '80px' }}>
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
          paddingTop: '80px',
          paddingBottom: '100px'
        }}
      >
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '64px' }}>
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
        </div>
      </section>

      <section id="about" className="section" style={{background: 'var(--surface)', color: 'var(--text-main)', padding: '80px 0 100px'}}>
        <div className="container about-grid" style={{display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 'clamp(2rem, 8vw, 100px)', alignItems: 'center'}}>
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
          <div className="about-image-col" style={{position: 'relative'}}>
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

      <section id="process" className="section blueprint-grid section-footer-shelf" style={{background: 'var(--surface)', position: 'relative', overflow: 'hidden', zIndex: 10}}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="section-header" style={{ marginBottom: '80px', textAlign: 'center' }}>
            <span style={{ color: 'var(--accent)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.75rem' }}>The Methodology</span>
            <h2 className="text-display" style={{fontSize: 'var(--font-h2)', marginTop: '8px'}}>Manufacturing Excellence</h2>
            <p style={{fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', marginTop: '16px', margin: '16px auto 0'}}>A systematic, engineering-led approach to modern uniform production.</p>
          </div>
          
          <motion.div 
            className="process-layout-grid"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.12, delayChildren: 0.1 }
              }
            }}
          >
            {[
              { id: '01', title: 'Consultation', icon: <MessageCircle size={28} />, desc: 'Analyzing industry requirements and brand identity.' },
              { id: '02', title: 'Design & R&D', icon: <PencilRuler size={28} />, desc: 'Crafting silhouettes that balance form and function.' },
              { id: '03', title: 'Wearer Trial', icon: <ClipboardCheck size={28} />, desc: 'Real-world testing for fit, comfort, and durability.' },
              { id: '04', title: 'Production', icon: <Factory size={28} />, desc: 'Precision manufacturing with elite quality control.' },
              { id: '05', title: 'Delivery', icon: <Package size={28} />, desc: 'Seamless logistics and continued after-sales support.' },
            ].map((step, index) => (
              <motion.div 
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
                }}
                className="process-item-card"
                onMouseEnter={() => setActiveStep(index)}
                onMouseLeave={() => setActiveStep(null)}
                animate={{
                  scale: activeStep === index ? 1.05 : 1,
                  opacity: activeStep === null || activeStep === index ? 1 : 0.4,
                  filter: activeStep !== null && activeStep !== index ? 'blur(2px)' : 'blur(0px)',
                  zIndex: activeStep === index ? 10 : 1
                }}
                style={{
                  textAlign: 'left', 
                  padding: '48px 40px', 
                  background: 'rgba(255, 255, 255, 0.98)', 
                  borderRadius: 'var(--radius-lg)',
                  border: activeStep === index ? '1px solid var(--accent)' : '1px solid var(--border)',
                  boxShadow: activeStep === index ? 'var(--shadow-museum)' : 'var(--shadow-soft)',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'default',
                  transition: 'border 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                <div style={{fontSize: '6.5rem', fontWeight: 900, color: 'var(--accent)', opacity: 0.08, position: 'absolute', top: '-15px', right: '-15px', lineHeight: 1}}>{step.id}</div>
                <div style={{ 
                  width: '64px', 
                  height: '64px', 
                  background: activeStep === index ? 'var(--accent)' : 'var(--surface)', 
                  color: activeStep === index ? '#fff' : 'var(--accent)', 
                  borderRadius: 'var(--radius-md)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginBottom: '32px',
                  transition: 'all 0.3s ease',
                  border: '1px solid var(--border)'
                }}>
                  {step.icon}
                </div>
                <div className="pill-small" style={{ marginBottom: '24px', display: 'inline-block', background: activeStep === index ? 'var(--accent)' : 'var(--surface)', color: activeStep === index ? '#fff' : 'var(--brand-light)' }}>Phase {step.id}</div>
                <h4 className="text-display" style={{fontSize: '1.5rem', color: 'var(--brand)', marginBottom: '16px'}}>{step.title}</h4>
                <p style={{fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.7}}>{step.desc}</p>
                <div style={{ 
                  marginTop: '24px', 
                  height: '2px', 
                  width: activeStep === index ? '100%' : '20px', 
                  background: 'var(--accent)', 
                  transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  opacity: activeStep === index ? 1 : 0.3
                }} />
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div style={{ 
          position: 'absolute',
          bottom: '32px',
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
