import { useState } from "react";

const Login = ({ onLogin }) => {
  const [inputName, setInputName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputName.trim().length > 0) {
      onLogin(inputName.trim());
    }
  };

  return (
    <div className="login-screen">
      <h1>Tetris Multiplayer</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label>Introduce tu nombre:</label>
        <input
          type="text"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          placeholder="Usuario"
          autoFocus
        />
        <button type="submit">Entrar al Lobby</button>
      </form>
    </div>
  );
};

export default Login;