import React, { useState } from 'react';
import boardImg from './assets/board.png';
const TILE_MAP = {
  1: [0, 4], 2: [1, 4], 3: [2, 4], 4: [3, 4], 5: [4, 4],
  6: [4, 3.2], 7: [3, 3.2], 8: [2, 3.2], 9: [1, 3.2], 10: [0, 3.2],
  11: [4, 2.3], 12: [3, 2.3], 13: [2, 2.3], 14: [1, 2.3], 15: [0, 2.3],
  16: [4, 1.5], 17: [3, 1.5], 18: [2, 1.5], 19: [1, 1.5], 20: [0, 1.5],
  21: [4, 0.7], 22: [3, 0.7], 23: [2, 0.7], 24: [1, 0.7], 25: [0, 0.7]
};


const SPECIAL_TILES = {
  3: { to : 3, message: "जाँच नहीं कराई - जानकारी की कमी" },
  8: { to: 2, message: "गर्भ नहीं था, फिर भी इंतजार करते रहे - पशु बीमार, 2 पर वापस जाएं" },
  4: { to: 13, message: "Bingnaa से जाँच की, सिर्फ 28 दिन में रिजल्ट! 13 पर जाएं" },
  25: { to: 25, message: "सही समय पर जांच कराई, पशु स्वस्थ और लाभ में!" }
};

const App = () => {
  const [positions, setPositions] = useState([1, 1]);
  const [turn, setTurn] = useState(0);
  const [message, setMessage] = useState('');
  const [isRolling, setIsRolling] = useState(false);
  const [currentDiceNumber, setCurrentDiceNumber] = useState(1);
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });
  const [finalRoll, setFinalRoll] = useState(null);
  const [winner, setWinner] = useState(null);

  const restartGame = () => {
    window.location.reload();
  };

  const showToast = (message, type = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'info' });
    }, 4000);
  };

  const rollDice = () => {
    if (isRolling || winner) return;
    
    setIsRolling(true);
    setFinalRoll(null);
    
    let count = 0;
    const rollInterval = setInterval(() => {
      setCurrentDiceNumber(Math.floor(Math.random() * 6) + 1);
      count++;
      
      if (count >= 15) {
        clearInterval(rollInterval);
        
        const finalRollValue = Math.floor(Math.random() * 6) + 1;
        setCurrentDiceNumber(finalRollValue);
        setFinalRoll(finalRollValue);
        
        setTimeout(() => {
          const currentPosition = positions[turn];
          const newPosition = currentPosition + finalRollValue;
          
          if (newPosition > 25) {
            showToast(`खिलाड़ी ${toDevanagari(turn + 1)} ने ${toDevanagari(finalRollValue)} फेंका! 25 से आगे नहीं जा सकते, ${toDevanagari(currentPosition)} पर रुकें`, 'warning');
          } else {
            showToast(`खिलाड़ी ${toDevanagari(turn + 1)} ने ${toDevanagari(finalRollValue)} फेंका! ${toDevanagari(currentPosition)} + ${toDevanagari(finalRollValue)} = ${toDevanagari(newPosition)}`, 'success');
            setPositions(prev => {
              const updated = [...prev];
              updated[turn] = newPosition;
              return updated;
            });
            
            if (SPECIAL_TILES[newPosition]) {
              setTimeout(() => {
                showToast(SPECIAL_TILES[newPosition].message, 'special');
                setPositions(prev => {
                  const updated = [...prev];
                  updated[turn] = SPECIAL_TILES[newPosition].to;
                  return updated;
                });
              }, 500);
            }

            if (newPosition === 25) {
              setTimeout(() => {
                setWinner(turn + 1);
                showToast(`खिलाड़ी ${toDevanagari(turn + 1)} जीत गया! 🎉`, 'success');
              }, 2500);
              return;
            }
          }
          
          setTurn((turn + 1) % 2);
          setIsRolling(false);
        }, 500);
      }
    }, 100);
  };

  const getTokenStyle = (tile, player) => {
    const [x, y] = TILE_MAP[tile];
  
    const leftPercent = (x * 20) + 10; 
    const topPercent = (y * 20) + 10;  
    
    
    const playerOffset = player === 0 ? -1 : 1;
    
    return {
      position: 'absolute',
      left: `${leftPercent + playerOffset}%`,
      top: `${topPercent}%`,
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      backgroundColor: player === 0 ? '#ef4444' : '#3b82f6',
      border: '2px solid #fff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
      transform: 'translate(-50%, -50%)',
      zIndex: 10,
      transition: 'all 0.3s ease'
    };
  };

  const toDevanagari = (num) => {
    const devanagariDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
    return num.toString().split('').map(d => devanagariDigits[parseInt(d)]).join('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-6 max-w-2xl w-full">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">गर्भ जांच बोर्ड गेम</h1>
        
        {/* Game Board */}
        <div className="relative mx-auto rounded-lg overflow-hidden shadow-lg" 
             style={{ width: '500px', height: '500px', maxWidth: '90vw', maxHeight: '90vw' }}>
          <img 
            src={boardImg} 
            alt="Garbh Jaanch Board" 
            className="w-full h-full object-cover"
          />
          
        
          <div style={getTokenStyle(positions[0], 0)}></div>
          <div style={getTokenStyle(positions[1], 1)}></div>
        </div>

        {/* Game Controls */}
        <div className="flex flex-col items-center mt-6 space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white"></div>
              <span className="text-sm">खिलाड़ी १: स्थान <span className="text-xl font-bold text-red-500">{toDevanagari(positions[0])}</span></span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white"></div>
              <span className="text-sm">खिलाड़ी २: स्थान <span className="text-xl font-bold text-blue-500">{toDevanagari(positions[1])}</span></span>
            </div>
          </div>
          
          {winner ? (
            <div className="flex flex-col items-center space-y-4">
              <div className="text-xl font-bold text-green-600">
                खिलाड़ी {toDevanagari(winner)} जीत गया! 🎉
              </div>
              <button
                onClick={restartGame}
                className="px-8 py-3 font-semibold rounded-lg shadow-lg bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200"
              >
                नया खेल शुरू करें
              </button>
            </div>
          ) : (
            <button
              onClick={rollDice}
              disabled={isRolling}
              className={`px-8 py-3 font-semibold rounded-lg shadow-lg transform transition-all duration-200 flex items-center space-x-2 ${
                isRolling 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 hover:scale-105'
              }`}
            >
              <span className="text-2xl">
                {isRolling ? toDevanagari(currentDiceNumber) : '🎲'}
              </span>
              <span>
                {isRolling ? 'फेंक रहे हैं...' : `पासा फेंकें (खिलाड़ी ${toDevanagari(turn + 1)} की बारी)`}
              </span>
            </button>
          )}
        </div>

        {/* Toast Notification */}
        {toast.show && (
          <div className={`fixed top-4 right-4 max-w-sm p-4 rounded-lg shadow-lg z-50 transform transition-all duration-300 ${
            toast.type === 'success' ? 'bg-green-100 border-l-4 border-green-500 text-green-800' :
            toast.type === 'warning' ? 'bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800' :
            toast.type === 'special' ? 'bg-purple-100 border-l-4 border-purple-500 text-purple-800' :
            'bg-blue-100 border-l-4 border-blue-500 text-blue-800'
          }`}>
            <div className="flex justify-between items-start">
              <p className="text-sm font-medium">{toast.message}</p>
              <button
                onClick={() => setToast({ show: false, message: '', type: 'info' })}
                className="ml-2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
          </div>
        )}

   
        {message && (
          <div className="mt-4 bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-r-lg">
            <p className="text-sm text-gray-800">{message}</p>
            <button
              className="mt-2 text-sm text-blue-600 hover:text-blue-800 underline"
              onClick={() => setMessage('')}
            >
              बंद करें
            </button>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>खिलाड़ी स्थान 1 से शुरू करें और पासा फेंककर आगे बढ़ें।</p>
          <p>विशेष स्थानों पर आपको स्वचालित रूप से आगे या पीछे भेज दिया जाएगा!</p>
          {finalRoll && (
            <p className="mt-2 font-semibold text-green-600">
              आखिरी फेंक: {toDevanagari(finalRoll)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;