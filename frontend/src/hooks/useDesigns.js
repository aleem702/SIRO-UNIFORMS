import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

const MOCK_DESIGNS = [
  { 
    id: '1',
    code: 'EDU-VNG-01', 
    name: 'VANGUARD Technical Polo', 
    category: 'Education', 
    fabric_type: 'Ultra-Breathe Synthetic', 
    color: '#1e293b', // Professional Slate Blue
    preview_image: '/media__1773827406275.png' 
  },
  { 
    id: '2',
    code: 'EDU-CLW-01', 
    name: 'CLASSIC Heritage White', 
    category: 'Education', 
    fabric_type: 'Cotton Blend', 
    color: null, // Shows the original white/stripe look
    preview_image: '/media__1773827406275.png' 
  },
  { 
    id: '3',
    code: 'CORP-BLZ-02', 
    name: 'Elite Corporate Blazer', 
    category: 'Corporate', 
    fabric_type: 'Wool Premium', 
    color: '#0f172a', // Subtle dark overlay for blazer
    preview_image: '/education_uniform_preview_1773827945729.png'
  },
  { 
    id: '4',
    code: 'HLTH-SCR-03', 
    name: 'Modern Scrub Suit', 
    category: 'Healthcare', 
    fabric_type: 'Flexi-Stretch', 
    color: '#10b981', // Clean green overlay for scrubs
    preview_image: '/media__1773825129073.png'
  },
];

export function useDesigns(category = '') {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  useEffect(() => {
    setLoading(true);
    const params = category ? { category } : {};
    axios.get(`${API_BASE}/designs/`, { params })
      .then(res => {
        setDesigns(res.data);
        setError(null);
      })
      .catch(err => {
        console.warn("Backend not reachable, using mock data fallback.", err);
        setDesigns(MOCK_DESIGNS);
        setError(null);
      })
      .finally(() => setLoading(false));
  }, [category]);

  return { designs, loading, error };
}

export function useDesignDetail(code) {
  const [design, setDesign]   = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!code) return;
    axios.get(`${API_BASE}/designs/${code}/`)
      .then(res => setDesign(res.data))
      .finally(() => setLoading(false));
  }, [code]);

  return { design, loading };
}
