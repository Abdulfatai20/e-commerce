import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <AuthContext.Provider
      value={{ isLoading, setIsLoading, accessToken, setAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
