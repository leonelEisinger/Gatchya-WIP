// src/contexts/UserContext.tsx
import React, { createContext, useState, useEffect } from 'react';

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
  setUsername: (name: string) => void;
};

// Valores padrão para o contexto
const defaultContextValue: UserContextType = {
  username: 'Jogador',
  rewards: [
    {
      id: 'avatar_1',
      type: 'avatar',
      name: 'Explorador',
      image: '/assets/avatars/logo.png',
      unlocked: true
    },
    {
      id: 'cursor_1',
      type: 'cursor',
      name: 'Clássico',
      image: '/assets/cursors/classic.png',
      unlocked: true
    },
    {
      id: 'background_1',
      type: 'background',
      name: 'Padrão',
      image: '/assets/backgrounds/default.png',
      unlocked: true
    }
  ],
  unlockedAvatars: ['avatar_1'],
  unlockedBackgrounds: ['background_1'],
  unlockedCursors: ['cursor_1'],
  currentAvatar: 'avatar_1',
  currentBackground: 'background_1',
  currentCursor: 'cursor_1',
  unlockReward: () => {},
  selectAvatar: () => {},
  selectBackground: () => {},
  selectCursor: () => {},
  setUsername: () => {}
};


export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState<string>('Jogador');
  const [rewards, setRewards] = useState<Reward[]>([
    {
    id: 'avatar_1',
    type: 'avatar',
    name: 'Explorador',
    image: '/assets/avatars/logo.png',
    unlocked: true
    },
    {
    id: 'avatar_2',
    type: 'avatar',
    name: 'Guerreiro',
    image: '/assets/avatars/logo.png',
    unlocked: false
  },
  {
      id: 'background_1',
      type: 'background',
      name: 'Floresta',
      image: '/assets/backgrounds/forest.png',
      unlocked: true
    },
    {
      id: 'background_2',
      type: 'background',
      name: 'Montanha',
      image: '/assets/backgrounds/mountain.png',
      unlocked: false
    },
    {
      id: 'cursor_1',
      type: 'cursor',
      name: 'Clássico',
      image: '/assets/cursors/classic.png',
      unlocked: true
    },
    {
      id: 'cursor_2',
      type: 'cursor',
      name: 'Espada',
      image: '/assets/cursors/sword.png',
      unlocked: false
    }
  ]);
  
  const [unlockedAvatars, setUnlockedAvatars] = useState<string[]>(['avatar_1']);
  const [unlockedBackgrounds, setUnlockedBackgrounds] = useState<string[]>(['background_1']);
  const [unlockedCursors, setUnlockedCursors] = useState<string[]>(['cursor_1']);
  
  const [currentAvatar, setCurrentAvatar] = useState<string>('avatar_1');
  const [currentBackground, setCurrentBackground] = useState<string>('background_1');
  const [currentCursor, setCurrentCursor] = useState<string>('cursor_1');

  // Atualiza as listas de itens desbloqueados quando os rewards mudam
  useEffect(() => {
    const avatars = rewards
      .filter(r => r.type === 'avatar' && r.unlocked)
      .map(r => r.id);
    setUnlockedAvatars(avatars);

    const backgrounds = rewards
      .filter(r => r.type === 'background' && r.unlocked)
      .map(r => r.id);
    setUnlockedBackgrounds(backgrounds);

    const cursors = rewards
      .filter(r => r.type === 'cursor' && r.unlocked)
      .map(r => r.id);
    setUnlockedCursors(cursors);
  }, [rewards]);

  const unlockReward = (rewardId: string) => {
    setRewards(prev => prev.map(r => 
      r.id === rewardId ? {...r, unlocked: true} : r
    ));
  };

  const selectAvatar = (avatarId: string) => {
    if (unlockedAvatars.includes(avatarId)) {
      setCurrentAvatar(avatarId);
    } else {
      console.warn(`Avatar ${avatarId} não está desbloqueado!`);
    }
  };

  const selectBackground = (backgroundId: string) => {
    if (unlockedBackgrounds.includes(backgroundId)) {
      setCurrentBackground(backgroundId);
    } else {
      console.warn(`Background ${backgroundId} não está desbloqueado!`);
    }
  };

  const selectCursor = (cursorId: string) => {
    if (unlockedCursors.includes(cursorId)) {
      setCurrentCursor(cursorId);
    } else {
      console.warn(`Cursor ${cursorId} não está desbloqueado!`);
    }
  };

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
      selectCursor,
      setUsername
    }}>
      {children}
    </UserContext.Provider>
  );
};