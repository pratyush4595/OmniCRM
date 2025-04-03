import { useState, createContext } from "react";
import AppRoutes from "./Components/Routes/AppRoutes";
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

export const LoaderAlertContext = createContext();

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });

  return (
    <>
      <LoaderAlertContext.Provider value={{ isLoading, alert, setIsLoading, setAlert }}>
        <AppRoutes />
      </LoaderAlertContext.Provider>
    </>
  );
}

export default App;