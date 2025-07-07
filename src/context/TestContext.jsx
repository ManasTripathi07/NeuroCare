import React, { createContext, useContext, useState } from "react";

const TestContext = createContext();

export const useTest = () => useContext(TestContext);

export const TestProvider = ({ children }) => {
  const [results, setResults] = useState([]);

  const addResult = (testName, score, details = {}) => {
    setResults((prev) => [...prev, { testName, score, details }]);
  };

  const resetResults = () => {
    setResults([]);
  };

  return (
    <TestContext.Provider value={{ results, addResult, resetResults }}>
      {children}
    </TestContext.Provider>
  );
};
