import React, { createContext, useState, useContext } from 'react';


const UserContext = createContext();


export const useUser = () => useContext(UserContext);


export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [userImage, setUserImage] = useState(null);

  const login = (id, user, image) => {
    setUserId(id); 
    setUsername(user);
    setUserImage(image);
  };

  const logout = () => {
    setUserId(null);
    setUsername(null);
    setUserImage(null);
  };

  return (
    <UserContext.Provider value={{ userId, username, userImage, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
