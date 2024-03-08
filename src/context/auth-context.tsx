import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { authReducer } from "../reducer";

interface AuthContextProps {
  isAuthModalOpen: boolean;
  isDropDownModalOpen: boolean;
  username: string;
  number: number;
  email: string;
  password: string;
  confirmPassword: string;
  accessToken: string;
  name: string;
  selectedTab: string;
  authDispatch: React.Dispatch<any>;
}

const initialValue: AuthContextProps = {
  isAuthModalOpen: false,
  isDropDownModalOpen: false,
  username: "",
  number: 0,
  email: "",
  password: "",
  confirmPassword: "",
  accessToken: "",
  name: "",
  selectedTab: "login",
  authDispatch: () => {}
};

const AuthContext = createContext<AuthContextProps>(initialValue);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [
    {
      isAuthModalOpen,
      isDropDownModalOpen,
      username,
      email,
      password,
      number,
      accessToken,
      name,
      selectedTab,
      confirmPassword,
    },
    authDispatch,
  ] = useReducer(authReducer, initialValue);

  return (
    <AuthContext.Provider
      value={{
        isAuthModalOpen,
        isDropDownModalOpen,
        username,
        email,
        password,
        number,
        accessToken,
        name,
        selectedTab,
        confirmPassword,
        authDispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextProps => useContext(AuthContext);

export { useAuth, AuthProvider };
