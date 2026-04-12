import { Mail, Phone, MapPin } from 'lucide-react';

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
  twitter: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  instagram: "M12 2c2.717 0 3.056.01 4.122.058 1.066.048 1.79.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.637.417 1.361.465 2.427.048 1.066.058 1.405.058 4.122s-.01 3.056-.058 4.122c-.048 1.066-.217 1.79-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.637.247-1.361.417-2.427.465-1.066.048-1.405.058-4.122.058s-3.056-.01-4.122-.058c-1.066-.048-1.79-.217-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.637-.417-1.361-.465-2.427C2.01 15.056 2 14.717 2 12s.01-3.056.058-4.122c.048-1.066.217-1.79.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.448 2.523c.637-.247 1.361-.417 2.427-.465C8.944 2.01 9.283 2 12 2zm0 5c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5zm6.5-1.5a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM12 9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z",
  linkedin: "M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8.5 19V9h-3v10h3zM7 7.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM19 19v-5.5c0-2.5-1.5-3.5-3.5-3.5-1.5 0-2.5.5-3.5 1.5V9h-3v10h3v-5.5c0-1 1-1.5 1.5-1.5s1.5.5 1.5 1.5V19h3z"
};

export default function Footer() {
  return (
    <footer id="contact">
      <div className="footer-brand">
        <a href="/" className="footer-logo">
          <img src="/logo.png" alt="SIRO Uniforms" style={{ height: '48px', marginBottom: '20px' }} />
        </a>
        <p>Corporate Couture – Stitched to Perfection. Premium uniform manufacturing based in Kerala, India, serving Education, Healthcare, and Corporate sectors.</p>
        <div style={{display: 'flex', gap: '16px', marginTop: '24px'}}>
          <a href="#" className="social-link" aria-label="Facebook"><SocialIcon path={SOCIAL_PATHS.facebook} /></a>
          <a href="#" className="social-link" aria-label="Twitter"><SocialIcon path={SOCIAL_PATHS.twitter} /></a>
          <a href="#" className="social-link" aria-label="Instagram"><SocialIcon path={SOCIAL_PATHS.instagram} /></a>
          <a href="#" className="social-link" aria-label="LinkedIn"><SocialIcon path={SOCIAL_PATHS.linkedin} /></a>
        </div>
      </div>

      <div className="footer-links">
        <h4>Solutions</h4>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/collection">Uniform Catalog</a></li>
          <li><a href="/magazine">Lookbook</a></li>
          <li><a href="#process">Manufacturing Process</a></li>
        </ul>
      </div>

      <div className="footer-links">
        <h4>Company</h4>
        <ul>
          <li><a href="#about">About SIRO</a></li>
          <li><a href="#industries">Industries</a></li>
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
