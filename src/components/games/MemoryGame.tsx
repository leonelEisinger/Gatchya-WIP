// src/components/games/MemoryGame/MemoryGame.tsx
import React, { useContext, useState } from 'react';
import { UserContext } from '../../../contexts/UserContext';

const MemoryGame: React.FC = () => {
  const [gameWon, setGameWon] = useState(false);
  const { unlockReward } = useContext(UserContext);

  const handleWin = () => {
    setGameWon(true);
    // Desbloqueia uma recompensa aleatória
    const rewardId = 'cursor_special_' + Math.floor(Math.random() * 3);
    unlockReward(rewardId);
  };

  return (
    <div className="memory-game-container">
      {/* Lógica do jogo de memória aqui */}
      
      {gameWon && (
        <div className="reward-popup">
          <h2>Parabéns! Você ganhou!</h2>
          <p>Uma nova recompensa foi desbloqueada!</p>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;