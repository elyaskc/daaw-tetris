const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// GET /ranking
export const getRanking = async () => {
  try {
    const response = await fetch(`${API_URL}/ranking`);
    if (!response.ok) {
      throw new Error('Error al obtener ranking');
    }
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

// POST /ranking
export const saveScore = async (scoreData) => {
  try {
    const response = await fetch(`${API_URL}/ranking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(scoreData),
    });
    
    if (!response.ok) {
      throw new Error('Error al guardar puntuación');
    }
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
};