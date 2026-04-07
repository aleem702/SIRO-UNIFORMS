const MODEL_LABELS = {
  shirt:        'Shirt',
};

const MODEL_ICONS = {
  shirt:        '👕',
};

export default function ModelSelector({ options, selected, onChange }) {
  return (
    <div className="model-selector">
      <label className="selector-label">Model Type</label>
      <div className="selector-buttons">
        {options.map(opt => (
          <button
            key={opt}
            className={`model-btn ${selected === opt ? 'active' : ''}`}
            onClick={() => onChange(opt)}
          >
            <span className="model-icon">{MODEL_ICONS[opt]}</span>
            <span>{MODEL_LABELS[opt]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
