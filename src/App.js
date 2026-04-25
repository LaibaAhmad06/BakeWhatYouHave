import React from "react";
import Home from "./pages/Home";

function App() {
  return (
    <div className="app">
      {/* App header */}
      <header className="app-header">
        <div className="header-inner">
          <div className="header-brand">
            <span className="header-logo">🍳</span>
            <div>
              <h1 className="header-title">BakeWhatYouHave</h1>
              <p className="header-subtitle">Find recipes using what you already have</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main page */}
      <Home />
    </div>
  );
}

export default App;
