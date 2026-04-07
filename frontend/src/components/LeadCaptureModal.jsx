import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Building, Mail, Hash, MessageSquare } from 'lucide-react';
import { useState } from 'react';

export default function LeadCaptureModal({ isOpen, onClose, designCode }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    quantity: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setFormData({ name: '', company: '', email: '', quantity: '', message: '' });
      }, 2000);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="viewer-overlay">
          <motion.div 
            className="lead-modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              background: 'white',
              width: '100%',
              maxWidth: '500px',
              borderRadius: '24px',
              padding: '40px',
              position: 'relative',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}
          >
            <button className="close-btn" onClick={onClose} style={{ top: '20px', right: '20px', background: 'var(--surface-2)', color: 'var(--brand)', border: 'none' }}>
              <X size={20} />
            </button>

            {isSuccess ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ width: '80px', height: '80px', background: '#dcfce7', color: '#166534', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                  <Send size={40} />
                </div>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '12px' }}>Request Sent!</h2>
                <p style={{ color: 'var(--text-muted)' }}>Our enterprise team will reach out to you within 24 hours.</p>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: '32px' }}>
                  <span className="design-code-badge" style={{ marginBottom: '12px' }}>{designCode}</span>
                  <h2 style={{ fontSize: '1.75rem', margin: '8px 0' }}>Request Bulk Quote</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Fill in the details below and our industrial specialists will prepare a customized proposal.</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div className="input-group">
                    <User size={18} className="input-icon" />
                    <input type="text" name="name" placeholder="Full Name" required value={formData.name} onChange={handleChange} />
                  </div>
                  
                  <div className="input-group">
                    <Building size={18} className="input-icon" />
                    <input type="text" name="company" placeholder="Company / Organization" required value={formData.company} onChange={handleChange} />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '16px' }}>
                    <div className="input-group">
                      <Mail size={18} className="input-icon" />
                      <input type="email" name="email" placeholder="Business Email" required value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="input-group">
                      <Hash size={18} className="input-icon" />
                      <input type="number" name="quantity" placeholder="Qty" required value={formData.quantity} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="input-group" style={{ alignItems: 'flex-start' }}>
                    <MessageSquare size={18} className="input-icon" style={{ marginTop: '14px' }} />
                    <textarea name="message" placeholder="Special requirements (branding, fabric tweaks...)" rows="3" value={formData.message} onChange={handleChange}></textarea>
                  </div>

                  <button className="btn btn-primary" type="submit" disabled={isSubmitting} style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '1rem', marginTop: '12px' }}>
                    {isSubmitting ? 'Processing...' : 'Send Inquiry'}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
