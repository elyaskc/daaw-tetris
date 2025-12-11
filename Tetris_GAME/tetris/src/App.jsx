import { useEffect, useState } from "react";
import TetrisBoard from "./components/game/TetrisBoard";
import Login from "./components/lobby/Login";
import Lobby from "./components/lobby/Lobby";
import NextPiece from "./components/game/NextPiece";

import { saveScore } from "./persistence/apiClient";
import { subscribeToGlobalState, togglePause, setGlobalGameOver } from "./persistence/database";

function App() {
  const [view, setView] = useState("LOGIN");
  const [player, setPlayer] = useState(null);

  const [paused, setPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [lines, setLines] = useState(0);

  const [nextPiece, setNextPiece] = useState(null);

  const level = Math.floor(lines / 10) + 1;

  useEffect(() => {
    const unsubscribe = subscribeToGlobalState((globalState) => {
      if (globalState.status === "PLAYING") {
        setView("GAME");
        setGameOver(false);
        setPaused(false);
        setLines(0);
      }

      if (globalState.status === "PAUSED") {
        setPaused(true);
      } else if (globalState.status === "PLAYING") {
        setPaused(false);
      }

      if (globalState.status === "GAME_OVER") {
        setGameOver(true);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = (username) => {
    setPlayer(username);
    setView("LOBBY");
  };

  const handleGlobalPause = () => {
    if (!gameOver) {
      togglePause(!paused);
    }
  };

  const handleGameOver = async () => {
    setGameOver(true);
    
    await setGlobalGameOver(); 

    if (player && lines > 0) {
      try {
        await saveScore({
          playerName: player,
          level: level,
          totalLines: lines
        });
        console.log("Puntuación guardada.");
      } catch (error) {
        console.error("Error al guardar la puntuación:", error);
      }
    }
  };

  return (
    <div className="app">

      {view === "LOGIN" && (<Login onLogin={handleLogin} />)}
      {view === "LOBBY" && (<Lobby player={player} />)}

      {view === "GAME" && (
        <div className="layout">
          {/* tablero principal */}
          <div>
            <h1 className="title">React Tetris: {player}</h1>
            <TetrisBoard
              paused={paused}
              setPaused={setPaused}
              onTogglePause={handleGlobalPause}
              gameOver={gameOver}
              setGameOver={handleGameOver}
              setLines={setLines}
              player={player}
              level={level}
              setNextPiece={setNextPiece}
            />
          </div>

          {/* panel lateral */}
          <div className="panel">
            {paused && <div className="banner pause">Paused</div>}
            
            {gameOver && (
                <div className="banner over" style={{pointerEvents: 'none'}}>
                    Game Over
                </div>
            )}

            <div className="stat-box">
              <div className="stat">Level: {level}</div>
              <div className="stat">Lines: {lines}</div>
            </div>
            
            {/* pieza siguiente */}
            <NextPiece piece={nextPiece} />

            <div className="help">
              <p>← → Move</p>
              <p>↑ Rotate</p>
              <p>↓ Drop</p>
              <p>Space Hard drop</p>
              <p>P Pause</p>
            </div>

            {gameOver && (
              <button
                onClick={() => {
                  setView("LOBBY");
                  setGameOver(false);
                  setLines(0);
                }}
                className="btn-restart"
                style={{
                    pointerEvents: 'auto',
                    zIndex: 100,
                    position: 'relative',
                    cursor: 'pointer'
                }}
              >
                Back to Lobby
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;