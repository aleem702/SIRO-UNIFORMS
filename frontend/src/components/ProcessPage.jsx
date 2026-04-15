import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { ClipboardList, Scissors, CheckCircle, RefreshCw, ArrowRight } from 'lucide-react';
import Footer from './Footer';
import '../styles/process.css';

const ProcessNode = ({ step, index, scrollYProgress }) => {
  const nodeRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  
  // Calculate when the drawn line reaches this node (0-1 range across 4 nodes)
  useEffect(() => {
    const threshold = (index + 0.5) / 4;
    // Use on() for Framer Motion v6+ / subscribe() pattern
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setIsActive(latest >= threshold);
    });
    return () => unsubscribe();
  }, [scrollYProgress, index]);

  return (
    <motion.div 
      ref={nodeRef}
      className={`roadmap-node ${isActive ? 'active' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      <div className="node-point">
        <span className="node-number">0{index + 1}</span>
      </div>
      
      <div className="roadmap-content">
        <div className="step-icon">
          <step.icon size={32} />
        </div>
        <h3>{step.title}</h3>
        {step.duration && (
          <span style={{
            display: 'inline-block',
            fontSize: '0.65rem',
            fontWeight: 800,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            background: 'var(--accent-soft)',
            padding: '3px 10px',
            borderRadius: '100px',
            marginBottom: '10px'
          }}>{step.duration}</span>
        )}
        <p>{step.desc}</p>
      </div>
    </motion.div>
  );
};

export default function ProcessPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const scaleY = useTransform(smoothProgress, [0, 1], [0, 1]);

  const steps = [
    {
      icon: ClipboardList,
      title: "Initial Consultation",
      duration: "Est. 1–2 days",
      desc: "Delivering a tailored solution begins with the customer. We collaborate to deeply understand the requirements of both the staff and the business itself, guaranteeing that the garments reflect the day-to-day demands."
    },
    {
      icon: Scissors,
      title: "Design & Research",
      duration: "Est. 3–7 days",
      desc: "Our commercial designers create a unique look utilizing bespoke design boards, fabric swatches, and sample garments to establish a corporate image that encapsulates both your brand and your people."
    },
    {
      icon: CheckCircle,
      title: "Wearer Trial",
      duration: "Est. 5–10 days",
      desc: "Before bulk production, selected staff test sample garments for style, comfort, fit, durability, and \"washability\". Modifications are finalized ensuring absolute perfection upon full deployment."
    },
    {
      icon: RefreshCw,
      title: "Continued Service",
      duration: "Ongoing",
      desc: "Post-delivery, a dedicated SIRO account manager remains in contact to respond to all queries, feedback, and future requirements, maintaining a consistent level of premium service."
    }
  ];

  return (
    <div className="process-page">
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <motion.div 
          className="process-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="design-code-badge" style={{ marginBottom: '16px' }}>THE SIRO METHOD</span>
          <h1>Our Service Workflow</h1>
          <p className="lead-text" style={{ margin: '0 auto' }}>
            A structured, precision-driven architectural roadmap to outfitting your organization.
          </p>
        </motion.div>

        <div className="roadmap-container" ref={containerRef}>
          {/* Static dashed track */}
          <div className="roadmap-track" />
          
          {/* Animated red solid line drawing down */}
          <motion.div 
            className="roadmap-line" 
            style={{ scaleY }}
          />

          {/* Render steps */}
          <div className="roadmap-nodes">
            {steps.map((step, idx) => (
              <ProcessNode 
                key={idx} 
                step={step} 
                index={idx} 
                scrollYProgress={smoothProgress} 
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── End CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        style={{
          textAlign: 'center',
          padding: '100px 24px 120px',
          position: 'relative',
          zIndex: 10
        }}
      >
        {/* Thin accent line above */}
        <div style={{ width: '48px', height: '3px', background: 'var(--accent)', borderRadius: '100px', margin: '0 auto 48px' }} />

        <span style={{
          fontSize: '0.65rem', fontWeight: 900, letterSpacing: '5px',
          color: 'var(--accent)', textTransform: 'uppercase', display: 'block', marginBottom: '20px'
        }}>START YOUR PROGRAM</span>

        <h2 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 900,
          color: 'var(--brand)',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          marginBottom: '20px'
        }}>
          Ready to outfit<br />your organization?
        </h2>

        <p style={{
          fontSize: '1.1rem',
          color: 'var(--text-muted)',
          maxWidth: '480px',
          margin: '0 auto 48px',
          lineHeight: 1.6
        }}>
          Let’s begin with a consultation. No commitments — just a conversation about what your team needs.
        </p>

        <a
          href="/contact"
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
          GET IN TOUCH <ArrowRight size={16} strokeWidth={3} />
        </a>
      </motion.div>

      <Footer />
    </div>
  );
}
