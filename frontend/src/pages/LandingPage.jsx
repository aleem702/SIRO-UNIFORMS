import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shirt, Box, Layers, Zap, ArrowRight, ChevronRight, ShieldCheck, Globe, Cpu, GraduationCap, Building2, ChefHat, Activity } from 'lucide-react';
import Footer from '../components/Footer';

export default function LandingPage() {
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
  // On mobile, we want a tighter reveal. On desktop, more dramatic.
  const shelfY = useTransform(scrollY, [0, 500], [0, -60]);
  const shelfOpacity = 1;

  return (
    <div className="view-transition">
      <header className="hero main-hero">
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div 
              className="tagline-badge"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px 20px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '100px',
                backdropFilter: 'blur(4px)',
                marginBottom: '32px',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--accent)'
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent)' }} />
              <span className="hide-mobile">Corporate Couture – Stitched to Perfection</span>
              <span className="show-mobile">Corporate Couture</span>
            </div>
            <h1 style={{ fontSize: 'var(--h1-size)', fontWeight: 900, marginBottom: '24px', letterSpacing: '-0.02em', lineHeight: 1.05 }}>
              Professional <span style={{ color: 'var(--accent)' }}>Uniforms</span> Redefined
            </h1>
            <p style={{fontSize: 'var(--font-base)', opacity: 0.9, maxWidth: '800px', margin: '0 auto 40px', lineHeight: 1.6}}>
              SIRO Uniforms combines elite craftsmanship with industrial-grade durability. Experience Kerala’s premier uniform solution for Education, Corporate, Healthcare, and Hospitality.
            </p>
            <div className="hero-btns" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', width: '100%', maxWidth: '100%', margin: '0 auto' }}>
              <Link to="/explore" className="btn btn-primary" style={{ padding: '14px 32px', minWidth: '180px' }}>
                Explore Collection <ArrowRight size={18} />
              </Link>
              <button className="btn btn-glass" style={{ padding: '14px 32px', minWidth: '180px' }}>
                Quick Consultation <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      <motion.section 
        className="section section-shelf" 
        id="industries" 
        style={{ 
          background: 'var(--surface-2)',
          y: shelfY,
          opacity: shelfOpacity
        }}
      >
        <div className="container">
          <div className="section-header">
            <h2 style={{fontSize: 'var(--font-h2)', fontWeight: 800}}>Industries We Serve</h2>
            <p>Specialized garment solutions engineered for the unique demands of your profession.</p>
          </div>
          <div className="features-grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px'}}>
            {[
              { title: 'Education', icon: <GraduationCap size={24} />, img: 'education_uniform_preview_1773827945729.png', desc: 'Durable, breathable school uniforms designed for active learning environments.' },
              { title: 'Healthcare', icon: <Activity size={24} />, img: 'healthcare_uniform_preview_1773827967431.png', desc: 'Professional scrubs and doctor coats engineered for hygiene, comfort, and extended duty.' },
              { title: 'Corporate', icon: <Building2 size={24} />, img: 'corporate_uniform_preview_1773827990968.png', desc: 'Sleek office wear and formal attire that projects organizational confidence.' },
              { title: 'Hospitality', icon: <ChefHat size={24} />, img: 'hospitality_uniform_preview_1773828018003.png', desc: 'Functional chef coats and staff uniforms built for high-pressure culinary environments.' }
            ].map((industry, i) => (
              <motion.div 
                key={i}
                className="feature-card" 
                style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
                whileHover={{ y: -10 }}
                viewport={{ once: true }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div style={{ height: '240px', overflow: 'hidden' }}>
                  <img src={industry.img} alt={industry.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '32px' }}>
                  <div className="feature-icon" style={{ marginBottom: '16px' }}>{industry.icon}</div>
                  <h3 style={{ fontSize: 'var(--font-h3)', marginBottom: '12px' }}>{industry.title}</h3>
                  <p style={{ fontSize: 'var(--font-body)', color: 'var(--text-muted)', lineHeight: 1.6 }}>{industry.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <section id="about" className="section" style={{background: 'var(--surface-2)', color: 'var(--text-main)', padding: 'var(--section-padding) 0'}}>
        <div className="container about-grid" style={{display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 'clamp(2rem, 8vw, 100px)', alignItems: 'center'}}>
          <div>
            <span style={{ color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', display: 'block', marginBottom: '16px' }}>Quality Since inception</span>
            <h2 style={{fontSize: 'var(--font-h2)', color: 'var(--brand)', marginBottom: '32px', lineHeight: 1.1}}>A Legacy of Craftsmanship & Precision</h2>
            <p style={{color: 'var(--text-muted)', fontSize: 'var(--font-lead)', marginBottom: '40px', lineHeight: 1.8}}>
              Based in Kerala, India, SIRO Uniforms operates with a single mission: to provide organizations with garments that are as resilient as they are sophisticated. We combine traditional tailoring ethics with modern textile science.
            </p>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px'}}>
              <div style={{padding: '32px', background: '#ffffff', borderRadius: '24px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)'}}>
                <h4 style={{fontSize: 'var(--font-h4)', color: 'var(--accent)', marginBottom: '12px'}}>Elite Quality</h4>
                <p style={{fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5}}>Premium fabrics engineered for wrinkle resistance and professional poise.</p>
              </div>
              <div style={{padding: '32px', background: '#ffffff', borderRadius: '24px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)'}}>
                <h4 style={{fontSize: 'var(--font-h4)', color: 'var(--brand)', marginBottom: '12px'}}>Custom Branding</h4>
                <p style={{fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5}}>High-precision embroidery that transforms fabric into a corporate symbol.</p>
              </div>
            </div>
          </div>
          <div className="about-image-col" style={{position: 'relative'}}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ position: 'relative', zIndex: 2 }}
            >
              <img 
                src="/siro_manufacturing_hero_1773827896918.png" 
                alt="Manufacturing Excellence" 
                style={{width: '100%', borderRadius: '32px', boxShadow: 'var(--shadow-lg)'}}
              />
            </motion.div>
            <div style={{ 
              position: 'absolute', 
              top: '-40px', 
              right: '-40px', 
              width: '200px', 
              height: '200px', 
              background: 'var(--accent)', 
              opacity: 0.05, 
              borderRadius: '50%',
              zIndex: 1
            }} />
          </div>
        </div>
      </section>

      <section id="process" className="section section-footer-shelf" style={{background: 'var(--surface-2)'}}>
        <div className="container">
          <div className="section-header">
            <h2 style={{fontSize: 'var(--font-h2)', fontWeight: 800}}>Manufacturing Excellence</h2>
            <p style={{fontSize: 'var(--font-base)', opacity: 0.8}}>Our systematic approach to delivering high-performance uniform solutions.</p>
          </div>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px'}}>
            {[
              { id: '01', title: 'Consultation', desc: 'Analyzing industry requirements and brand identity.' },
              { id: '02', title: 'Design & R&D', desc: 'Crafting silhouettes that balance form and function.' },
              { id: '03', title: 'Wearer Trial', desc: 'Real-world testing for fit, comfort, and durability.' },
              { id: '04', title: 'Production', desc: 'Precision manufacturing with elite quality control.' },
              { id: '05', title: 'Delivery', desc: 'Seamless logistics and continued after-sales support.' },
            ].map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{textAlign: 'center'}}
              >
                <div style={{fontSize: '4rem', fontWeight: 900, color: 'var(--accent)', opacity: 0.1, marginBottom: '-20px'}}>{step.id}</div>
                <h4 style={{fontSize: '1.25rem', color: 'var(--brand)', marginBottom: '12px'}}>{step.title}</h4>
                <p style={{fontSize: '0.9rem', color: 'var(--text-muted)'}}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
