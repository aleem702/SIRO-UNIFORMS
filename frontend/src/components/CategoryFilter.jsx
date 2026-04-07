import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const categories = ["all", "uniform", "casual", "sportswear", "workwear", "formal"];

export default function CategoryFilter({ category, setCategory }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const activeCategory = category === '' ? 'all' : category;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="category-dropdown-container" ref={dropdownRef} style={{ position: 'relative', width: '100%' }}>
      <button 
        className="dropdown-trigger" 
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span style={{ textTransform: 'capitalize' }}>{activeCategory}</span>
        <ChevronDown size={20} style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
      </button>

      {isOpen && (
        <div className="dropdown-menu" role="listbox">
          {categories.map(cat => (
            <div 
              key={cat}
              className={`dropdown-item ${activeCategory === cat ? 'active' : ''}`}
              role="option"
              aria-selected={activeCategory === cat}
              onClick={() => {
                setCategory(cat === 'all' ? '' : cat);
                setIsOpen(false);
              }}
            >
              {cat}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
