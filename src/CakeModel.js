// src/CakeModel.js
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

// Component for rendering decorations
const Decoration = ({ type, position, scale, color }) => {
  return (
    <group position={position} scale={scale}>
      {type === 'sprinkle' && (
        <mesh>
          <sphereGeometry args={[0.05, 32, 32]} />
          <meshStandardMaterial color={color || 'yellow'} />
        </mesh>
      )}
      {type === 'candle' && (
        <>
          <mesh position={[0, 0.25, 0]}> {/* Adjusted position */}
            <cylinderGeometry args={[0.05, 0.05, 0.5, 32]} />
            <meshStandardMaterial color={color || 'red'} />
          </mesh>
          <mesh position={[0, 0.75, 0]}> {/* Adjusted position */}
            <coneGeometry args={[0.02, 0.2, 32]} />
            <meshStandardMaterial color="orange" emissive="yellow" emissiveIntensity={0.8} />
          </mesh>
        </>
      )}
      {type === 'fruit' && (
        <mesh>
          <torusGeometry args={[0.1, 0.05, 16, 100]} />
          <meshStandardMaterial color={color || 'orange'} />
        </mesh>
      )}
    </group>
  );
};

// Component for rendering the cake
const Cake = ({ color, size, decorations }) => {
  return (
    <mesh scale={[size, size, size]} position={[0, size / 2, 0]}>
      <cylinderGeometry args={[1, 1, 2, 32]} />
      <meshStandardMaterial color={color} />
      {decorations.map((decor, index) => (
        <Decoration
          key={index}
          type={decor.type}
          position={decor.position}
          scale={decor.scale}
          color={decor.color}
        />
      ))}
    </mesh>
  );
};

// Main component
const CakeModel = ({ color, size }) => {
  const [decorations, setDecorations] = useState([]);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  // Function to add a decoration
  const addDecoration = (type) => {
    const newDecoration = {
      type,
      position: [Math.random() - 0.5, 1, Math.random() - 0.5],
      scale: [1, 1, 1],
      color: type === 'candle' ? 'red' : type === 'fruit' ? 'orange' : 'yellow',
    };
    setUndoStack([...undoStack, decorations]); // Save current state to undo stack
    setDecorations([...decorations, newDecoration]);
    setRedoStack([]); // Clear redo stack on new action
  };

  // Function to remove a decoration
  const removeDecoration = (index) => {
    setUndoStack([...undoStack, decorations]); // Save current state to undo stack
    setDecorations(decorations.filter((_, i) => i !== index));
    setRedoStack([]); // Clear redo stack on new action
  };

  // Function for undo action
  const undo = () => {
    if (undoStack.length === 0) return;
    const previousState = undoStack.pop();
    setRedoStack([decorations, ...redoStack]);
    setDecorations(previousState);
    setUndoStack([...undoStack]);
  };

  // Function for redo action
  const redo = () => {
    if (redoStack.length === 0) return;
    const nextState = redoStack.shift();
    setUndoStack([...undoStack, decorations]);
    setDecorations(nextState);
    setRedoStack([...redoStack]);
  };

  return (
    <>
      <Canvas
        style={{ height: '500px', width: '100%', backgroundColor: 'lightgray' }} // Light Gray Background
        camera={{ position: [0, 2, 5], fov: 50 }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Cake color={color} size={size} decorations={decorations} />
        <OrbitControls />
      </Canvas>
      <div style={{ padding: '10px' }}>
        <button onClick={() => addDecoration('candle')}>Add Candle</button>
        <button onClick={() => addDecoration('sprinkle')}>Add Sprinkle</button>
        <button onClick={() => addDecoration('fruit')}>Add Fruit</button>
        <button onClick={undo} disabled={undoStack.length === 0}>Undo</button>
        <button onClick={redo} disabled={redoStack.length === 0}>Redo</button>
        <br />
        <h3>Click on the cake to remove a decoration</h3>
      </div>
    </>
  );
};

export default CakeModel;
