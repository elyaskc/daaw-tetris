import { useEffect, useState, useRef } from "react";
import Ranking from "./Ranking";
import { joinLobby, subscribeToPlayers, startGame, leaveLobby } from "../../persistence/database";

const Lobby = ({ player }) => {
  const [players, setPlayers] = useState([]);
  const myPlayerIdRef = useRef(null);

  useEffect(() => {
    const myId = joinLobby(player);
    myPlayerIdRef.current = myId;

    const unsubscribe = subscribeToPlayers((list) => {
      setPlayers(list);
    });

    return () => {
        unsubscribe();
        leaveLobby(myId);
    }
  }, [player]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        console.log("Iniciando partida global...");
        startGame();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="lobby-screen">
      <h2>Sala de Espera</h2>
      <p className="welcome-msg">Hola, <strong>{player}</strong></p>

      <div className="lobby-content">
        {/* Jugadores Online */}
        <div className="players-list-box">
          <h3>Jugadores Conectados: ({players.length})</h3>
          <ul>
            {players.map((p) => (
              <li key={p.id} className={p.name === player ? "me" : ""}>
                {p.name} {p.name === player && "(Tú)"}
              </li>
            ))}
          </ul>
        </div>

        {/* Ranking */}
        <div className="ranking-box">
          <Ranking />
        </div>
      </div>

      <div className="lobby-footer">
        <p className="blink">PRESS <strong>ENTER</strong> TO START THE GAME</p>
      </div>
    </div>
  );
};

export default Lobby;