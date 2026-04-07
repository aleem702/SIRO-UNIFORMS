export default function ProductCard({ product, onClick, isActive }) {
  return (
    <div className={`product-card exhibit-card ${isActive ? 'active' : ''}`} onClick={onClick}>
      <div className="exhibit-card-content">
        <div className="exhibit-card-info">
          <div className="exhibit-code-badge">{product.code}</div>
          <h3 className="exhibit-title">{product.name}</h3>
          <div className="exhibit-tags">
            <span className="exhibit-tag">{product.category}</span>
          </div>
        </div>
        
        <div 
          className="exhibit-swatch"
          title={`Fabric: ${product.fabric_type} | Color: ${product.color}`}
          style={{
            backgroundColor: product.color || '#e2e8f0',
            backgroundImage: product.texture_url ? `url(${product.texture_url})` : 'none',
          }}
        />
      </div>
    </div>
  );
}
