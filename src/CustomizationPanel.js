// src/CustomizationPanel.js
import React, { useState } from 'react';

const decorationTypes = [
  { name: 'Sprinkle', type: 'sprinkle' },
  { name: 'Candle', type: 'candle' },
  { name: 'Fruit', type: 'fruit' }
];

const CustomizationPanel = ({ color, setColor, size, setSize, decorations, setDecorations }) => {
  const [selectedType, setSelectedType] = useState('sprinkle');

  const addDecoration = () => {
    const newDecoration = {
      type: selectedType,
      position: [
        Math.random() * 0.8 - 0.4,  // X position on the cake (scaled down for correct placement)
        1.05,                      // Y position (above the cake surface)
        Math.random() * 0.8 - 0.4   // Z position on the cake (scaled down for correct placement)
      ],
      scale: [0.1, 0.1, 0.1],
      color: '#' + Math.floor(Math.random() * 16777215).toString(16) // Random color
    };
    setDecorations(prevDecorations => [...prevDecorations, newDecoration]);
  };
  

  const removeDecoration = (index) => {
    setDecorations(prevDecorations => prevDecorations.filter((_, i) => i !== index));
  };

  return (
    <div className="CustomizationPanel">
      <h2>Customize Your Cake</h2>
      <div>
        <label htmlFor="color">Color:</label>
        <input
          type="color"
          id="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="size">Size:</label>
        <input
          type="range"
          id="size"
          min="0.5"
          max="2"
          step="0.1"
          value={size}
          onChange={(e) => setSize(parseFloat(e.target.value))}
        />
        <span>{size}</span>
      </div>
      <div>
      </div>
      <div>
        
      </div>
      <div>
        {decorations.map((decor, index) => (
          <button key={index} onClick={() => removeDecoration(index)} className="remove-decor-btn">
            Remove Decoration {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CustomizationPanel;
