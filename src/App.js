// src/App.js
import React, { useState } from 'react';
import './App.css';
import CakeModel from './CakeModel';
import CustomizationPanel from './CustomizationPanel';

function App() {
  const [color, setColor] = useState('#f7c6c7');
  const [size, setSize] = useState(1);
  const [decorations, setDecorations] = useState([]);

  const handleDecorationClick = (index) => {
    setDecorations(prevDecorations => prevDecorations.filter((_, i) => i !== index));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>3D Cake Customization</h1>
      </header>
      <main className="App-main">
        <CakeModel
          color={color}
          size={size}
          decorations={decorations}
          onDecorationClick={handleDecorationClick}
        />
        <CustomizationPanel
          color={color}
          setColor={setColor}
          size={size}
          setSize={setSize}
          decorations={decorations}
          setDecorations={setDecorations}
        />
      </main>
    </div>
  );
}

export default App;
