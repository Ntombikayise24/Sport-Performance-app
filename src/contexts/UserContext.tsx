import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  activeUsers: string[];
  setActiveUsers: (users: string[]) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeUsers, setActiveUsers] = useState<string[]>([]);

  return (
    <UserContext.Provider value={{ activeUsers, setActiveUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
