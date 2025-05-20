// src/contexts/UserContext.tsx
import React, { createContext, useState } from 'react';

type Reward = {
  id: string;
  type: 'cursor' | 'avatar' | 'background';
  name: string;
  image: string;
  unlocked: boolean;
};

type UserContextType = {
  username: string;
  rewards: Reward[];
  unlockedAvatars: string[];
  unlockedBackgrounds: string[];
  unlockedCursors: string[];
  currentAvatar: string;
  currentBackground: string;
  currentCursor: string;
  unlockReward: (rewardId: string) => void;
  selectAvatar: (avatarId: string) => void;
  selectBackground: (backgroundId: string) => void;
  selectCursor: (cursorId: string) => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState('Jogador');
  const [rewards, setRewards] = useState<Reward[]>([]);
  // ... outros estados

  const unlockReward = (rewardId: string) => {
    setRewards(prev => prev.map(r => 
      r.id === rewardId ? {...r, unlocked: true} : r
    ));
    // Lógica adicional baseada no tipo de recompensa
  };

  // ... outras funções

  return (
    <UserContext.Provider value={{
      username,
      rewards,
      unlockedAvatars,
      unlockedBackgrounds,
      unlockedCursors,
      currentAvatar,
      currentBackground,
      currentCursor,
      unlockReward,
      selectAvatar,
      selectBackground,
      selectCursor
    }}>
      {children}
    </UserContext.Provider>
  );
};