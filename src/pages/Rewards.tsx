// src/pages/Rewards.tsx
import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const Rewards: React.FC = () => {

    const context = useContext(UserContext);
  
  // Verifica se o contexto existe
  if (!context) {
    return <div>Erro: Contexto não encontrado</div>;
    // Ou algum loading state:
    // return <div>Carregando...</div>;
  }


  const { rewards, selectAvatar, selectBackground, selectCursor } = context;

  return (
    <div className="rewards-page">
      <h1>Suas Recompensas</h1>
      
      <section>
        <h2>Avatares</h2>
        <div className="rewards-grid">
          {rewards.filter(r => r.type === 'avatar').map(reward => (
            <div key={reward.id} className={`reward-card ${reward.unlocked ? 'unlocked' : 'locked'}`}>
              <img src={reward.image} alt={reward.name} />
              <p>{reward.name}</p>
              {reward.unlocked && (
                <button onClick={() => selectAvatar(reward.id)}>Selecionar</button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Seções similares para backgrounds e cursors */}
    </div>
  );
};

export default Rewards;