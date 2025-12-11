import { ref, set, onValue, push, update, remove, onDisconnect, get } from "firebase/database";
import { db } from "./firebase";

const STATE_REF = ref(db, 'gameState');
const PLAYERS_REF = ref(db, 'players');
const ATTACKS_REF = ref(db, 'attacks'); 


export const joinLobby = (playerName) => {
  const playerId = `player_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  
  const userRef = ref(db, `players/${playerId}`);

  get(PLAYERS_REF).then((snapshot) => {
    if (!snapshot.exists() || snapshot.numChildren() === 0) {
      set(STATE_REF, { status: "WAITING" });
      set(ATTACKS_REF, null);
    }
  });

  set(userRef, {
    name: playerName,
    id: playerId,
    score: 0,
    alive: true
  });

  onDisconnect(userRef).remove();

  return playerId;
};


export const subscribeToPlayers = (callback) => {
  return onValue(PLAYERS_REF, (snapshot) => {
    const data = snapshot.val();
    const playersList = data ? Object.values(data) : [];
    callback(playersList);
  });
};


export const subscribeToGlobalState = (callback) => {
  return onValue(STATE_REF, (snapshot) => {
    const state = snapshot.val();
    callback(state);
  });
};


export const startGame = () => {
  set(ATTACKS_REF, null);
  update(STATE_REF, { status: "PLAYING" });
};


export const togglePause = (isPaused) => {
  update(STATE_REF, { status: isPaused ? "PAUSED" : "PLAYING" });
};


export const setGlobalGameOver = () => {
  update(STATE_REF, { status: "GAME_OVER" });
};


export const sendAttack = (linesAmount, senderId) => {
  if (linesAmount <= 0) return;
  
  push(ATTACKS_REF, {
    amount: linesAmount,
    sender: senderId,
    timestamp: Date.now()
  });
};


export const listenForAttacks = (myPlayerId, callback) => {
  let lastAttackTime = Date.now();

  return onValue(ATTACKS_REF, (snapshot) => {
    const attacks = snapshot.val();
    if (!attacks) return;

    Object.values(attacks).forEach(attack => {
      if (attack.timestamp > lastAttackTime && attack.sender !== myPlayerId) {
        callback(attack.amount);
        lastAttackTime = Math.max(lastAttackTime, attack.timestamp);
      }
    });
  });
};


export const leaveLobby = (playerId) => {
  const userRef = ref(db, `players/${playerId}`);
  remove(userRef);
};