import React, { useState } from 'react';
import './App.css';

const apiUrl = (process.env.REACT_APP_API_URL || 'http://localhost:8080').replace(/\/$/, '');

function App() {
  const [emotion, setEmotion] = useState('');
  const [chordProgression, setChordProgression] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const generateMusic = async () => {
    const mood = emotion.trim();
    if (!mood) return;

    setLoading(true);
    setError('');
    setChordProgression(null);
    try {
      const response = await fetch(`${apiUrl}/api/generate?emotion=${encodeURIComponent(mood)}`);
      if (!response.ok) throw new Error('The API request failed.');
      const data = await response.json();
      setChordProgression(data);
    } catch (error) {
      setError('Unable to load a progression. Make sure the backend is running and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎵 EmotiChord</h1>
        <p>Find a chord progression for your mood</p>

        <div className="input-section">
          <input
            type="text"
            aria-label="Emotion"
            value={emotion}
            onChange={(e) => setEmotion(e.target.value)}
            placeholder="Enter a mood (e.g., joy, sad, excited...)"
            className="emotion-input"
          />
          <button
            onClick={generateMusic}
            disabled={loading || !emotion.trim()}
            className="generate-btn"
          >
            {loading ? 'Loading...' : 'Find progression'}
          </button>
        </div>

        {error && <p role="alert">{error}</p>}

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
