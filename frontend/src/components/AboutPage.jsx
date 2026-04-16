import { motion, useScroll, useTransform } from 'framer-motion';
import { Target, Eye, ShieldCheck } from 'lucide-react';
import { useRef } from 'react';
import Footer from './Footer';
import '../styles/about.css';

export default function AboutPage() {
  const containerRef = useRef(null);
  
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 100 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <>
      <div className="about-page" ref={containerRef}>
        
        {/* Hero Section */}
        <section className="about-hero">
          <motion.div 
            className="container hero-container"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUpVariants} className="design-code-badge" style={{marginBottom: '20px'}}>
              OUR DESIGNWEAR LABEL
            </motion.div>
            
            <motion.h1 variants={fadeUpVariants} className="hero-title">
              Corporate Couture <br/>
              <span style={{color: 'var(--accent)', fontStyle: 'italic', fontWeight: 400}}>Stitched to Perfection</span>
            </motion.h1>
            
            <motion.p variants={fadeUpVariants} className="hero-lead">
              Headquartered in Kerala, India, SIRO has evolved as an unrivaled specialist in designer uniforms, outfitting the leading organizations across India and the GCC.
            </motion.p>
          </motion.div>
          
          {/* Architectural Watermark */}
          <div className="hero-bg-graphic">THE SIRO DOSSIER</div>
        </section>

        {/* Profile Section */}
        <section className="profile-section">
          <div className="container">
            <motion.div 
              className="profile-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeUpVariants} className="profile-text-col">
                <h2>A Legacy of Fine Tailoring</h2>
                <p>
                  SIRO is more than just a uniform manufacturer; it is a design label. Our experienced team of designers and 
                  seamstresses collaborate seamlessly to create high-quality uniform garments, specialized fabrics, and accessories 
                  that perfectly balance style and functionality.
                </p>
                <p>
                  From executing the painstaking selection of premium shirting and suiting fabrics—engineered for wrinkle resistance 
                  and all-day comfort—to the final precision stitch, SIRO delivers unparalleled corporate identity. We continuously 
                  modernize our methodology to surmount modern industry challenges, serving the Education, Corporate, Healthcare, 
                  Hospitality, and Industrial sectors.
                </p>
              </motion.div>

              <motion.div variants={fadeUpVariants} className="profile-stats-col">
                 <div className="stat-glass-card">
                    <span className="stat-number">100%</span>
                    <span className="stat-label">In-House Design &amp; Manufacturing</span>
                 </div>
                 <div className="stat-glass-card">
                    <span className="stat-number">5+</span>
                    <span className="stat-label">Core Industries Mastered</span>
                 </div>
                 <div className="stat-glass-card">
                    <span className="stat-number">GCC</span>
                    <span className="stat-label">& India — Markets Served</span>
                 </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="vision-mission-section section">
          <div className="container">
            <motion.div 
              className="vision-mission-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              {/* Mission Card */}
              <motion.div variants={fadeUpVariants} className="core-value-card">
                <div className="icon-wrapper mission-icon">
                  <Target size={32} />
                </div>
                <h3>Our Mission</h3>
                <p>
                  To be the leading designer uniform company in India and the GCC, providing high-quality uniforms and accessories 
                  that are both stylish and functional. We strive to exceed expectations by providing excellent customer service 
                  and constantly innovating our products.
                </p>
              </motion.div>

              {/* Vision Card */}
              <motion.div variants={fadeUpVariants} className="core-value-card">
                <div className="icon-wrapper vision-icon">
                  <Eye size={32} />
                </div>
                <h3>Our Vision</h3>
                <p>
                  We envision a future where we set new standards for excellence. We will be admired for our business values, ethics, 
                  and our name will be entirely synonymous with reliability, unparalleled customer satisfaction, and innovation.
                </p>
              </motion.div>

               {/* Quality Policy */}
              <motion.div variants={fadeUpVariants} className="core-value-card full-width">
                <div className="icon-wrapper quality-icon">
                  <ShieldCheck size={32} />
                </div>
                <div className="quality-content">
                  <h3>Quality Assurance Policy</h3>
                  <p>
                    SIRO is committed to providing a comprehensive range of designed uniforms backed by efficient, flexible, and consistent services. 
                    Our robust QA system ensures compliance with stringent industry standards. Ethical workmanship is paramount; continuous improvement 
                    is strictly maintained across our management systems, suppliers, and manufacturing practices.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>

  );
}
