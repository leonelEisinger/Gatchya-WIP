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

  // Filtra as recompensas por tipo
  const avatarRewards = rewards.filter(r => r.type === 'avatar');
  const backgroundRewards = rewards.filter(r => r.type === 'background');
  const cursorRewards = rewards.filter(r => r.type === 'cursor');

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Suas Recompensas</h1>
      
      {/* Seção de Avatares */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Avatares</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {avatarRewards.map(reward => (
            <div 
              key={reward.id} 
              className={`rounded-lg p-4 shadow-md transition-all ${
                reward.unlocked 
                  ? 'bg-white hover:shadow-lg' 
                  : 'bg-gray-200 opacity-70'
              }`}
            >
              <img 
                src={reward.image} 
                alt={reward.name} 
                className="w-full h-32 object-contain mb-2"
              />
              <p className="text-center font-medium">{reward.name}</p>
              {reward.unlocked ? (
                <button
                  onClick={() => selectAvatar(reward.id)}
                  className="mt-2 w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600 transition"
                >
                  Selecionar
                </button>
              ) : (
                <p className="mt-2 text-center text-sm text-gray-500">Bloqueado</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Seção de Planos de Fundo */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Planos de Fundo</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {backgroundRewards.map(reward => (
            <div 
              key={reward.id} 
              className={`rounded-lg overflow-hidden shadow-md ${
                reward.unlocked ? 'hover:shadow-lg' : 'opacity-70'
              }`}
            >
              <div className="relative h-40">
                <img 
                  src={reward.image} 
                  alt={reward.name} 
                  className="w-full h-full object-cover"
                />
                {!reward.unlocked && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-bold">BLOQUEADO</span>
                  </div>
                )}
              </div>
              <div className="p-3 bg-white">
                <p className="font-medium">{reward.name}</p>
                {reward.unlocked && (
                  <button
                    onClick={() => selectBackground(reward.id)}
                    className="mt-2 w-full bg-green-500 text-white py-1 rounded hover:bg-green-600 transition"
                  >
                    Usar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Seção de Cursors */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Cursor Trails</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {cursorRewards.map(reward => (
            <div 
              key={reward.id} 
              className={`rounded-lg p-4 text-center ${
                reward.unlocked ? 'bg-white shadow-md' : 'bg-gray-100'
              }`}
            >
              <div className="h-20 w-full mb-2 flex items-center justify-center">
                {reward.unlocked ? (
                  <img 
                    src={reward.image} 
                    alt={reward.name} 
                    className="h-16 w-16 object-contain"
                  />
                ) : (
                  <div className="h-16 w-16 bg-gray-300 rounded-full"></div>
                )}
              </div>
              <p className="font-medium">{reward.name}</p>
              {reward.unlocked ? (
                <button
                  onClick={() => selectCursor(reward.id)}
                  className="mt-2 w-full bg-purple-500 text-white py-1 rounded hover:bg-purple-600 transition"
                >
                  Ativar
                </button>
              ) : (
                <p className="mt-2 text-sm text-gray-500">Complete desafios para desbloquear</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Rewards;