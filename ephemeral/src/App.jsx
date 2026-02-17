import { useState, useEffect, useRef, useCallback } from 'react';
import { sounds, getSoundsByDrawer, searchSounds } from './sounds';
import * as Tone from 'tone';
import './App.css';

// Header Component with fluorescent light effect
function Header() {
  const [date] = useState(() => {
    const d = new Date();
    return d.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    }).replace(/\//g, '.');
  });

  return (
    <header className="bureau-header">
      <div className="metal-sign">
        <h1>THE BUREAU OF LOST AND FOUND SOUNDS</h1>
        <span className="established">EST. 1971</span>
      </div>
      <div className="header-right">
        <span className="date-stamp">{date}</span>
        <div className="fluorescent-indicator">
          <span className="indicator-light"></span>
          <span className="indicator-text">SYSTEM ONLINE</span>
        </div>
      </div>
    </header>
  );
}

// Filing Cabinet Drawer Component
function FilingDrawer({ label, isOpen, onClick, sounds }) {
  return (
    <div className={`filing-drawer ${isOpen ? 'open' : ''}`} onClick={onClick}>
      <div className="drawer-handle">
        <span className="drawer-label">{label}</span>
      </div>
      {isOpen && (
        <div className="drawer-contents">
          {sounds.map(sound => (
            <SoundCard key={sound.id} sound={sound} />
          ))}
        </div>
      )}
    </div>
  );
}

// Sound Card Component
function SoundCard({ sound, onClick, isSelected }) {
  const statusClass = `status-${sound.status}`;
  return (
    <div 
      className={`sound-card ${isSelected ? 'selected' : ''} ${sound.status === 'corrupted' ? 'corrupted' : ''}`} 
      onClick={onClick}
    >
      <div className="card-header">
        <span className="case-number">{sound.id}</span>
        <span className={`status-badge ${statusClass}`}>
          {sound.status.replace('_', ' ').toUpperCase()}
        </span>
      </div>
      <p className="description">{sound.description}</p>
      <div className="card-footer">
        <span className="year">{sound.year}</span>
        <span className="category">{sound.category}</span>
      </div>
      {sound.status === 'corrupted' && <div className="glitch-overlay"></div>}
    </div>
  );
}

// CRT Monitor Component
function CRTMonitor({ selectedSound, onPlay, isPlaying, audioEnabled }) {
  const [bootPhase, setBootPhase] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (!audioEnabled) return;
    const phases = [1, 2, 3, 4];
    let current = 0;
    const interval = setInterval(() => {
      if (current < phases.length) {
        setBootPhase(phases[current]);
        current++;
      } else {
        clearInterval(interval);
      }
    }, 400);
    return () => clearInterval(interval);
  }, [audioEnabled]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  if (!audioEnabled) {
    return (
      <div className="crt-monitor">
        <div className="crt-screen off">
          <div className="click-to-begin">
            <span className="blink">CLICK TO BEGIN</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="crt-monitor">
      <div className="crt-frame">
        <div className="crt-screen">
          <div className="scanlines"></div>
          <div className="crt-glow"></div>
          <div className="screen-content">
            {bootPhase < 4 ? (
              <BootSequence phase={bootPhase} />
            ) : selectedSound ? (
              <SoundDetail 
                sound={selectedSound} 
                onPlay={onPlay} 
                isPlaying={isPlaying}
                showCursor={showCursor}
              />
            ) : (
              <MainMenu showCursor={showCursor} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Boot Sequence Component
function BootSequence({ phase }) {
  const messages = [
    "INITIALIZING...",
    "LOADING SOUND DATABASE...",
    "CALIBRATING AUDIO INTERFACE...",
    "WELCOME TO THE BUREAU"
  ];
  return (
    <div className="boot-sequence">
      {messages.slice(0, phase).map((msg, i) => (
        <div key={i} className="boot-line">{msg}</div>
      ))}
      <div className="boot-cursor">_</div>
    </div>
  );
}

// Main Menu
function MainMenu({ showCursor }) {
  return (
    <div className="main-menu">
      <pre className="ascii-logo">
{`  ___  ___ ___ ___ _____ 
 | _ )/ _ \_ _/ __|_   _|
 | _ \ (_) | |\__ \ | |  
 |___/\___/___|___/ |_|  `}
      </pre>
      <p className="menu-text">SELECT A FILING DRAWER TO BEGIN</p>
      <p className="menu-hint">{showCursor ? '_' : ' '}</p>
    </div>
  );
}

// Sound Detail View
function SoundDetail({ sound, onPlay, isPlaying, showCursor }) {
  const isCorrupted = sound.status === 'corrupted';
  
  return (
    <div className={`sound-detail ${isCorrupted ? 'corrupted-view' : ''}`}>
      {isCorrupted && <div className="static-overlay"></div>}
      <div className="detail-header">
        <span className="detail-label">CASE FILE:</span>
        <span className="detail-id">{sound.id}</span>
      </div>
      <div className="detail-content">
        <p className="detail-description">{sound.description}</p>
        <div className="detail-meta">
          <span>YEAR: {sound.year}</span>
          <span>CAT: {sound.category.toUpperCase()}</span>
          <span>STATUS: {sound.status.toUpperCase()}</span>
        </div>
      </div>
      {!isCorrupted ? (
        <button 
          className={`play-button ${isPlaying ? 'playing' : ''}`} 
          onClick={onPlay}
          disabled={isPlaying}
        >
          {isPlaying ? 'PLAYING...' : '▶ PLAY AUDIO'}
        </button>
      ) : (
        <div className="corrupted-message">
          FILE CORRUPTED - RECOVERY IMPOSSIBLE
          <span className="corrupted-sub">DATA UNRECOVERABLE</span>
        </div>
      )}
      <div className="detail-cursor">{showCursor ? '_' : ' '}</div>
    </div>
  );
}

// Search Component
function SearchPanel({ onSearch, results, query, setQuery }) {
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      onSearch(query);
      setIsSearching(false);
    }, 1500);
  };

  return (
    <div className="search-panel">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="SEARCH ARCHIVE..."
          className="search-input"
          maxLength={50}
        />
        <button type="submit" className="search-button" disabled={isSearching}>
          {isSearching ? 'SEARCHING...' : 'SEARCH'}
        </button>
      </form>
      {results && (
        <div className="search-results">
          {results.length === 0 ? (
            <p className="no-results">NO RESULTS FOUND</p>
          ) : (
            <>
              <p className="suggested-header">NO EXACT MATCHES - SUGGESTED RESULTS:</p>
              {results.map(sound => (
                <div key={sound.id} className="search-result-item">
                  <span>{sound.id}</span>
                  <span>{sound.description.substring(0, 40)}...</span>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}

// Checkout Form Component
function CheckoutForm({ selectedSound, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    extension: '',
    reason: '',
    accept: false
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.department || !formData.extension || !formData.reason || !formData.accept) {
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      const approved = Math.random() > 0.5;
      setResult(approved 
        ? "REQUEST APPROVED - PICKUP IN 6-8 WEEKS"
        : "REQUEST DENIED - INSUFFICIENT CLEARANCE"
      );
      setSubmitting(false);
    }, 3000);
  };

  if (result) {
    return (
      <div className="checkout-result">
        <p>{result}</p>
        <button onClick={() => { setResult(null); onSubmit(); }}>CLOSE</button>
      </div>
    );
  }

  return (
    <div className="checkout-form">
      <h3>REQUISITION FORM #{selectedSound?.id || 'N/A'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>NAME:</label>
          <input 
            type="text" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div className="form-field">
          <label>DEPARTMENT:</label>
          <input 
            type="text" 
            value={formData.department}
            onChange={(e) => setFormData({...formData, department: e.target.value})}
          />
        </div>
        <div className="form-field">
          <label>EXTENSION:</label>
          <input 
            type="text" 
            value={formData.extension}
            onChange={(e) => setFormData({...formData, extension: e.target.value})}
            maxLength={4}
          />
        </div>
        <div className="form-field">
          <label>REASON FOR REQUEST:</label>
          <textarea 
            value={formData.reason}
            onChange={(e) => setFormData({...formData, reason: e.target.value})}
            rows={3}
          />
        </div>
        <div className="form-checkbox">
          <input 
            type="checkbox" 
            id="accept"
            checked={formData.accept}
            onChange={(e) => setFormData({...formData, accept: e.target.checked})}
          />
          <label htmlFor="accept">I ACCEPT RESPONSIBILITY FOR THIS AUDIO</label>
        </div>
        <button type="submit" disabled={submitting}>
          {submitting ? 'PROCESSING...' : 'PROCESS REQUEST'}
        </button>
      </form>
    </div>
  );
}

// Record Button Component
function RecordButton({ onRecordComplete }) {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [lost, setLost] = useState(false);
  const mediaRecorder = useRef(null);
  const timerRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.start();
      setIsRecording(true);
      setDuration(0);
      
      timerRef.current = setInterval(() => {
        setDuration(d => {
          if (d >= 5) {
            stopRecording();
            return d;
          }
          return d + 1;
        });
      }, 1000);
    } catch (err) {
      alert('MICROPHONE ACCESS DENIED');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
      mediaRecorder.current.stop();
    }
    clearInterval(timerRef.current);
    setIsRecording(false);
    setLost(true);
    setTimeout(() => {
      setLost(false);
      setDuration(0);
      onRecordComplete();
    }, 3000);
  };

  return (
    <div className="record-section">
      <button 
        className={`record-button ${isRecording ? 'recording' : ''}`}
        onClick={isRecording ? stopRecording : startRecording}
      >
        {isRecording ? `REC ${duration}s` : '● REC'}
      </button>
      {lost && (
        <div className="lost-message">
          ERROR - FILE HAS ALREADY BEEN LOST
        </div>
      )}
    </div>
  );
}

// Coffee Stain Overlay
function CoffeeStain() {
  return (
    <div className="coffee-stain" style={{
      position: 'absolute',
      top: `${20 + Math.random() * 40}%`,
      left: `${10 + Math.random() * 60}%`,
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      background: 'radial-gradient(ellipse at center, rgba(139, 90, 43, 0.12) 0%, rgba(139, 90, 43, 0.08) 40%, rgba(139, 90, 43, 0.03) 70%, transparent 100%)',
      pointerEvents: 'none',
      zIndex: 10,
      transform: `rotate(${Math.random() * 360}deg)`
    }}></div>
  );
}

// Main App Component
function App() {
  const [activeDrawer, setActiveDrawer] = useState(null);
  const [selectedSound, setSelectedSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [recentAcquisitions, setRecentAcquisitions] = useState([]);
  const synthRef = useRef(null);
  const noiseRef = useRef(null);

  // Initialize Tone.js
  useEffect(() => {
    synthRef.current = new Tone.PolySynth(Tone.Synth).toDestination();
    noiseRef.current = new Tone.Noise("pink").toDestination();
    noiseRef.current.volume.value = -10;
  }, []);

  const enableAudio = async () => {
    await Tone.start();
    setAudioEnabled(true);
  };

  const playSound = useCallback(async () => {
    if (!selectedSound || isPlaying) return;
    setIsPlaying(true);

    const noise = noiseRef.current;
    const synth = synthRef.current;
    
    // Fade in noise
    noise.start();
    noise.volume.rampTo(-5, 3);
    
    // At ~3 seconds, add almost-recognizable tones
    setTimeout(() => {
      // Play some filtered noise patterns that "almost" sound like something
      const filter = new Tone.Filter(800, "bandpass").toDestination();
      const filteredNoise = new Tone.Noise("brown").connect(filter);
      filteredNoise.volume.value = -15;
      filteredNoise.start();
      
      // Add some random notes that almost resolve
      const notes = ["C4", "E4", "G4", "B4"];
      notes.forEach((note, i) => {
        setTimeout(() => {
          synth.triggerAttackRelease(note, "8n", undefined, 0.1);
        }, i * 200);
      });
      
      setTimeout(() => {
        filteredNoise.stop();
      }, 2000);
    }, 3000);

    // Fade back to noise then stop
    setTimeout(() => {
      noise.volume.rampTo(-20, 2);
    }, 5000);

    setTimeout(() => {
      noise.stop();
      setIsPlaying(false);
    }, 8000);
  }, [selectedSound, isPlaying]);

  const handleDrawerClick = (drawer) => {
    setActiveDrawer(activeDrawer === drawer ? null : drawer);
    setSelectedSound(null);
    setSearchResults(null);
  };

  const handleSoundSelect = (sound) => {
    setSelectedSound(sound);
  };

  const handleSearch = (query) => {
    const results = searchSounds(query);
    setSearchResults(results);
  };

  const handleRecordComplete = () => {
    const newId = `BLS-${new Date().getFullYear()}-${String(recentAcquisitions.length + 51).padStart(3, '0')}`;
    const newAcquisition = {
      id: newId,
      description: `Unidentified Audio, ${new Date().toLocaleString()}`,
      year: new Date().getFullYear(),
      status: "corrupted",
      category: "Recent"
    };
    setRecentAcquisitions([...recentAcquisitions, newAcquisition]);
  };

  const drawers = ['A-D', 'E-H', 'I-P', 'Q-Z'];

  return (
    <div className="bureau-container" onClick={!audioEnabled ? enableAudio : undefined}>
      <CoffeeStain />
      <Header />
      
      <main className="bureau-main">
        <aside className="filing-cabinet">
          <h2>ARCHIVE CABINET</h2>
          {drawers.map(drawer => (
            <div key={drawer} className="drawer-wrapper">
              <FilingDrawer
                label={drawer}
                isOpen={activeDrawer === drawer}
                onClick={() => handleDrawerClick(drawer)}
                sounds={getSoundsByDrawer(drawer)}
              />
              {activeDrawer === drawer && (
                <div className="sounds-list">
                  {getSoundsByDrawer(drawer).map(sound => (
                    <SoundCard
                      key={sound.id}
                      sound={sound}
                      onClick={() => handleSoundSelect(sound)}
                      isSelected={selectedSound?.id === sound.id}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
          
          {recentAcquisitions.length > 0 && (
            <div className="recent-acquisitions">
              <h3>RECENT ACQUISITIONS</h3>
              {recentAcquisitions.map(sound => (
                <SoundCard
                  key={sound.id}
                  sound={sound}
                  onClick={() => handleSoundSelect(sound)}
                  isSelected={selectedSound?.id === sound.id}
                />
              ))}
            </div>
          )}
        </aside>

        <section className="main-workspace">
          <CRTMonitor 
            selectedSound={selectedSound}
            onPlay={playSound}
            isPlaying={isPlaying}
            audioEnabled={audioEnabled}
          />
          
          {audioEnabled && (
            <>
              <SearchPanel 
                onSearch={handleSearch}
                results={searchResults}
                query={searchQuery}
                setQuery={setSearchQuery}
              />
              
              {selectedSound && selectedSound.status === 'available' && (
                <div className="checkout-section">
                  <button 
                    className="checkout-toggle"
                    onClick={() => setShowCheckout(!showCheckout)}
                  >
                    {showCheckout ? 'CANCEL REQUEST' : 'REQUEST CHECKOUT'}
                  </button>
                  {showCheckout && (
                    <CheckoutForm 
                      selectedSound={selectedSound}
                      onSubmit={() => setShowCheckout(false)}
                    />
                  )}
                </div>
              )}
              
              <RecordButton onRecordComplete={handleRecordComplete} />
            </>
          )}
        </section>
      </main>

      <footer className="bureau-footer">
        <div className="fluorescent-bar"></div>
        <div className="clerk-status">
          <span>CLERK ON DUTY: M. HOLLOWAY</span>
          <span>EXT. 4472</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
