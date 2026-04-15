import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Footer from './Footer';
import '../styles/contact.css';

const SocialIcon = ({ path, size = 20, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d={path} />
  </svg>
);

const SOCIAL_PATHS = {
  facebook: "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3l-.5 3h-2.5v6.8c4.56-.93 8-4.96 8-9.8z",
  instagram: "M12 2c2.717 0 3.056.01 4.122.058 1.066.048 1.79.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.637.417 1.361.465 2.427.048 1.066.058 1.405.058 4.122s-.01 3.056-.058 4.122c-.048 1.066-.217 1.79-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.637.247-1.361.417-2.427.465-1.066.048-1.405.058-4.122.058s-3.056-.01-4.122-.058c-1.066-.048-1.79-.217-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.637-.417-1.361-.465-2.427C2.01 15.056 2 14.717 2 12s.01-3.056.058-4.122c.048-1.066.217-1.79.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.448 2.523c.637-.247 1.361-.417 2.427-.465C8.944 2.01 9.283 2 12 2zm0 5c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5zm6.5-1.5a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM12 9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z",
  linkedin: "M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8.5 19V9h-3v10h3zM7 7.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM19 19v-5.5c0-2.5-1.5-3.5-3.5-3.5-1.5 0-2.5.5-3.5 1.5V9h-3v10h3v-5.5c0-1 1-1.5 1.5-1.5s1.5.5 1.5 1.5V19h3z",
  twitter: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
};

export default function ContactPage() {
  const [formState, setFormState] = useState('idle'); // idle | submitting | success
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 20 }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
      setTimeout(() => setFormState('idle'), 5000); // Reset after 5s
    }, 1500);
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <motion.div 
          className="container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="contact-header">
            <motion.span variants={itemVariants} className="design-code-badge" style={{marginBottom: '16px'}}>
              CONNECT
            </motion.span>
            <motion.h1 variants={itemVariants}>
              Let’s create your <span style={{color: 'var(--accent)'}}>signature</span> look.
            </motion.h1>
            <motion.p variants={itemVariants} className="lead-text">
              Reach out to our design consultants to craft a bespoke uniform program that perfectly embodies your brand identity.
            </motion.p>
          </div>

          <div className="contact-grid">
            {/* Contact Details (Left) */}
            <motion.div variants={itemVariants} className="contact-info-column">
              <div className="info-card">
                <h3>Our Headquarters</h3>
                <div className="info-item">
                  <div className="info-icon"><MapPin size={20} /></div>
                  <div>
                    <h4>Kerala, India</h4>
                    <p>Corporate Couture Hub<br />Stitched to Perfection</p>
                  </div>
                </div>
              </div>

              <div className="info-card">
                <h3>Direct Lines</h3>
                <div className="info-item">
                  <div className="info-icon"><Phone size={20} /></div>
                  <div>
                    <h4>Phone</h4>
                    <p>+91 94470 12345</p>
                  </div>
                </div>
                <div className="info-item" style={{ marginTop: '24px' }}>
                  <div className="info-icon"><Mail size={20} /></div>
                  <div>
                    <h4>Email</h4>
                    <p>info@sirouniforms.com</p>
                  </div>
                </div>
              </div>

              <div className="social-links-container">
                <h3>Follow Our Design Journey</h3>
                <div className="social-links-row">
                  <a href="#" className="social-pill" aria-label="Instagram">
                    <SocialIcon path={SOCIAL_PATHS.instagram} />
                    <span>Instagram</span>
                  </a>
                  <a href="#" className="social-pill" aria-label="LinkedIn">
                    <SocialIcon path={SOCIAL_PATHS.linkedin} />
                    <span>LinkedIn</span>
                  </a>
                  <a href="#" className="social-pill" aria-label="Facebook">
                    <SocialIcon path={SOCIAL_PATHS.facebook} />
                  </a>
                  <a href="#" className="social-pill" aria-label="Twitter">
                    <SocialIcon path={SOCIAL_PATHS.twitter} />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form (Right) */}
            <motion.div variants={itemVariants} className="contact-form-column">
              <div className="form-glass-card">
                <h2>Initiate a Program</h2>
                <p>Fill out the form below and our lead designer will be in touch within 24 hours.</p>

                {formState === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="success-message"
                  >
                    <div className="success-icon-wrapper">
                      <Send size={32} />
                    </div>
                    <h3>Request Submitted</h3>
                    <p>Thank you for reaching out. A consultant will review your details and contact you shortly.</p>
                    <button type="button" className="btn btn-outline" onClick={() => setFormState('idle')} style={{marginTop: '20px', color: 'var(--brand)'}}>
                      Send Another Inquiry
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="siro-contact-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="first_name">First Name</label>
                        <input type="text" id="first_name" required placeholder="Jane" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="last_name">Last Name</label>
                        <input type="text" id="last_name" required placeholder="Doe" />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="company">Company / Organization</label>
                      <input type="text" id="company" required placeholder="Hospitality Group LLC" />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="email">Work Email</label>
                        <input type="email" id="email" required placeholder="jane@company.com" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input type="tel" id="phone" placeholder="+91 0000 000 000" />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="industry">Industry</label>
                      <select id="industry" required defaultValue="">
                        <option value="" disabled>Select your industry</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="education">Education</option>
                        <option value="corporate">Corporate</option>
                        <option value="hospitality">Hospitality</option>
                        <option value="industrial">Industrial</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="message">Project Details</label>
                      <textarea 
                        id="message" 
                        rows="4" 
                        required 
                        placeholder="Tell us about your team size, immediate needs, or specific design preferences..."
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      className="btn btn-primary submit-btn"
                      disabled={formState === 'submitting'}
                    >
                      {formState === 'submitting' ? 'Submitting...' : (
                        <>Submit Request <ArrowRight size={18} /></>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>

      {/* ── Google Maps Section ── */}
      <section className="contact-map-section" style={{ padding: '0 0 100px' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              height: '450px',
              borderRadius: '32px',
              overflow: 'hidden',
              border: '1px solid var(--border)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
              background: 'var(--surface-2)'
            }}
          >
            {/* Generic Kerala location embed - Replace with exact address if provided */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125745.75134149!2d76.22312684335939!3d10.531206199999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7ee15edc3d1d5%3A0x2de2cd7871e847!2sThrissur%2C%20Kerala!5e0!3m2!1sen!2sin!4v1713100000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(1) contrast(1.1) opacity(0.8)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
