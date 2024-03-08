import React, { createContext, useContext, useState, ReactNode } from "react";

interface Alert {
  open: boolean;
  message: string;
  type: string;
}

interface AlertContextProps {
  alert: Alert;
  setAlert: React.Dispatch<React.SetStateAction<Alert>>;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alert, setAlert] = useState<Alert>({
    open: false,
    message: "",
    type: "success"
  });

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

const useAlert = (): AlertContextProps => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

export { useAlert, AlertProvider };
