import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact">
      <div className="footer-brand">
        <Link to="/" className="footer-logo">
          <img src="/logo.png" alt="SIRO Uniforms" style={{ height: '40px', marginBottom: '20px' }} />
        </Link>
        <p>Corporate Couture – Stitched to Perfection. Premium uniform manufacturing based in Kerala, India, serving Education, Healthcare, and Corporate sectors.</p>
        <div style={{display: 'flex', gap: '16px', marginTop: '24px'}}>
          <a href="#"><Facebook size={20} /></a>
          <a href="#"><Twitter size={20} /></a>
          <a href="#"><Instagram size={20} /></a>
          <a href="#"><Linkedin size={20} /></a>
        </div>
      </div>

      <div className="footer-links">
        <h4>Solutions</h4>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/explore">Uniform Catalog</a></li>
          <li><a href="/magazine">Lookbook</a></li>
          <li><a href="#process">Manufacturing Process</a></li>
        </ul>
      </div>

      <div className="footer-links">
        <h4>Company</h4>
        <ul>
          <li><a href="#about">About SIRO</a></li>
          <li><a href="#industries">Industries</a></li>
          <li><a href="#customization">Branding Services</a></li>
          <li><a href="#privacy">Privacy Policy</a></li>
        </ul>
      </div>

      <div className="footer-links">
        <h4>Contact</h4>
        <ul>
          <li style={{display: 'flex', alignItems: 'center', gap: '10px', opacity: 0.6, fontSize: '0.9rem'}}>
            <Mail size={16} /> info@sirouniforms.com
          </li>
          <li style={{display: 'flex', alignItems: 'center', gap: '10px', opacity: 0.6, fontSize: '0.9rem'}}>
            <Phone size={16} /> +91 (Kerala Number)
          </li>
          <li style={{display: 'flex', alignItems: 'center', gap: '10px', opacity: 0.6, fontSize: '0.9rem'}}>
            <MapPin size={16} /> Kerala, India
          </li>
        </ul>
      </div>
    </footer>
  );
}
