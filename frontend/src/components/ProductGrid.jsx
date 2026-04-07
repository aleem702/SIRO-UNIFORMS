import ProductCard from "./ProductCard";
import { useDesigns } from "../hooks/useDesigns";

export default function ProductGrid({ category, searchQuery = "", onSelectProduct, selectedProduct }) {
  const { designs, loading, error } = useDesigns(category === 'all' ? '' : category);

  if (loading) {
    return (
      <div className="design-grid loading">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="skeleton-card" style={{height: '320px', borderRadius: '16px'}} />
        ))}
      </div>
    );
  }

  if (error) return <div style={{textAlign: 'center', padding: '40px'}}>Error loading 3D models.</div>;

  const filteredDesigns = designs.filter(design => 
    design.code.toLowerCase().includes(searchQuery.toLowerCase()) || 
    design.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (design.fabric_type && design.fabric_type.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (filteredDesigns.length === 0) return <div style={{textAlign: 'center', padding: '40px'}}>No products found matching your search.</div>;

  return (
    <div className="design-grid">
      {filteredDesigns.map(design => (
        <ProductCard
          key={design.code}
          product={design}
          onClick={() => onSelectProduct(design)}
          isActive={selectedProduct?.code === design.code}
        />
      ))}
    </div>
  );
}
