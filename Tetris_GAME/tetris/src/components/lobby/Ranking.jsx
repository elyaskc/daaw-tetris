import { useEffect, useState } from "react";
import { getRanking } from "../../persistence/apiClient";

const Ranking = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      const data = await getRanking();
      setScores(data || []);
      setLoading(false);
    };

    fetchScores();
  }, []);

  return (
    <div className="ranking-container">
      <h3>Ranking Histórico</h3>
      {loading ? (
        <p>Cargando puntuaciones...</p>
      ) : (
        <table className="ranking-table">
          <thead>
            <tr>
              <th>Pos</th>
              <th>Jugador</th>
              <th>Nivel</th>
              <th>Líneas</th>
            </tr>
          </thead>
          <tbody>
            {scores.length > 0 ? (
              scores.map((score, index) => (
                <tr key={index}>
                  <td>#{index + 1}</td>
                  <td>{score.playerName}</td>
                  <td>{score.level}</td>
                  <td>{score.totalLines}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No hay partidas registradas aún.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Ranking;