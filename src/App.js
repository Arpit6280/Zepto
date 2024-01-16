import React from "react";
import Chip from "./component/Chip";
import "./App.css";

function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center", color: "blue" }}> PICK USERS</h1>
      <div className="user_container">
        <Chip />
      </div>
    </div>
  );
}

export default App;
