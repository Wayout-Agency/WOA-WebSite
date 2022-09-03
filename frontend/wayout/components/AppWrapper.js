import { createContext, useState, useContext } from "react";

const AppContext = createContext();

const AppWrapper = ({ children }) => {
  const [show, setShow] = useState(false);
  const [order, setOrder] = useState(false);

  return (
    <AppContext.Provider
      value={{ show: show, setShow: setShow, order: order, setOrder: setOrder }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppWrapper;
