import { createContext, useContext, useEffect, useState } from "react";

import Loader from "../components/Loader";

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (loading) {

      document.body.style.overflow = "hidden";
      document.body.style.pointerEvents = "none";

    } else {

      document.body.style.overflow = "auto";
      document.body.style.pointerEvents = "auto";

    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.pointerEvents = "auto";
    };

  }, [loading]);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>

      {loading && <Loader />}

      {children}

    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);