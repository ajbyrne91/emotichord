import React, { useState } from 'react';
import './App.css';

function App() {
  const [emotion, setEmotion] = useState('');
  const [chordProgression, setChordProgression] = useState('');
  const [loading, setLoading] = useState(false);

  const generateMusic = async () => {
    if (!emotion) return;
    
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:62951/api/generate?emotion=${emotion}`);
      const data = await response.json();
      setChordProgression(data);
    } catch (error) {
      console.error('Error generating music:', error);
      setChordProgression('Failed to generate music. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎵 EmotiChord</h1>
        <p>Turn emotions into beautiful chord progressions</p>
        
        <div className="input-section">
          <input
            type="text"
            value={emotion}
            onChange={(e) => setEmotion(e.target.value)}
            placeholder="Enter an emotion (e.g., joy, sadness, excitement...)"
            className="emotion-input"
          />
          <button 
            onClick={generateMusic} 
            disabled={loading || !emotion}
            className="generate-btn"
          >
            {loading ? 'Generating...' : 'Generate Music'}
          </button>
        </div>

        {chordProgression && (
  <div className="result-section">
    <h3>🎵 Your Chord Progression</h3>
    <div className="chord-details">
      <p><strong>Key:</strong> {chordProgression.key}</p>
      <p><strong>Progression:</strong> {chordProgression.progression}</p>
      <p><strong>Tempo:</strong> {chordProgression.tempo} BPM</p>
      <p><strong>Style:</strong> {chordProgression.style}</p>
      <p><strong>Mood:</strong> {chordProgression.description}</p>
    </div>
  </div>
)}
      </header>
    </div>
  );
}

export default App;