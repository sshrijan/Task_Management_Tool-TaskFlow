import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <SearchContext.Provider
      value={{
        openSearch,
        setOpenSearch
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);