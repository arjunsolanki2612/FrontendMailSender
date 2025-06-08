// src/App.js

import React from "react";
import EmailForm from "./EmailForm";

function App() {
  console.log("Backend URL:", process.env.REACT_APP_BACKEND_URL);

  return <EmailForm />;
}

export default App; // 💥 This line is IMPORTANT!
