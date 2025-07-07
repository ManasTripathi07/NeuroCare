import React from "react";
import ACEIIIFlow from "../AceTest/ACEIIIFlow";
import { TestProvider } from "../../../context/TestContext";

const AceTest = () => (
  <TestProvider>
    <ACEIIIFlow />
  </TestProvider>
);

export default AceTest;
