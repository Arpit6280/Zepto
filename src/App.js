import React from "react";
import Multiselect from "./Multiselect";
import "./App.css";

function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center", color: "blue" }}> PICK USERS</h1>
      <div className="user_container">
        <Multiselect />
      </div>
    </div>
  );
}

export default App;
